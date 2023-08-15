import {FC, useState} from "react";
import {ColorValue, Pressable, StyleProp, Text, TextStyle, ViewStyle} from "react-native";

type Props = {
    title: string,
    color?: ColorValue,
    backgroundColor?: ColorValue,
    onPress: () => void,
    style?: StyleProp<ViewStyle>
}


const MonoButton: FC<Props> =({title, onPress, color = "#000", backgroundColor = "#fff", style = {}}) => {
    const [pressed, setPressed] = useState<boolean>(false)
    const [monoButtonStyle, monoButtonStylePressed] = monoButtonStyleBuilder(color, backgroundColor)

    return (
        <Pressable onPress={onPress} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} style={style}>
            <Text  style={pressed ? monoButtonStylePressed : monoButtonStyle}>{title}</Text>
        </Pressable>
    )
}

const monoButtonStyleBuilder = (color: ColorValue, backgroundColor: ColorValue) : [StyleProp<TextStyle>, StyleProp<TextStyle>] => {
    let unpressed: StyleProp<TextStyle> = {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: color,
        textAlign: "center",
        textTransform: "uppercase",
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 50,
        textAlignVertical: "center",
        fontWeight: "bold",
    }
    let pressed: StyleProp<TextStyle> = {
        ...unpressed,
        backgroundColor: color,
        color: backgroundColor
    }

    return [unpressed, pressed]
}


export default MonoButton