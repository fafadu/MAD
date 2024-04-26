import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Categories =()=>{
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#dedede',
  },
  title: {
    fontSize: 18,
  },
});

// export default CategoriesScreen;
