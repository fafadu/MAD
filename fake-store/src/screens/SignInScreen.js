// src/screens/SignInScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch ,useSelector} from 'react-redux';
import { userSignedIn } from '../store/userSlice';
import { signIn } from '../services/fetchService';

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const { loading, error } = useSelector(state => state.user);

  const handleSignIn = async () => {
    
    if (!validateEmail(email)) {
      Alert.alert('Invalid email.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Password must contain at least one uppercase letter, one lowercase letter, and one digit. The minimum length of the password is 8 characters.');
      return;
    }

    try {
      const data = await signIn(email, password);
      console.log('signinscreen Sign in data:', data);

      dispatch(userSignedIn({ user: data, token: data.token }));

    //   dispatch(userSignedIn({
    //     user:{
    //      id: data.id,
    //      name: data.name,
    //      email: data.email,
    //      },
    //      token: data.token
    // }));
     
      Alert.alert('Success', 'Logged in successfully');
      // navigation.navigate('UserProfileScreen'); // Navigate to UserProfile page after successful login
      navigation.navigate('BottomTabs');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', error.message);
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.switchText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchText: {
    textAlign: 'center',
    color: '#007BFF',
  }
});

export default SignInScreen;
