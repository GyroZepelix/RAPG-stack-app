import {Text, TextStyle, View, ViewStyle} from "react-native";
import {FC} from "react";
import Colors from "../constants/Colors";
import HorizontalLine from "./HorizontalLine";

type Props = {
    title: string,
    description?: string,
    style?: ViewStyle,
    updatedAt?: number,
}

const TodoComponent: FC<Props> = ({title, description, style, updatedAt}) => {
    const time = new Date(updatedAt)

    return (
        <View style={{...TodoComponentStyle, ...style}}>
            <Text style={TitleStyle}>{title}</Text>
            {
                description && (
                    <>
                        <HorizontalLine height={2} color={Colors.tertiary}/>
                        <Text style={DescriptionStyle}>{description}</Text>
                        <Text style={{...DescriptionStyle, textAlign: "right"}}>{time.getDate()}</Text>
                    </>
                )
            }

        </View>
    )
}

export default TodoComponent

const TodoComponentStyle: ViewStyle = {
    borderStyle: "solid",
    borderColor: Colors.secondary,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "100%",

}

const TitleStyle: TextStyle = {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 5,
}

const DescriptionStyle: TextStyle = {
    fontSize: 15,
    marginTop: 5,
}