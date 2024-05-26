// App.js
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import CategoryNavigator from './src/screen/CategoryNavigator';
import Splash from './src/screen/Splash';
import ShoppingCart from './src/screen/ShoppingCart';
import MyOrder from './src/screen/MyOrder';
import UserProfile from './src/screen/UserProfile';
import SignIn from './src/screen/SignIn';
import SignUp from './src/screen/SignUp';
import store from './src/Store';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

  // this is for buttomTab(products, cart, myorders, profile)
function BottomTabNavigator() {
  const totalQuantity = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const totalOrders = useSelector(state => state.cart.totalOrders);
  const user = useSelector(state => state.user.user);

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name=" " 
        component={CategoryNavigator} 
        options={{ 
          tabBarLabel: 'Products',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="home" size={24} color={focused ? 'pink' : 'gray'} />
          )
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={ShoppingCart} 
        options={{ 
          tabBarLabel: 'Cart',
          tabBarIcon: ({ focused }) => (
            <AntDesign name="shoppingcart" size={24} color={focused ? 'pink' : 'gray'} />
          ),
          tabBarBadge: totalQuantity > 0 ? totalQuantity : null
        }} 
      />
      <Tab.Screen 
        name="MyOrder" 
        component={MyOrder} 
        options={{ 
          tabBarLabel: 'My Orders',
          tabBarIcon: ({ focused }) => (
            <AntDesign name="profile" size={24} color={focused ? 'pink' : 'gray'} />
          ),
          tabBarBadge: totalOrders > 0 ? totalOrders : null // Display total orders badge
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={user ? UserProfile : SignIn} 
        options={{ 
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={24} color={focused ? 'pink' : 'gray'} />
          )
        }} 
      />
    </Tab.Navigator>
  );
}

// for singin signout signup
function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUp} /> 
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="UserProfile" component={UserProfile} /> 
    </Stack.Navigator>
  );
}

//for splashscreen 
const App = () => {
  const [isSplashScreen, setIsSplashScreen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsSplashScreen(false);
    }, 3000);
  }, []);

  if (isSplashScreen) {
    return <Splash />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

