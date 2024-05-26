// src/screen/UserProfile
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, updateUser } from '../redux/userSlice';
import { updateUserProfile } from '../services/fetchService';

const UserProfile = ({ navigation }) => {
  const user = useSelector(state => state.user.user);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(user ? user.name : '');
  const [newEmail, setNewEmail] = useState(user ? user.email : '');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const validate = () => {
    const errors = {};
    if (!newName.trim()) {
      errors.newName = 'Name is required';
    }
    if (!newEmail.trim()) {
      errors.newEmail = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newEmail)) {
      errors.newEmail = 'Email is invalid';
    }
    if (editing && newPassword && newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters long';
    }
    return errors;
  };

  const handleUpdate = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const updatedUser = await updateUserProfile(newName, newEmail, newPassword);
      if (updatedUser.status === "error") {
        throw new Error(updatedUser.message);
      }
      dispatch(updateUser({ name: updatedUser.name, email: newEmail }));
      Alert.alert('Profile updated', 'Your profile has been successfully updated.');
      setEditing(false);
    } catch (error) {
      Alert.alert('Update failed', error.message);
    }
  };

  const handleLogout = () => {
    dispatch(signOut());
    Alert.alert('Logged out');
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user ? user.name : 'N/A'}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user ? user.email : 'N/A'}</Text>
      </View>
      {editing ? (
        <View style={styles.editContainer}>
          <TextInput 
            value={newName} 
            onChangeText={setNewName} 
            placeholder="New Name" 
            style={[styles.input, errors.newName && styles.errorInput]}
            placeholderTextColor="#888"
          />
          {errors.newName && <Text style={styles.errorText}>{errors.newName}</Text>}
          <TextInput 
            value={newEmail} 
            onChangeText={setNewEmail} 
            placeholder="New Email" 
            style={[styles.input, errors.newEmail && styles.errorInput]}
            placeholderTextColor="#888"
          />
          {errors.newEmail && <Text style={styles.errorText}>{errors.newEmail}</Text>}
          <TextInput 
            value={newPassword} 
            onChangeText={setNewPassword} 
            placeholder="New Password" 
            secureTextEntry 
            style={[styles.input, errors.newPassword && styles.errorInput]}
            placeholderTextColor="#888"
          />
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setEditing(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
            <Text style={styles.editButtonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%', 
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    width: '30%', 
  },
  value: {
    fontSize: 18,
    marginLeft: 10,
    color: '#666',
    textAlign: 'left',
    width: '70%', 
  },
  editContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '100%',
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
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ff6f61',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editButton: {
    backgroundColor: 'pink',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    width: '48%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    marginVertical: 20,
    alignItems: 'center',
    width: '48%',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
