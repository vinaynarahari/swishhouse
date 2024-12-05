import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useCart } from '../contexts/cartContext';
import { useRouter } from 'expo-router';

const Cart = () => {
  const { cart } = useCart();
  const router = useRouter();

  const handlePayment = () => {
 
    router.push('/payment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyMessage}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartItemText}>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <Button title="Proceed to Payment" onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  cartItem: {
    padding: 10,
    borderBottomWidth: 1,
  },
  cartItemText: {
    fontSize: 18,
  },
});

export default Cart;
