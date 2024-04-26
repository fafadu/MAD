import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../constants/colors';


export const Productlist = () => {
const Productlist = ({ route }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = route.params; // 从导航参数中获取当前类别

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const renderProductItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      // 其他产品信息，比如图片等
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.darkBlue} />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};
}

const styles = StyleSheet.create({
  // ... 样式定义 ...
});
