// AppNavigator.js
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import { MaterialIcons } from '@expo/vector-icons'; // 确保已安装 @expo/vector-icons
// import ProductStack from './ProductStack';
// import { Cart } from '../screens/Cart';
// import { useSelector } from 'react-redux';

// import SignUpScreen from '../screens/SignUpScreen';
// import SignInScreen from '../screens/SignInScreen';
// import UserProfileScreen from '../screens/UserProfileScreen';


// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();

// const AppNavigator = () => {
//   const cartItemCount = useSelector(state => state.cart.totalItems);

// const AuthStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
//     <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In' }} />
    
//     <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{ title: 'User Profile' }} />
//   </Stack.Navigator>
// );



//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen 
//         name="Products" 
//         component={ProductStack} 
//         options={{
//           tabBarLabel: 'Product',
//           tabBarIcon: ({ color, size }) => (<MaterialIcons name="home" size={size} color={color} />)
//         }}
//       />
//       <Tab.Screen 
//         name="Cart" 
//         component={Cart} 
//         options={{
//           tabBarLabel: 'My Cart',
//           tabBarIcon: ({ color, size }) => (<MaterialIcons name="shopping-cart" size={size} color={color} />),
//           tabBarBadge: cartItemCount > 0 ? cartItemCount : null,

//         }}
//       />
//       <Tab.Screen 
//         name="Auth" 
//         component={AuthStack} 
//         options={{
//           tabBarLabel: 'User Profile',
//           tabBarIcon: ({ color, size }) => (<MaterialIcons name="person" size={size} color={color} />)
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// export default AppNavigator;

