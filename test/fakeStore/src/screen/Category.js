import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CategoryListScreen = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.user.user);

// if is not user navigation to signin
  useEffect(() => {
    const checkUserLogin = () => {
      if (!user) {
        Alert.alert('Please log in', 'Please log in or register to access the product categories.', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('SignIn'),
          },
        ]);
        return false;
      }
      return true;
    };
//api to factch category 
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        Alert.alert('Error', 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    if (checkUserLogin()) {
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, [user, navigation]);

//set my name be the footer
  const renderItem = ({ item }) => (
    item === 'Chien Huang' ? (
      <View style={styles.footer}>
        <Text style={styles.footerText}>{item}</Text>
      </View>
    ) : (
      <TouchableOpacity 
        style={styles.item} 
        onPress={() => navigation.navigate('ProductList', { category: item })}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    )
  );
// set up ActivityIndicator
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product Categories</Text>
      {loading ? (
        <ActivityIndicator size="large" color="pink" />
      ) : (
        <FlatList
          data={[...categories, 'Chien Huang']}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'pink',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 16, 
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  itemText: {
    fontSize: 27,
    color: 'pink',
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  footer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  footerText: {
    fontSize: 16,
    color: 'white',
  },
});

export default CategoryListScreen;
