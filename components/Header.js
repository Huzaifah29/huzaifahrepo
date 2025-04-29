import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  const count = useSelector((state) => state.cart.count);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>InstantMall</Text>
      <Text style={styles.cart}>🛒 {count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ddd',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cart: {
    fontSize: 18,
  },
});

export default Header;