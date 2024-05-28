// // // src/screens/Order.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { fetchOrders } from '../services/fetchService';
import { setNewOrders } from '../store/newOrdersSlice'; // 引入新的action
import { MaterialIcons } from '@expo/vector-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isExpandedNewOder, setIsExpandedNewOder] = useState(false);
  const [expandedOrdersId, setExpandedOrdersId] = useState({});
  const newOrders = useSelector(state => state.newOrders.orders);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  const loadOrders = async () => {
    try {
      console.log('Fetching orders...(Order.js)');
      const data = await fetchOrders(token);
      console.log('Fetched orders:', data);  // 添加此行以打印返回的数据
      if (data.status === 'OK') {
        setOrders(data.orders);
        console.log('Orders set to state(Order.js)', data.orders);
  
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch orders');
      console.error('Error fetching orders:', error);
    }
  };

  const toggleOrder = (orderId) => {
    setExpandedOrdersId(prevState => ({
      ...prevState,
      [orderId]: !prevState[orderId]
    }));
  };

  const renderOrderItem = ({ item }) => (
    <View>
      <TouchableOpacity style={styles.orderHeader} onPress={() => toggleOrder(item.id)}>
        <Text style={styles.orderText}>
          Order ID: {item.id}  Items: {item.item_numbers}  Total: ${item.total_price ? item.total_price.toFixed(2) : 'N/A'}
        </Text>
        <MaterialIcons name={expandedOrdersId[item.id] ? 'expand-less' : 'expand-more'} size={24} color="black" />
      </TouchableOpacity>

    
      
    </View>
  );

  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={() => setIsExpandedNewOder(!isExpandedNewOder)}>
        <Text style={styles.headerText}>New Orders: {orders.length}</Text>
        <MaterialIcons name={isExpandedNewOder ? 'expand-less' : 'expand-more'} size={24} color="white" />
      </TouchableOpacity>
      {isExpandedNewOder && (
        <FlatList
          data={orders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderText: {
    fontSize: 16,
    flex: 1,
  },
  orderDetails: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
  },
  productQuantity: {
    fontSize: 14,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Orders;
















// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, Image,Button } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchOrders, } from '../services/fetchService';
// import { clearNewOrders } from '../store/newOrdersSlice'; 
// import { addMultiplePaidOrders } from '../store/paidOrdersSlice';

// import { MaterialIcons } from '@expo/vector-icons';

// const Orders = () => {
//   const [orders, setOrders] = useState([]);
//   const [isExpandedNewOder, setIsExpandedNewOder] = useState(false);
//   const [isExpandedPaidOrder, setIsExpandedPaidOrder] = useState(false);
//   const [isExpandedDeliveredOrder, setIsExpandedDeliveredOrder] = useState(false);
//   const [expandedOrdersId, setExpandedOrdersId] = useState({});
//   const newOrders = useSelector(state => state.newOrders.orders);
//   const paidOrders = useSelector(state => state.paidOrders.orders);
//   const token = useSelector(state => state.user.token);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (token) {
//       loadOrders();
//     }
//   }, [token]);

//   const loadOrders = async () => {
//     try {
//       console.log('Fetching orders...(Order.js)');
//       const data = await fetchOrders(token);
//       console.log('Fetched orders:', data);  // 添加此行以打印返回的数据
//       if (data.status === 'OK') {
//         setOrders(data.orders);
//         console.log('Orders set to state(Order.js)', data.orders);
  
//       } else {
//         Alert.alert('Error', data.message);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch orders');
//       console.error('Error fetching orders:', error);
//     }
//   };

//   const toggleOrder = (orderId) => {
//     setExpandedOrdersId(prevState => ({
//       ...prevState,
//       [orderId]: !prevState[orderId]
//     }));
//   };

//   const handlePay = async () => {
//     try {
//       const updatedOrders = await Promise.all(newOrders.map(async order => {
//         const result = await updateOrderStatus(token, order.id, 1, 0);
//         if (result.status === 'OK') {
//           return { ...order, isPaid: 1 };
//         }
//         return order;
//       }));

//       dispatch(addMultiplePaidOrders(updatedOrders)); // 将新订单添加到 paidOrdersSlice
//       dispatch(clearNewOrders()); // 清空 newOrdersSlice
//       Alert.alert('Payment', 'All new orders have been marked as paid.');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update orders status');
//       console.error('Error updating orders status:', error);
//     }
//   };

//   const handleReceive = async () => {
//     try {
//       const updatedOrders = await Promise.all(paidOrders.map(async order => {
//         const result = await updateOrderStatus(token, order.id, 1, 1);
//         if (result.status === 'OK') {
//           return { ...order, isDelivered: 1 };
//         }
//         return order;
//       }));

//       // Dispatch action to update delivered orders in the state
//       Alert.alert('Receive', 'All paid orders have been marked as delivered.');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to update orders status');
//       console.error('Error updating orders status:', error);
//     }
//   };

//   const renderOrderItem = ({ item }) => (
    
//       <View>
//         <TouchableOpacity style={styles.orderHeader} onPress={() => toggleOrder(item.id)}>
//           <Text style={styles.orderText}>
//             Order ID: {item.id}  Items: {item.item_numbers}  Total: ${item.total_price ? item.total_price.toFixed(2) : 'N/A'}
//           </Text>
//           <MaterialIcons name={expandedOrdersId[item.id] ? 'expand-less' : 'expand-more'} size={24} color="black" />
//         </TouchableOpacity>

//       </View>
//   );

  
//   return (
//     <View style={styles.container}>
//        <Text style={styles.pageTitle}>My Orders</Text>
//        {/* New Orders */}
//       <TouchableOpacity style={styles.header} onPress={() => setIsExpandedNewOder(!isExpandedNewOder)}>
//         <Text style={styles.headerText}>New Orders: {Orders.length}</Text>
//         <MaterialIcons name={isExpandedNewOder ? 'expand-less' : 'expand-more'} size={24} color="white" />
//       </TouchableOpacity>
      
//       {isExpandedNewOder && (
//         <View>
//           <FlatList
//             data={orders}
//             renderItem={renderOrderItem}
//             keyExtractor={item.id ? item.id.toString() : 'undefined-id'}
//           />
//           <Button title="Pay" onPress={handlePay} style={styles.payButton} />
               
//         </View>
//       )}
//       {/* Paid Orders */}
//       <TouchableOpacity style={styles.header} onPress={() => setIsExpandedPaidOrder(!isExpandedPaidOrder)}>
//         <Text style={styles.headerText}>Paid Orders: {Orders.length}</Text>
//         <MaterialIcons name={isExpandedPaidOrder ? 'expand-less' : 'expand-more'} size={24} color="white" />
//       </TouchableOpacity>

//       {isExpandedPaidOrder && (
//         <View>
//         <FlatList
//         data={orders}
//         renderItem={renderOrderItem}
//         keyExtractor={ item.id ? item.id.toString() : 'undefined-id'}
         
//         />
//         <Button title="Received" onPress={handleReceive} style={styles.payButton} />
//         </View>
//       )}
//       {/* Delivered Orders */}
//       <TouchableOpacity style={styles.header} onPress={() => setIsExpandedDeliveredOrder(!isExpandedDeliveredOrder)}>
//         <Text style={styles.headerText}>Delivered Orders</Text>
//         <MaterialIcons name={isExpandedDeliveredOrder ? 'expand-less' : 'expand-more'} size={24} color="white" />
//       </TouchableOpacity>
//       {isExpandedDeliveredOrder && (
//         <FlatList
         
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     marginTop: 15,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#007BFF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   headerText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   pageTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   orderText: {
//     fontSize: 16,
//     flex: 1,
//   },
//   orderDetails: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   productContainer: {
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#f9f9f9',
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   productImage: {
//     width: 50,
//     height: 50,
//     marginRight: 10,
//   },
//   productDetails: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   productPrice: {
//     fontSize: 14,
//   },
//   productQuantity: {
//     fontSize: 14,
//   },
//   errorText: {
//     fontSize: 14,
//     color: 'red',
//     textAlign: 'center',
//     marginTop: 10,
//   },
// });

// export default Orders;
