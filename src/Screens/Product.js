import React from "react";
import { View, Text, Image, Button } from "react-native";
import client from "../../shopify";


async function addToCart(navigation, productVariantId, checkoutId) {
  const lineItemsToAdd = [
    {
      variantId: productVariantId,
      quantity: 1,
      customAttributes: [{ key: "Hello", value: "there!" }],
    },
  ];

  let lineItem = await client.checkout.addLineItems(checkoutId, lineItemsToAdd);

  let checkout = await client.checkout.fetch(checkoutId);

  navigation.navigate("Cart", {
    productVariantId: productVariantId,
    checkoutId: checkoutId,
    lineItems: checkout.lineItems,
    webUrl: checkout.webUrl,
  });
}
function Product({ route, navigation }) {
  const { product, checkoutId } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image 
        source={{ uri: product.images[0].src }}
        style={{ width: 300, height: 300, borderColor:'black',  borderWidth: 1 }}
      />
      <Text style={{marginTop: 20}}>{product.title}</Text>
      <Text style={{margin: 30,textAlign:"justify", fontSize:15}}>{product.description}</Text>
      <Button color="#841584" 
        title="Add to Cart"
        onPress={() =>
          addToCart(navigation, product.variants[0].id, checkoutId)
        }
      />
    </View>
  );
}

export default Product;
