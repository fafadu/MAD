//src/screen/SignIn
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { setCartItems } from '../redux/cartSlice';
import { signIn, fetchCartItems } from '../services/fetchService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validate = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSignIn = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const response = await signIn(email, password);
      const { token, user } = response;
      console.log('Received user:', user); // debug output
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userId', user.id.toString()); 
      dispatch(setUser(user)); 

      const cartItems = await fetchCartItems(user.id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      dispatch(setCartItems({ items: cartItems })); 

      Alert.alert('Login successful');
      navigation.navigate('Profile'); 
    } catch (error) {
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in with your email and password</Text>
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Email" 
        style={[styles.input, errors.email && styles.errorInput]} 
        placeholderTextColor="#888"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Password" 
        secureTextEntry 
        style={[styles.input, errors.password && styles.errorInput]} 
        placeholderTextColor="#888"
      />
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => { setEmail(''); setPassword(''); setErrors({}); }}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.switchContainer} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.switchText}>Switch to Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 35,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#af4261',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchContainer: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'pink',
    borderRadius: 8,
  },
  switchText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignIn;
