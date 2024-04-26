import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import colors from '../constants/colors';


export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        console.log(data)
        setCategories(data.map((category) => ({ id: category, title: category })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // 此处处理点击事件，比如导航到相应分类的产品列表
        console.log('Pressed', item.title);
        // navigation.navigate('ProductList', { category: item.title });
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
          data={categories}
          renderItem={renderCategoryItem}
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

