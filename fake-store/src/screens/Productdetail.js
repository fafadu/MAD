import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,ActivityIndicator,Image } from 'react-native';
import colors from '../constants/colors';


export const Productdetail = () => {
    const route = useRoute();
    const navigation = useNavigation();
  
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = route.params;  // route.params 包含了传递给该屏幕的所有参数
  
    useEffect(() => {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await response.json();
          console.log(data)
          setProduct(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, []);
  
    return (
      <View style={styles.container}>
         {loading ? (
      <ActivityIndicator size="large" color={colors.grey} />
    ) : (
      <View>
        <Text style={styles.title}>{product.title}</Text>
        <Text>Price: ${product.price}</Text>
        <Text>Description: {product.description}</Text>
        <Image source={{ uri: product.image }} style={styles.image} />
        
      </View>
    )}
      </View>
    );
  };
  
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50, // Adjust the margin as needed
      backgroundColor: colors.white,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center', // Center the header text
    },
    listContainer: {
      alignItems: 'stretch', // Stretch list items to match the container width
    },
    item: {
      backgroundColor: colors.lightBlue,
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16, // Adjust horizontal margin to match your design
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.grey,
    },
    title: {
      fontSize: 18,
    },
    image: {
        width: '100%', // 根据你的布局需求调整
        height: 200, // 根据你的布局需求调整
        resizeMode: 'contain',
        marginBottom: 10,
      },
  });
  
  