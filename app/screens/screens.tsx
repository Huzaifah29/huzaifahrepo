import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';


// Define the type for an item
type ItemType = {
  id: number;
  name: string;
  description: string;
};

const CrudScreen = () => {
  const [items, setItems] = useState<ItemType[]>([
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // ✅ Fix: Ensure id is typed as a number
  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // ✅ Fix: Ensure item is of type ItemType
  const startEditing = (item: ItemType) => {
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD App</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name} - {item.description}</Text>
            <Button title="Edit" onPress={() => startEditing(item)} />
            <Button title="Delete" onPress={() => deleteItem(item.id)} color="red" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CrudScreen;
