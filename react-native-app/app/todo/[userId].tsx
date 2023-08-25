import {ScrollView, StatusBar, StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import Colors from "../../constants/Colors";
import MonoButton from "../../components/MonoButton";
import {useRef, useState} from "react";
import {DrawerLayout} from "react-native-gesture-handler";
import {center} from "../../constants/commonStyles";
import {EnrichedQueryResult} from "../../interfaces/EnrichedQueryResult";
import {UserWithPartialTodo} from "../../interfaces/User";
import {gql, useMutation, useQuery} from "@apollo/client";
import TodoComponent from "../../components/TodoComponent";
import Todo from "../../interfaces/Todo";
import AddButton from "../../components/AddButton";
import ObjectForm from "../../components/ObjectForm";
import {ADD_TODO, GET_USER_BY_ID} from "../../utils/graphql_queries";



const Page = () => {


    const [addingTodo, setAddingTodo] = useState<boolean>(false);
    const { userId } = useLocalSearchParams();

    const user: EnrichedQueryResult<
        UserWithPartialTodo<"title" | "description" | "updatedAt" | "id">,
        "user",
        "username" | "todos"
    > = useQuery(GET_USER_BY_ID, {variables: {id: userId}});

    const [addTodo, data] = useMutation(ADD_TODO, {
        refetchQueries: [
            {
                query: GET_USER_BY_ID,
                variables: {id: userId}
            },
            'GetUserById'
        ]
    });

    const onTodoAdd = () => {
        setAddingTodo(true);
    }

    const onTodoCreate = (value: Record<string, string>) => {
        addTodo({
            variables: {
                title: value.title,
                description: value.description,
                userId: userId
            }
        }).then(() => {
            setAddingTodo(false);
        })
    }


    let todos: [Pick<Todo, "title" | "description" | "updatedAt" | "id">];
    user.loading || (todos = user.data.user.todos);

    return (
        <>
            { addingTodo &&
                <ObjectForm onSubmit={onTodoCreate} onClose={() => setAddingTodo(false)} title={"Create Todo"} >
                    <ObjectForm.TextInput label={"Title"}/>
                    <ObjectForm.TextInput label={"Description"}/>
                </ObjectForm>
            }
            <View style={{backgroundColor: Colors.background, ...center, justifyContent: "flex-start", height: "100%"}} >
                <StatusBar backgroundColor={Colors.background}/>
                <View style={{marginTop: 35, marginBottom: 10}}>
                    <Text style={{fontSize: 25, fontWeight: "bold"}}>TODO</Text>
                    <AddButton style={{position: "absolute", right: -120, bottom: 7}} onPress={onTodoAdd}/>
                    <AddButton style={{position: "absolute", right: 120, bottom: 7}} onPress={() => user.refetch()}/>
                    <Text style={{fontSize: 20, fontWeight: "500", textAlign: "center", textTransform: "capitalize"}}>{user.loading || user.data.user.username}</Text>
                </View>
                <View style={TodoViewStyle}>

                    <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: "center"}}>
                        {user.loading || todos.map((todo) => (
                                <TodoComponent key={todo.id}
                                               title={todo.title}
                                               description={todo.description}
                                               updatedAt={todo.updatedAt}
                                               style={{marginVertical: 10}}/>
                            )
                        )}
                    </ScrollView>

                </View>
                <MonoButton title={"Back"} onPress={() => {router.back()}} style={{marginVertical: 10}}/>
            </View>
    </>


    )
}

const navigationTitleStyle: StyleProp<TextStyle> = {
    fontWeight: "bold",
    fontSize: 25,
}

const TodoViewStyle: ViewStyle = {
    flex: 1,
    flexGrow: 1,
    alignSelf: "stretch",
    paddingHorizontal: 20,
    borderStyle: "solid",
    borderColor: Colors.tertiary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
}

export default Page
