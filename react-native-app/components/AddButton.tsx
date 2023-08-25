import {Text, Pressable, ViewStyle, ColorValue} from "react-native";
import {FC, useState} from "react";

type Props = {
    style: ViewStyle,
    color?: ColorValue,
    backgroundColor?: ColorValue,
    onPress?: () => void,
}
const AddButton:FC<Props> = ({style, color = "#000", backgroundColor = "#fff", onPress = () => {}}) => {

    const [pressed, setPressed] = useState<boolean>(false)

    return (
        <Pressable
            style={{borderColor: color, backgroundColor: pressed ? color : backgroundColor, ...pressableStyle, ...style}}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
            onPress={onPress}>
            <Text style={{color: pressed ? backgroundColor : color, fontSize: 30, fontWeight: "bold", textAlignVertical: "center", fontFamily: "monospace"}}>+</Text>
        </Pressable>
    )
}

export default AddButton

const pressableStyle: ViewStyle = {
    borderRadius: 100,
    paddingHorizontal: 11.2,
    borderStyle: "solid",
    borderWidth: 2,
}

