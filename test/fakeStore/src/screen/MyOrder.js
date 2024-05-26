import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../services/fetchService';
import { setTotalOrders } from '../redux/cartSlice';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const MyOrder = () => {
  const [orders, setOrders] = useState({ new: [], paid: [], delivered: [] });
  const [expandedSection, setExpandedSection] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const loadOrders = async () => {
    try {
      const data = await fetchOrders(user.id);
      const newOrders = data.orders.filter(order => !order.is_paid && !order.is_delivered);
      const paidOrders = data.orders.filter(order => order.is_paid && !order.is_delivered);
      const deliveredOrders = data.orders.filter(order => order.is_delivered);
      setOrders({ new: newOrders, paid: paidOrders, delivered: deliveredOrders });
      dispatch(setTotalOrders(newOrders.length));
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Error fetching orders');
    }
  };

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        loadOrders();
      }
    }, [user])
  );

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      console.log(`Updating order ${orderId} to status ${status}`); // Log the status update
      await updateOrderStatus(orderId, status);
      await loadOrders(); // Reload orders to update the state
      Alert.alert('Success', `Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Error updating order status');
    }
  };

  const renderOrderItem = ({ item }) => {
    let orderItems = [];
    try {
      orderItems = JSON.parse(item.order_items);
    } catch (error) {
      console.error('Error parsing order items:', error);
    }

    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => toggleOrderDetails(item.id)}>
          <View style={styles.orderSummary}>
            <Text style={styles.title}>Order ID: {item.id}</Text>
            <Text>Items: {item.item_numbers}</Text>
            <Text>Total: ${(item.total_price / 100).toFixed(2)}</Text>
            <AntDesign name={expandedOrderId === item.id ? "up" : "down"} size={24} color="black" />
          </View>
        </TouchableOpacity>
        {expandedOrderId === item.id && (
          <View style={styles.details}>
            {Array.isArray(orderItems) ? (
              orderItems.map((product, index) => (
                <View key={index} style={styles.product}>
                  <Image
                    source={{ uri: product.image || 'https://via.placeholder.com/50' }}
                    style={styles.productImage}
                    onError={({ nativeEvent: { error } }) => {
                      console.error(`Error loading image for product ${product.id}:`, error);
                    }}
                  />
                  <View style={styles.productDetails}>
                    <Text style={styles.productTitle}>{product.title || 'No title available'}</Text>
                    <Text>Price: ${(product.price).toFixed(2)}</Text>
                    <Text>Quantity: {product.quantity}</Text>
                  </View>
                </View>
              ))
            ) : (
              <Text>No order items available</Text>
            )}
            {item.is_paid === 0 && item.is_delivered === 0 && (
              <TouchableOpacity style={styles.button} onPress={() => handleUpdateOrderStatus(item.id, 'paid')}>
                <Text style={styles.buttonText}>Pay</Text>
              </TouchableOpacity>
            )}
            {item.is_paid === 1 && item.is_delivered === 0 && (
              <TouchableOpacity style={styles.button} onPress={() => handleUpdateOrderStatus(item.id, 'delivered')}>
                <Text style={styles.buttonText}>Receive</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('new')}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Orders: {orders.new.length}</Text>
            <AntDesign name={expandedSection === 'new' ? "up" : "down"} size={24} color="white" />
          </View>
        </TouchableOpacity>
        {expandedSection === 'new' && (
          <FlatList
            data={orders.new}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
          />
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('paid')}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Paid Orders: {orders.paid.length}</Text>
            <AntDesign name={expandedSection === 'paid' ? "up" : "down"} size={24} color="white" />
          </View>
        </TouchableOpacity>
        {expandedSection === 'paid' && (
          <FlatList
            data={orders.paid}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
          />
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={() => toggleSection('delivered')}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivered Orders: {orders.delivered.length}</Text>
            <AntDesign name={expandedSection === 'delivered' ? "up" : "down"} size={24} color="white" />
          </View>
        </TouchableOpacity>
        {expandedSection === 'delivered' && (
          <FlatList
            data={orders.delivered}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderOrderItem}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  item: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  product: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff6f61',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
  },
});

export default MyOrder;