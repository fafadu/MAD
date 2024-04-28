import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // 以 Ionicons 为例

export const Button = ({ onPress, title, icon }) => {
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
         {iconName && <Icon name={iconName} size={20} color={colors.white} />}
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.darkBlue,
    },
    buttonText: {
      marginLeft: 5,
      fontSize: 18,
      color: colors.white,
    },
  });
  
  