import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import colors from '../constants/colors';

export const ImgButton = ({
  name,
  label,
  fun = () => {
    
  },
  style, // 接受外部传入的样式
  
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1 },
        styles.container,
        style, // 将外部传入的样式应用到组件上
      ]}
      onPress={fun}
    >
      <View style={styles.innerContainer}>
        <Ionicons name={name}  color="white" size={20}/>
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    // borderColor: "white",
    borderRadius: 10,
    backgroundColor: colors.lightBlue,
    flexDirection: "row",
    justifyContent:"space-evenly" ,
    alignItems: "center",
    // width: "90%",
    height: 40,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent:"space-evenly" ,
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});