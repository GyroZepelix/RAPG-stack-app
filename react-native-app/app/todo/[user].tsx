import {ScrollView, StatusBar, StyleProp, Text, TextInput, TextStyle, View, ViewStyle} from "react-native";
import {useLocalSearchParams} from "expo-router";
import Colors from "../../constants/Colors";
import MonoButton from "../../components/MonoButton";
import {useRef} from "react";
import {DrawerLayout} from "react-native-gesture-handler";
import {center} from "../../constants/commonStyles";
import HorizontalLine from "../../components/HorizontalLine";

const Page = () => {

    const drawer = useRef<DrawerLayout>(null);

    const { user } = useLocalSearchParams();

    const navigationView = () => (
        <View style={{...center, backgroundColor: Colors.background, flex: 1, justifyContent: "space-between", paddingVertical: 10}}>
            <View style={{flex: 1, alignSelf: "stretch", alignItems: "center"}}>
                <Text style={navigationTitleStyle}>USERS</Text>
                <HorizontalLine margin={60} height={3} color={Colors.secondary}/>
            </View>
            <MonoButton title={"CLOSE DRAWER"} onPress={() => drawer.current?.closeDrawer()} style={{marginBottom: 10}}/>
        </View>
    );

    return (
        <DrawerLayout
            renderNavigationView={navigationView}
            ref={drawer}
            drawerWidth={300}
            contentContainerStyle={{backgroundColor: Colors.background, ...center, justifyContent: "flex-start", paddingVertical: 10}}
        >
            <StatusBar backgroundColor={Colors.background}/>
            <View>
                <Text style={{fontSize: 25, fontWeight: "bold"}}>TODO</Text>
                <Text style={{fontSize: 15, fontWeight: "500", textAlign: "center"}}>{user}</Text>
            </View>
            <View style={TodoViewStyle}>
                <ScrollView style={{flex:1}}
                contentContainerStyle={{alignItems: "center"}}>
                    {Array.of(1,2,3).map((key) => (
                        <Text key={key} style={{fontSize: 20, fontWeight: "bold", marginBottom: 10}}>TODO {key}</Text>
                    ))}
                </ScrollView>
            </View>
            <MonoButton title={"Back"} onPress={() => {}} style={{marginBottom:10}}/>
        </DrawerLayout>

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
    marginVertical: 20,

}

export default Page
