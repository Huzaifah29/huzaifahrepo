import React from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/cartSlice';
import { View, Text, Button, StyleSheet } from 'react-native';

const Product = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.product}>
      <Text style={styles.name}>Product Item</Text>
      <Button title="Add to Cart" onPress={() => dispatch(increment())} />
      <Button title="Remove from Cart" onPress={() => dispatch(decrement())} />
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Product;