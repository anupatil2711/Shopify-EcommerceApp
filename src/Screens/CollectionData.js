import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native";
import client from "../../shopify";

function CollectionData({ route, navigation }) {
  const { collection } = route.params;
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState("");

  useEffect(() => {
    client.checkout.create().then((checkout) => setCheckout(checkout.id));

    // Fetch products related to the selected collection
    client.collection.fetchWithProducts(collection.id).then((collectionWithProducts) => {
      setProducts(collectionWithProducts.products);
    });
  }, [collection]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productsContainer}>
          {products.map((product) => (
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
    marginTop: 50
  },
  scrollView: {
    flexGrow: 1,
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

export default CollectionData;
