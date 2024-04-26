import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import colors from '../constants/colors';

const categories = [
  { id: '1', title: 'Electronics' },
  { id: '2', title: 'Jewelery' },
  { id: '3', title: 'Men\'s Clothing' },
  { id: '4', title: 'Women\'s Clothing' },
];



export const Categories =()=>{
  
  const navigation = useNavigation();


  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // Handle the press
        console.log('Pressed', item.title);
        // Navigate to the category's product list
        // navigation.navigate('ProductList', { category: item.title });
      }}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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

