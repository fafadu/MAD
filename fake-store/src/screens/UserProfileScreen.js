// src/screens/UserProfileScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { userSignedOut } from '../store/userSlice';

const UserProfileScreen = () => {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  

  const handleSignOut = () => {
    dispatch(userSignedOut());
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View>
        <Text style={styles.text}>User Name: {user.username}</Text>
        <Text style={styles.text}>Email: {user.email}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.navigate('UpdateProfile')}
          >
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSignOut}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#000',
  },
  text: {
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfileScreen;
