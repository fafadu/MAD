// src/services/fetchService.js

const API_BASE_URL = "http://10.0.2.2:3000";

export const signUp = async (name, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/signup`, {  // 确保使用正确的端点 /users/signup
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })  // 确保字段名一致
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error data:', errorData);
      throw new Error(`Failed to sign up: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Sign up successful:', data);
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
      console.log('Sign in successful:', data);
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };