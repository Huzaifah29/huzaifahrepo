import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import db from "../../firebase";

type ItemType = {
  id: string;
  name: string;
};

const CrudScreen = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [inputText, setInputText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch items in real-time from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "items"), (snapshot) => {
      const fetchedItems: ItemType[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setItems(fetchedItems);
    });

    return () => unsubscribe();
  }, []);

  // Add Item
  const addItem = async () => {
    if (inputText.trim() === "") return;
    await addDoc(collection(db, "items"), { name: inputText });
    setInputText("");
  };

  // Start Editing
  const startEditing = (item: ItemType) => {
    setInputText(item.name);
    setEditingId(item.id);
  };

  // Update Item
  const updateItem = async () => {
    if (!editingId) return;
    const itemRef = doc(db, "items", editingId);
    await updateDoc(itemRef, { name: inputText });
    setInputText("");
    setEditingId(null);
  };

  // Delete Item
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD App with Firestore</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter item"
        value={inputText}
        onChangeText={setInputText}
      />

      <Button
        title={editingId ? "Update Item" : "Add Item"}
        onPress={editingId ? updateItem : addItem}
      />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
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
