import {ScrollView, StatusBar, StyleProp, Text, TextStyle, View, ViewStyle} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import Colors from "../../constants/Colors";
import MonoButton from "../../components/MonoButton";
import {useRef, useState} from "react";
import {DrawerLayout} from "react-native-gesture-handler";
import {center} from "../../constants/commonStyles";
import HorizontalLine from "../../components/HorizontalLine";
import {EnrichedQueryResult} from "../../interfaces/EnrichedQueryResult";
import {UserWithPartialTodo} from "../../interfaces/User";
import {gql, useQuery} from "@apollo/client";
import TodoComponent from "../../components/TodoComponent";
import Todo from "../../interfaces/Todo";
import AddButton from "../../components/AddButton";
import AddObjectForm from "../../components/AddObjectForm";

const Page = () => {

    const drawer = useRef<DrawerLayout>(null);
    const [addingTodo, setAddingTodo] = useState<boolean>(false);

    const { userId } = useLocalSearchParams();

    const onTodoAdd = () => {
        setAddingTodo(true);
    }

    const user: EnrichedQueryResult<
        UserWithPartialTodo<"title" | "description" | "updatedAt">,
        "user",
        "username" | "todos"
    > = useQuery(gql`
    query {
        user(id: "${userId}") {
            username
            todos {
                title
                description
                updatedAt
            }
        }
    }
    `)
    let todos: [Pick<Todo, "title" | "description" | "updatedAt">];
    user.loading || (todos = user.data.user.todos);

    const navigationView = () => (
        <View style={{...center, backgroundColor: Colors.background, flex: 1, justifyContent: "space-between", paddingVertical: 10}}>
            <View style={{flex: 1, alignSelf: "stretch", alignItems: "center", marginTop: 35}}>
                <Text style={navigationTitleStyle}>USERS</Text>
                <HorizontalLine margin={60} height={3} color={Colors.secondary}/>
            </View>
            <MonoButton title={"CLOSE DRAWER"} onPress={() => drawer.current?.closeDrawer()} style={{marginBottom: 10}}/>
        </View>
    );

    return (
        <>
            { addingTodo &&
                <AddObjectForm  onClose={() => setAddingTodo(false)}>
                </AddObjectForm>
            }
            <DrawerLayout
                renderNavigationView={navigationView}
                ref={drawer}
                drawerWidth={300}
                contentContainerStyle={{backgroundColor: Colors.background, ...center, justifyContent: "flex-start"}}
            >
                <StatusBar backgroundColor={Colors.background}/>
                <View style={{marginTop: 35, marginBottom: 10}}>
                    <Text style={{fontSize: 25, fontWeight: "bold"}}>TODO</Text>
                    <AddButton style={{position: "absolute", right: -120, bottom: 7}} onPress={onTodoAdd}/>
                    <Text style={{fontSize: 20, fontWeight: "500", textAlign: "center", textTransform: "capitalize"}}>{user.loading || user.data.user.username}</Text>
                </View>
                <View style={TodoViewStyle}>

                    <ScrollView style={{flex: 1}} contentContainerStyle={{alignItems: "center"}}>
                        {user.loading || todos.map((todo) => (
                                <TodoComponent key={todo.title}
                                               title={todo.title}
                                               description={todo.description}
                                               updatedAt={todo.updatedAt}
                                               style={{marginVertical: 10}}/>
                            )
                        )}
                    </ScrollView>

                </View>
                <MonoButton title={"Back"} onPress={() => {router.back()}} style={{marginVertical: 10}}/>
            </DrawerLayout>
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
