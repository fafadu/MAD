// src/screen/SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { signUp, signOut } from '../services/fetchService';
import { clearCart } from '../redux/cartSlice';  // Import clearCart

const SignUp = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validate = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  const handleSignUp = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      await signOut();  // Clear previous user data
      dispatch(clearCart());  // Clear the cart
      const user = await signUp(name, email, password);
      if(user.status ==="error"){
        console.log(user.message);
        return;
      }
      dispatch(setUser(user));
      Alert.alert('Registration successful', 'Your account has been created.');
      navigation.navigate('Profile');
    } catch (error) {
      Alert.alert('Registration failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up a new user</Text>
      <TextInput 
        value={name} 
        onChangeText={setName} 
        placeholder="Name" 
        style={[styles.input, errors.name && styles.errorInput]} 
        placeholderTextColor="#888"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
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
        <TouchableOpacity style={styles.button} onPress={() => { setName(''); setEmail(''); setPassword(''); setErrors({}); }}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.switchContainer} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.switchText}>Switch to Sign In</Text>
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
    backgroundColor: 'linear-gradient(45deg, #f3ec78, #af4261)', // 渐变背景
  },
  title: {
    fontSize: 26, // 调整字体大小
    marginBottom: 30, // 调整间距
    fontWeight: 'bold',
    color: '#333', // 改变字体颜色
  },
  input: {
    width: 300,
    height: 50, // 增加高度
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10, // 调整圆角
    marginBottom: 15, // 调整间距
    paddingLeft: 15, // 调整内边距
    backgroundColor: '#fff',
    shadowColor: '#000', // 阴影效果
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    backgroundColor: '#af4261', // 改变按钮颜色
    padding: 12, // 调整内边距
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000', // 阴影效果
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    backgroundColor: 'pink', // 改变背景颜色
    borderRadius: 8,
    shadowColor: '#000', // 阴影效果
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  switchText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SignUp;
