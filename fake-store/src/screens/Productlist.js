import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity,StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';


export const Productlist = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { category } = route.params;  // route.params 包含了传递给该屏幕的所有参数
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);  // 当 category 改变时，重新运行这个 useEffect


  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // 此处处理点击事件，比如导航到相应分类的产品列表
        console.log('Pressed', item.title);
        navigation.navigate('Productdetail', { id: item.id });
        
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.darkBlue} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
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
  });
  
  
