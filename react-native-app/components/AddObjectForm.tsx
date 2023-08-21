import {ColorValue, Pressable, Text, View, ViewStyle} from "react-native";
import MonoButton from "./MonoButton";

type Props<FormData extends Record<string, string>> = {
    onClose?: () => void
    onSubmit?: (data: FormData) => void
    backgroundColor?: ColorValue
    textColor?: ColorValue
    title?: string,
    fields?: (keyof FormData)[]
}
const AddObjectForm = <FormData extends Record<string, string>>(



    {
        onClose = () => {},
        onSubmit = () => {},
        backgroundColor = "#fff",
        textColor = "#000",
        title = "Form",
        fields = [] as (keyof FormData)[],
        children
    }) => {

    const onPrepareSubmit = () => {
        onSubmit()
    }

    const formStyle = formStyleFactory(backgroundColor, textColor)

    return (
        <Pressable onPress={onClose}
            style={{...tintStyle}}>
            <View style={{...formStyle}}>
                <Text style={{fontWeight: "600", fontSize: 25}}>{title}</Text>
                {
                    fields.map((field, key) => <FormField key={key} label={field} />)
                }
                <MonoButton style={{marginBottom: 5}} title={"Create"} onPress={onPrepareSubmit} />
            </View>
        </Pressable>
    )

    const TextInput = ({label}) => {
        return (
            <>
                <Text>Input</Text>
            </>
        )
    }
}


type FormFieldProps<input, output> = () => {}


const tintStyle: ViewStyle = {
    position: "absolute",
    display: "flex",
    backgroundColor: "#000000a3",
    right: 0,
    top: 0,
    zIndex: 10,
    bottom:0,
    left: 0,
    justifyContent: "center",
    alignItems: "center"
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
        alignItems: "center"
    }
)

export default AddObjectForm