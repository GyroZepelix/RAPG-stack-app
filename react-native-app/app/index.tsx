import {
    SafeAreaView, StatusBar,
    StyleProp,
    Text,
    TextInput,
    View
} from "react-native";
import {Link} from "expo-router";
import {useState} from "react";
import Colors from "../constants/Colors";
import {center} from "../constants/commonStyles";

export default function Page() {



    const [username, setUsername] = useState<string>("")



    return (
        <SafeAreaView style={{backgroundColor: Colors.background, ...center}}>
            <StatusBar backgroundColor={Colors.background} />
            <Text>Page Test!</Text>
            <TextInput onChangeText={text => setUsername(text)} />
            <Link href={`todo/${username || "NotFound"}`}>Test User</Link>
        </SafeAreaView>
    )
}

