import {Dimensions, StyleSheet} from "react-native";
import { track4goTheme } from "../../../theme/variables/track4goTheme";

//medidas
const {width} = Dimensions.get('screen');
const height = Dimensions.get('window').height;

const Style = StyleSheet.create({
    //Principal
    button: {
        marginBottom: track4goTheme.SIZES.BASE,
        // width: width - track4goTheme.SIZES.BASE * 5,
        width:"100%",
        height: track4goTheme.SIZES.BUTTON_HEIGHT,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
})

export { Style };
