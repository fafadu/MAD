// src/screens/UserProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Alert, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-native-modal';
import { userSignedOut, updateUser } from '../store/userSlice';

const UserProfileScreen = () => {
  // const { user, token, loading, error } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const token = useSelector(state => state.user.token);


  const [isModalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setName(user?.name || ''); // 確保在用戶資料更新後重新設置名稱
    console.log('User data in UserProfileScreen:', user);
  }, [user]);


  const handleSignOut = () => {
    dispatch(userSignedOut());
    navigation.navigate('SignIn');
  };

  const handleUpdateProfile = async() => {
    if (!name || !password) {
      Alert.alert('Error', 'Name and password cannot be empty.');
      return;
    }

    dispatch(updateUser({ token, name, password }))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Profile updated successfully');
        setModalVisible(false); 
      })
      .catch((err) => {
        Alert.alert('Error', err.message);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // if (loading) {
  //   return <ActivityIndicator size="large" color="#0000ff" />;
  // }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {user ? (
        <View>
          <Text style={styles.text}>User Name: {user.name}</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Update Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Profile</Text>
          <TextInput
            style={styles.input}
            placeholder="New User Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleUpdateProfile}>
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserProfileScreen;


