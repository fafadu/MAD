import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { addToCart, removeFromCart, setCartItems, clearCart, incrementNewOrdersCount } from '../redux/cartSlice';
import { fetchCartItems, submitOrder, updateCart } from '../services/fetchService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items) || [];
  const totalPrice = useSelector(state => state.cart.totalPrice) || 0;
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const savedCartItems = await AsyncStorage.getItem('cartItems');
        if (savedCartItems) {
          dispatch(setCartItems({ items: JSON.parse(savedCartItems) }));
        } else if (user) {
          const data = await fetchCartItems(user.id);
          const cartItemsWithDetails = await Promise.all(data.map(async item => {
            const response = await fetch(`https://fakestoreapi.com/products/${item.id}`);
            const productDetails = await response.json();
            return {
              ...item,
              image: productDetails.image,
              title: productDetails.title,
              quantity: item.count
            };
          }));
          dispatch(setCartItems({ items: cartItemsWithDetails }));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
        Alert.alert('Error', 'Error loading cart items');
      }
    };

    if (user) {
      loadCartItems();
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && cartItems.length > 0) {
      const saveCart = async () => {
        try {
          await updateCart(user.id, cartItems);
          await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
          console.error('Error saving cart items:', error);
        }
      };
      saveCart();
    }
  }, [cartItems, user]);

  const increment = async (item) => {
    const updatedCartItems = cartItems.map(i => 
      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
    );
    dispatch(addToCart(item));
    await updateCart(user.id, updatedCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const decrement = async (item) => {
    const updatedCartItems = item.quantity > 1 
      ? cartItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i)
      : cartItems.filter(i => i.id !== item.id);

    dispatch(removeFromCart({ id: item.id, type: item.quantity > 1 ? 'decrement' : 'remove' }));
    await updateCart(user.id, updatedCartItems);
    await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = async () => {
    if (!user) {
      Alert.alert('Error', 'You need to be signed in to perform this action.');
      return;
    }
    try {
      await submitOrder(user.id, cartItems);
      dispatch(clearCart());
      dispatch(incrementNewOrdersCount());
      await AsyncStorage.removeItem('cartItems');

      Alert.alert('Success', 'Your order has been placed!');
      navigation.navigate('MyOrder');
    } catch (error) {
      console.error('Error submitting order:', error);
      Alert.alert('Error', 'There was an error placing your order.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image} 
        onError={(error) => console.error('Error loading image:', error.nativeEvent.error)} 
      />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
        <View style={styles.quantitySection}>
          <TouchableOpacity onPress={() => decrement(item)} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increment(item)} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Total Price: ${totalPrice.toFixed(2)}</Text>
            <Text style={styles.summaryText}>Total Items: {totalItems}</Text>
          </View>
          <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ff6f61',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  quantity: {
    fontSize: 16,
    color: '#333',
  },
  summary: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#ff6f61',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
});

export default ShoppingCart;
