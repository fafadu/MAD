import { StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";

export const TButton = ({ title, onPress, page = false, back = false, disabled = false, backgroundColor = colors.lightBlue }) => {
    const navigation = useNavigation();
    const onNavigate = () => {
        navigation.navigate({ name: page })
    }
    const onBack = () => {
        navigation.goBack();
    }
    return (
        <Pressable 
            disabled={disabled} style={[
            styles.button, 
            backgroundColor ? { backgroundColor } : {}
            ]} 
            onPress={
            back ? onBack :
            page ? onNavigate :
            onPress
            }
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 26,
        borderRadius: 20,
        elevation: 3,
        borderWidth: 2,
    },
    text: {
        fontSize: 16,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: colors.black,
    },
});