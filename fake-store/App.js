import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';


import { StyleSheet, Text, View ,ActivityIndicator} from 'react-native';
// import { SplashScreen } from 'expo-splash-screen';
import * as SplashScreen from 'expo-splash-screen';

// 阻止启动画面自动隐藏
SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    async function prepare() {
      try {
        // 在这里加载所有需要的资源，例如：
        await new Promise(resolve => setTimeout(resolve, 2000)); // 模拟加载资源
      } catch (e) {
        console.warn(e);
      } finally {
        // 加载完毕后，隐藏启动画面
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);


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