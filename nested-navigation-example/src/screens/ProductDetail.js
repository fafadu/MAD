import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Text, Button, StyleSheet } from 'react-native';
import { Order } from './Order';

const Tabs = createBottomTabNavigator();

export const ProductDetail = ({ route }) => {
    return (
      <Tabs.Navigator screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="ProdDetCom"
          component={ProductDetailCom}
          initialParams={{ prod: route.params.prod }}
          options={{ headerShown: false, tabBarLabel: 'Product Detail' }}
        />
        <Tabs.Screen
          name="Order"
          component={Order}
          // 如果 Order 屏幕有额外的选项，也可以在这里添加
        />
      </Tabs.Navigator>
    );
  };

// 假设这个组件是 ProductDetail.js 的一部分
const ProductDetailCom = ({ navigation, route }) => {
    const { id, name, price } = route.params.prod;
    return (
      <View style={styles.container}>
        <Text>Product Detail Screen</Text>
        <Text>ID: {id}</Text>
        <Text>Name: {name}</Text>
        <Text>Price: {price}</Text>
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
        />
      </View>
    );
  };
  
  // 添加一个基本的样式对象
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
      padding: 20,
    },
    // 你可以根据需要扩展更多的样式
  });

















