import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; // 确保已安装 @expo/vector-icons
import ProductStack from './ProductStack';
import { Cart } from '../screens/Cart';
import { useSelector } from 'react-redux';
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const cartItemCount = useSelector(state => state.cart.totalItems);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Products" 
        component={ProductStack} 
        options={{
          tabBarLabel: 'Product',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="home" size={size} color={color} />)
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarLabel: 'My Cart',
          tabBarIcon: ({ color, size }) => (<MaterialIcons name="shopping-cart" size={size} color={color} />),
          tabBarBadge: cartItemCount > 0 ? cartItemCount : null,

        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;