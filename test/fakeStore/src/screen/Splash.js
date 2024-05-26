// src/screen/splash.js
import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';

const splashImage = require('../../assets/splash.webp');

const Splash = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={splashImage} style={styles.image} resizeMode="cover">
        <Text style={styles.title}>Fake Store</Text>
        <ActivityIndicator size="large" color="pink" />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black', 
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default Splash;