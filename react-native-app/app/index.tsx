import {
    SafeAreaView, ScrollView, StatusBar,
    Text,
    View
} from "react-native";
import Colors from "../constants/Colors";
import {center} from "../constants/commonStyles";
import {gql, useMutation, useQuery} from "@apollo/client";
import MonoButton from "../components/MonoButton";
import {User} from "../interfaces/User";
import {EnrichedQueryResults} from "../interfaces/EnrichedQueryResult";
import HorizontalLine from "../components/HorizontalLine";
import {router} from "expo-router";
import AddButton from "../components/AddButton";
import ObjectForm from "../components/ObjectForm";
import {useState} from "react";
import {ADD_USER, GET_USERS} from "../utils/graphql_queries";

export default function Page() {

    const [addingUser, setAddingUser] = useState<boolean>(false);

    const users: EnrichedQueryResults<User, "users", "username" | "id"> = useQuery(GET_USERS);

    const [addUser, data] = useMutation(ADD_USER, {
        refetchQueries: [
            {
                query: GET_USERS
            },
            'GetUsers'
        ]
    })

    const onUserAdd = () => {
        setAddingUser(true)
    }

    const onUserCreate = (value: Record<string, string>) => {
        addUser({
            variables: {
                name: value.username,
                email: value.email
            }
        }).then(() => {
            setAddingUser(false);
        })
    }

    if (users.error) {
        return <View style={{...center, height: "100%"}}><Text>Error: {users.error.message}</Text></View>
    }

    return (
        <>
            { addingUser &&
                <ObjectForm onSubmit={onUserCreate} onClose={() => setAddingUser(false)} title={"Create User"} >
                    <ObjectForm.TextInput label={"Username"}/>
                    <ObjectForm.TextInput label={"Email"}/>
                </ObjectForm>
            }
            <SafeAreaView style={{backgroundColor: Colors.background, ...center, flex:1}}>

                <StatusBar backgroundColor={Colors.background} />
                <View style={{marginTop: 35}}>
                    <Text style={{fontSize: 25, fontWeight: "bold"}}>USERS</Text>
                    <AddButton onPress={onUserAdd} style={{position: "absolute", right: -121, bottom: -17}}/>
                    <AddButton style={{position: "absolute", left: 121, bottom: -17}} onPress={() => users.refetch()}/>
                    <HorizontalLine margin={60} height={3} color={Colors.secondary}/>
                </View>
                {
                    users.loading ? (
                        <Text>Loading...</Text>
                    ) : (
                        <ScrollView style={{flex:1}}
                                    contentContainerStyle={{alignItems: "center"}}>
                            {
                                users.data.users.map((user) => (
                                    <MonoButton key={user.id} title={user.username} onPress={() => router.push(`/todo/${user.id}`)} style={{marginBottom: 10}}/>
                                ))
                            }
                        </ScrollView>
                    )
                }
                <MonoButton title={"Back"} onPress={() => {}} style={{marginBottom:10}}/>
            </SafeAreaView>
        </>

    )
}

