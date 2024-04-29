import React from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { ProductDetail } from './ProductDetail';
const Stack = createStackNavigator()

const products = [
    { id: '1', name: 'Computer', price: '300' },
    { id: '2', name: 'Desk', price: '50' }
  ];

  const ProdList = () => {
    const navigation = useNavigation();
  
    // 用于选择产品并导航到产品详细信息页面的函数
    const selectProduct = (id) => {
        // 这里我们找到了被点击的产品
        const prod = products.find((product) => product.id === id);
        // 使用导航器对象进行导航，将产品信息作为参数传递
        navigation.navigate('ProductDetail', { prod });
    };
  
    return (
        <View style={styles.container}>
          <FlatList
            data={products}
            keyExtractor={(prod) => prod.id.toString()}
            renderItem={({ item }) => (
              <Pressable onPress={() => selectProduct(item.id)}>
                <Text>Product: {item.name} Price: {item.price} </Text>
              </Pressable>
            )}
          />
        </View>
      );
    };
    
export const Products = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="ProdList" 
          component={ProdList} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetail} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22
    },
  });
  
