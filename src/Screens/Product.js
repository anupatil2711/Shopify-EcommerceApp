import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import client from "../../shopify";

import { LogBox } from 'react-native';


const Product = ({ route, navigation }) => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);
  const { product, checkoutId } = route.params;
  const [relatedCollections, setRelatedCollections] = useState([]);

  useEffect(() => {
    // Fetch related collections based on the product
    client.collection.fetchAllWithProducts().then((collections) => {
      const related = collections.filter((collection) =>
        collection.products.some((p) => p.id === product.id)
      );
      setRelatedCollections(related);
    });
  }, [product]);

  const addToCart = async (productVariantId, checkoutId) => {
    try {
      const lineItemsToAdd = [
        {
          variantId: productVariantId,
          quantity: 1,
        },
      ];

      await client.checkout.addLineItems(checkoutId, lineItemsToAdd);
      const updatedCheckout = await client.checkout.fetch(checkoutId);
      
      navigation.navigate("Cart", { checkoutId, lineItems: updatedCheckout.lineItems });
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.productInfo}>
        <Image source={{ uri: product.images[0].src }} style={styles.productImage} />
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Button color="#841584" title="Add to Cart" onPress={() => addToCart(product.variants[0].id, checkoutId)} />
      </View>
      <View style={styles.relatedCollections}>
        {relatedCollections.map((collection) => (
          <TouchableOpacity key={collection.id} onPress={() => navigation.navigate("CollectionData", { collection: collection })} >
            <View style={styles.collectionItem}>
              <Image source={{ uri: collection.image.src }} style={styles.collectionImage} />
              <Text style={styles.collectionTitle}>{collection.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  productInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  productImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: 'black',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productDescription: {
    textAlign: "center",
    marginBottom: 20,
  },
  relatedCollections: {
    marginTop: 20,
  },
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
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
    textAlign: "center",
  },
});

export default Product;
