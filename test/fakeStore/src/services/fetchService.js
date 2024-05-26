// src/services/fetchService.js
import AsyncStorage from '@react-native-async-storage/async-storage';
const API_URL = 'http://localhost:3000';

export const signUp = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('SignUp response:', data);

    if (!data.token || !data.id || !data.email) {
      throw new Error('Invalid response format');
    }

    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('userId', data.id.toString());

    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const updateUserProfile = async (name, email, password) => {
  try {
    const userId = await AsyncStorage.getItem('userId'); 
    const token = await AsyncStorage.getItem('token');
    console.log('Updating user profile for ID:', userId); 
    console.log('Using token:', token); 
    const response = await fetch(`${API_URL}/users/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ id: userId, name, email, password }), 
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Update failed');
    }
    const data = await response.json();
    console.log('Update response data:', data); 
    return data; 
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || 'Login failed');
    }

    const data = await response.json();
    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
    };

    if (!data.token || !user) {
      throw new Error('Invalid response format');
    }

    await AsyncStorage.setItem('token', data.token); 
    await AsyncStorage.setItem('userId', user.id.toString()); 

    // Fetch and save cart items
    const cartItems = await fetchCartItems(user.id);
    await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems)); 

    return { token: data.token, user, cartItems };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const signOut = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('userId');
  await AsyncStorage.removeItem('cartItems');  // Clear cart items on sign out
};

export const updateCart = async (userId, items) => {
  const token = await AsyncStorage.getItem('token');
  const formattedItems = items.map(item => ({
    id: item.id,
    price: item.price,
    count: item.quantity
  }));

  const response = await fetch(`${API_URL}/cart`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userId, items: formattedItems })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response text:', errorText);
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  console.log('Cart update response:', data);
  return data;
};


export const fetchCartItems = async (userId) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/cart`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'userId': userId
    }
  });

  const textResponse = await response.text();  // Read response as text
  try {
    const data = JSON.parse(textResponse);  // Attempt to parse JSON
    console.log('Fetched cart items:', data.items);  // 添加調試日誌
    return data.items.map(item => ({
      ...item,
      image: item.image,  // 確保圖片URL存在
      quantity: item.count
    }));
  } catch (error) {
    console.error('Error parsing JSON:', error);
    console.error('Response text:', textResponse);  // Log the full response text
    throw new Error(`Network response was not ok: ${response.status}`);
  }
};


export const submitOrder = async (userId, items) => {
  const token = await AsyncStorage.getItem('token');
  const formattedItems = items.map(item => ({
    id: item.id,
    title: item.title,
    price: item.price,
    image: item.image,
    quantity: item.quantity
  }));

  const response = await fetch(`${API_URL}/orders/neworder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ userId, items: formattedItems })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response text:', errorText);
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  return data;
};

export const fetchOrders = async (userId) => {
  const token = await AsyncStorage.getItem('token');
  const response = await fetch(`${API_URL}/orders/all?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response text:', errorText);
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  console.log('Fetched orders data:', data); 
  return data;
};



export const updateOrderStatus = async (orderId, status) => {
  const token = await AsyncStorage.getItem('token');
  const is_paid = status === 'paid' ? 1 : 0;
  const is_delivered = status === 'delivered' ? 1 : 0; // Ensure this matches the expected field

  const response = await fetch(`${API_URL}/orders/updateorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ orderID: orderId, isPaid: is_paid, isDelivered: is_delivered })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response text:', errorText);
    throw new Error(`Network response was not ok: ${response.status}`);
  }

  const data = await response.json();
  return data;
};