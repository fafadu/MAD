// import { StatusBar } from 'expo-status-bar';
// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack";
import {Categories} from "./src/screens/Categories";
import {Productlist} from "./src/screens/Productlist";
 
const Stack = createStackNavigator()
export default function App() {
  return (
  <NavigationContainer>
     <Stack.Navigator>
     <Stack.Screen name="Categories" component={Categories} />
     <Stack.Screen name="Productlist" component={Productlist} />
     </Stack.Navigator>

  </NavigationContainer>
  );
}

