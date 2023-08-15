import {StyleProp, View, ViewStyle} from "react-native";
import {FC} from "react";

type Props = {
    color?: string
    height?: number
    style?: ViewStyle
    margin?: number
}
const HorizontalLine:FC<Props> = ({color = "#000", height = 2, style = {}, margin = 0}) => {
    return (
        <View style={{
            backgroundColor: color,
            height: height,
            borderRadius: 100,
            width: `${100-margin}%`,
            ...style
        }} />
    )
}

export default HorizontalLine