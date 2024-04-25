import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';


import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';



export default function App() {

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});