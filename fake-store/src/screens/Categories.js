import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const categories = [
  { id: '1', title: 'Electronics' },
  { id: '2', title: 'Jewelery' },
  { id: '3', title: 'Men\'s Clothing' },
  { id: '4', title: 'Women\'s Clothing' },
];

const CategoryItem = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const CategoriesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <CategoryItem
      title={item.title}
      onPress={() => console.log('Pressed on ' + item.title)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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

export default CategoriesScreen;
