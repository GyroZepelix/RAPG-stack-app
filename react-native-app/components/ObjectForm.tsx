import {ColorValue, Pressable, Text, TextInput, View, ViewStyle} from "react-native";
import MonoButton from "./MonoButton";
import {ReactNode, useState} from "react";
import {ObjectFormContext, ObjectFormContextValues, useObjectFormContext} from "../hooks/useObjectFormContext";
import {center} from "../constants/commonStyles";

interface Props {
    onClose?: () => void,
    onSubmit?: (value: Record<string, string>) => void,
    backgroundColor?: ColorValue,
    textColor?: ColorValue,
    title?: string,
    children: ReactNode
}

const ObjectForm = ({
        onClose = () => {},
        onSubmit = (test) => {},
        backgroundColor = "#fff",
        textColor = "#000",
        title = "Form",
        children
    }: Props) => {

    const formContext: ObjectFormContextValues = {
        value: useState({})
    }
    const onPrepareSubmit = () => {
        console.log(formContext.value[0])
        onSubmit(formContext.value[0])
    }

    const formStyle = formStyleFactory(backgroundColor, textColor)

    return (
        <ObjectFormContext.Provider value={formContext}>
            <View style={{position: "absolute", zIndex: 11, bottom:0, top: 0, left: 0, right: 0, ...center, pointerEvents: "box-none"}}>
                <View style={{...formStyle}}>
                    <Text style={{fontWeight: "600", fontSize: 25}}>{title}</Text>
                    { children }
                    <MonoButton style={{marginBottom: 5}} title={"Create"} onPress={onPrepareSubmit} />
                </View>
            </View>
            <Pressable onPress={onClose}
                style={{...tintStyle}}>
            </Pressable>
        </ObjectFormContext.Provider>
    )
}

type TextInputProps = {
    label: string,
    value?: string
}

ObjectForm.TextInput = ({label, value = label.toLowerCase()}: TextInputProps) => {
    const context = useObjectFormContext();
    const onValueChange = (text: string) => {
        context.value[1]((prev) => ({...prev, [value]: text}))
    }

    return (
        <TextInput placeholder={label} onChangeText={onValueChange} />
    )
}

const tintStyle: ViewStyle = {
    position: "absolute",
    backgroundColor: "#000000a3",
    right: 0,
    top: 0,
    zIndex: 10,
    bottom:0,
    left: 0,
}

const formStyleFactory = (backgroundColor: ColorValue, textColor: ColorValue): ViewStyle => (
    {
        backgroundColor: backgroundColor,
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 10,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: textColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
    }
)

export default ObjectForm