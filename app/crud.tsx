
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import ItemComponent from '../components/ItemComponent';

// Define the Item type
interface Item {
  id: number;
  name: string;
  description: string;
}

const CrudScreen = () => {
  // Ensure the state is correctly typed
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Item 1', description: 'Description 1' },
    { id: 2, name: 'Item 2', description: 'Description 2' },
  ]);

  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Function to add an item
  const addItem = () => {
    if (name.trim() && description.trim()) {
      setItems((prevItems) => [
        ...prevItems,
        { id: Date.now(), name, description },
      ]);
      setName('');
      setDescription('');
    }
  };

  // Function to update an existing item
  const updateItem = () => {
    if (editingId !== null) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === editingId ? { ...item, name, description } : item
        )
      );
      setEditingId(null);
      setName('');
      setDescription('');
    }
  };

  // Function to delete an item
  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to start editing an item
  const startEditing = (item: Item) => {
    if (!item || typeof item.id !== 'number') return; // Ensures item is valid
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD App</Text>

      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />

      {editingId ? (
        <Button title="Update Item" onPress={updateItem} />
      ) : (
        <Button title="Add Item" onPress={addItem} />
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ItemComponent item={item} onEdit={startEditing} onDelete={deleteItem} />
        )}
      />
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default CrudScreen;
