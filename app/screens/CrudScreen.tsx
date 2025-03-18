import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";

type ItemType = {
  id: number;
  name: string;
};

const CrudScreen = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // ✅ Add Item
  const addItem = () => {
    if (inputText.trim() === "") return;
    setItems([...items, { id: Date.now(), name: inputText }]);
    setInputText("");
  };

  // ✅ Start Editing
  const startEditing = (item: ItemType) => {
    setInputText(item.name);
    setEditingId(item.id);
  };

  // ✅ Update Item
  const updateItem = () => {
    if (editingId === null) return;
    setItems(items.map((item) => (item.id === editingId ? { ...item, name: inputText } : item)));
    setInputText("");
    setEditingId(null);
  };

  // ✅ Delete Item
  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD App</Text>

      {/* Input Field */}
      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={inputText}
        onChangeText={setInputText}
      />

      {/* Add / Update Button */}
      <Button title={editingId !== null ? "Update Item" : "Add Item"} onPress={editingId !== null ? updateItem : addItem} />

      {/* Item List */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.editButton} onPress={() => startEditing(item)}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteItem(item.id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: "#fff" },
  item: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10, borderBottomWidth: 1, backgroundColor: "#fff", marginVertical: 5, borderRadius: 5 },
  itemText: { fontSize: 18 },
  buttons: { flexDirection: "row" },
  editButton: { backgroundColor: "blue", padding: 5, marginRight: 5, borderRadius: 5 },
  deleteButton: { backgroundColor: "red", padding: 5, borderRadius: 5 },
  buttonText: { color: "white", fontSize: 14, fontWeight: "bold" },
});

export default CrudScreen;
