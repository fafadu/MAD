import React from 'react';


export const Products = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="ProdList" 
          component={ProdList} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ProductDetail" 
          component={ProductDetail} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    );
  };