// components/ItemComponent.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ItemComponent = ({ item, onEdit, onDelete }) => {
  if (!item) return null; // Prevents errors if item is undefined

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name} - {item.description}</Text>
      <Button title="Edit" onPress={() => onEdit(item)} />
      <Button title="Delete" onPress={() => onDelete(item.id)} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    flex: 1,
  },
});

export default ItemComponent;
