// src/services/fetchService.js

const API_BASE_URL = "http://10.0.2.2:3000"; 

export const signUp = async (name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Failed to sign up: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Sign up successful(fetchService.js)');
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Failed to sign in: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Sign in successful:(fetchService.js)');
    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const updateUser = async (token, userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Failed to update user: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('User update successful(fetchService.js)');
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const fetchCartItems = async (token) => {
  try {
    console.log('Calling fetchCartItems API...(fetchService.js)');
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log('fetchCartItems API response(fetchService.js)');
      console.error('Error data:', errorData);
      throw new Error(`Failed to fetch cart items: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetch cart items successful(fetchService.js)');
    return data;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const updateCart = async (token, items) => {
  try {
    console.log('Calling updateCart API with items(fetchService.js)');
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Failed to update cart: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('updateCart API response:success(fetchService.js)');
    return data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};


export const fetchOrders = async (token) => {
  try {
    console.log('Calling fetchOrders API...(fetchService.js)');
    const response = await fetch(`${API_BASE_URL}/orders/all`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Failed to fetch orders: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetch orders API successful(fetchService.js)');
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const createOrder = async (token, items) => {
  try {
    console.log('Calling createOrder API POST (fetchService.js)');
    const response = await fetch(`${API_BASE_URL}/orders/neworder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ items })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('createOrder API response OK (fetchService.js) ');
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const updateOrderStatus = async (token, orderID, isPaid, isDelivered) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/updateorder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ orderID, isPaid, isDelivered })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:');
      throw new Error(`Failed to update order status: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Order status updated (fetchService.js)');
    return data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

