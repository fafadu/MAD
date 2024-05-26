// src/screen/CategoryNavigator.jsimport React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Category from './Category';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

const Stack = createStackNavigator();

const CategoryNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Category" component={Category} options={{ title: 'Category' }} />
      <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Product List' }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Product Detail' }} />
    </Stack.Navigator>
  );
};

export default CategoryNavigator;
