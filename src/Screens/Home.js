import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native";
import client from "../../shopify";


function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState("");

  
  useEffect(() => {
    client.checkout.create().then((checkout) => setCheckout(checkout.id));
    client.product.fetchAll().then((products) => {
      setProducts(products);
    });
    // client.collection.fetchAllWithProducts().then((collections) => {
    //   // Do something with the collections
    //   console.log(collections.products.image);
    //   //console.log(collections.products.image);

    // });
    
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.headerText}>E-Commerce App</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <Image source = {require('../Images/cart.png')}  style={{width: 24, height: 24}}/>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productsContainer}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productItem}
            >
              <Image
                source={{ uri: product.images[0].src }}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productTitle}>{product.variants[0].price.amount}</Text>
    
              <Button title= "Proceed" color="#841584" 
                onPress={() =>
                navigation.navigate("Product", {
                  product: product,
                  checkoutId: checkout,
                })
              } 
              ></Button>
            
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
    marginTop: 40,
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
});

export default Home;
