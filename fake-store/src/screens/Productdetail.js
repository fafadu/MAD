import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,ActivityIndicator,Image,ScrollView } from 'react-native';
import colors from '../constants/colors';
import { ImgButton } from '../coponents/ImgButton';
import { TButton } from '../coponents/TButton';


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
        
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.descriptionContainer}>
        <ScrollView>
          <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
        </View>
        <TButton title="Back" back={true}/>
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
      descriptionContainer: {
        flex: 1,  // 使得容器占满剩余空间
        minHeight: 150, // 这将确保容器至少有100单位的高度
        padding: 5,
        // marginVertical: 10,  // 在描述上下添加空间
        marginHorizontal:10,
        borderWidth: 1,
        borderColor: colors.black,
        borderRadius: 0,
        backgroundColor: colors.lightBlue,  // 可以根据你的设计进行修改
      },
      description: {
        fontSize: 16,
        color: colors.black,  // 颜色可以根据需要调整
      },
  });
  
  