import React, { useState, useEffect } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, StyleSheet 
} from 'react-native';

// Define Product Type for TypeScript
type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

const API_URL = 'https://fakestoreapi.com/products';

export default function MarketplaceScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        const formattedProducts: Product[] = data.map((item: any) => ({
          id: item.id.toString(),
          name: item.title,
          price: item.price,
          category: item.category,
        }));
        setProducts(formattedProducts);
        setFilteredProducts(formattedProducts);
      } catch (error) {
        Alert.alert('Error', 'Failed to load products');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    Alert.alert('Added to Cart', `${product.name} has been added to your cart!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Instant Mall</Text>
      
      {/* Category Filter */}
      <View style={styles.filterContainer}>
        {['All', 'Clothing', 'Footwear', 'Accessories'].map((category) => (
          <TouchableOpacity 
            key={category} 
            style={[styles.filterButton, selectedCategory === category && styles.selectedFilter]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={styles.filterText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#6200EE" />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: Product }) => (
            <View style={styles.productItem}>
              <View>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Text style={styles.addButtonText}>+ Cart</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>Cart ({cart.length})</Text>
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: Product }) => (
            <Text style={styles.cartItem}>{item.name} - ${item.price}</Text>
          )}
          ListEmptyComponent={<Text>Your cart is empty</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200EE',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  selectedFilter: {
    backgroundColor: '#6200EE',
  },
  filterText: {
    fontSize: 16,
    color: '#fff',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productName: {
    fontSize: 18,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cartContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    fontSize: 16,
  },
});