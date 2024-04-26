import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native";
import client from "../../shopify";

function Home({ route, navigation }) {
  const { phone } = route.params;
  const [collections, setCollections] = useState([]);
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    client.checkout.create().then((checkout) => setCheckout(checkout.id));

    client.collection.fetchAllWithProducts().then((collections) => {
      setCollections(collections);
    });

    client.product.fetchAll().then((products) => {
      setProducts(products);
      setSearchResults(products); // Initialize search results with all products
    });
  }, []);

  // Function to handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults(products); // If search query is empty, show all products
    } else {
      // Filter products based on search query
      const filteredResults = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>E-Commerce App</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Fetch", { phone } )}>
          <Image source={require('../Images/user.png')} style={{ width: 24, height: 24 }} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Products"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Carousel for Collections */}
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {collections.map(collection => (
            <TouchableOpacity
              key={collection.id}
              style={styles.collectionItem}
              onPress={() => navigation.navigate("CollectionData", { collection: collection })} >
              <Image
                source={{ uri: collection.image.src }}
                style={styles.collectionImage}
              />
              <Text style={styles.collectionTitle}>{collection.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Display Search Results */}
        <View style={styles.productsContainer}>
          {searchResults.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productItem}
              onPress={() => navigation.navigate("Product", { product: product, checkoutId: checkout })}
            >
              <Image
                source={{ uri: product.images[0].src }}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>{product.variants[0].price.amount}</Text>
              <Button
                title="Proceed"
                color="#841584"
                onPress={() =>
                  navigation.navigate("Product", {
                    product: product,
                    checkoutId: checkout,
                  })
                }
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    margin: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
  },
  scrollView: {
    flexGrow: 1,
  },

  collectionItem: {
    width: 200,
    height: 260,
    marginHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
  },
  collectionImage: {
    width: '100%',
    height: '90%',
    marginBottom: 10,
    resizeMode: 'cover',
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  productItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Home;

