import {
    SafeAreaView, ScrollView, StatusBar,
    Text,
    View
} from "react-native";
import Colors from "../constants/Colors";
import {center} from "../constants/commonStyles";
import {gql, useQuery} from "@apollo/client";
import MonoButton from "../components/MonoButton";
import {User} from "../interfaces/User";
import {EnrichedQueryResults} from "../interfaces/EnrichedQueryResult";
import HorizontalLine from "../components/HorizontalLine";
import {router} from "expo-router";
import AddButton from "../components/AddButton";


export default function Page() {



    const users: EnrichedQueryResults<User, "users", "username" | "id"> = useQuery(gql`
        query {
            users {
                id
                username
            }
        }
    `)

    const onUserAdd = () => {

    }

    if (users.error) {
        return <View style={{...center, height: "100%"}}><Text>Error: {users.error.message}</Text></View>
    }

    return (
        <SafeAreaView style={{backgroundColor: Colors.background, ...center, flex:1}}>

            <StatusBar backgroundColor={Colors.background} />
            <View style={{marginTop: 35}}>
                <Text style={{fontSize: 25, fontWeight: "bold"}}>USERS</Text>
                <AddButton style={{position: "absolute", right: -121, bottom: -17}}/>
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
    )
}

