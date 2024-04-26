import React from "react";
import { View, Text, Image, Button, ScrollView } from "react-native";
import client from "../../shopify";

function Cart({ route, navigation }) {
  const { checkoutId, lineItems } = route.params;

  const removeFromCart = async (itemId) => {
    try {
      const updatedCheckout = await client.checkout.removeLineItems(checkoutId, [itemId]);
      navigation.setParams({ lineItems: updatedCheckout.lineItems });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const updateQuantity = async (variantId, checkoutId, quantity) => {
    const lineItemsToUpdate = [{ id: variantId, quantity: quantity + 1 }];
    await client.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
    const updatedCheckout = await client.checkout.fetch(checkoutId);
    navigation.setParams({ lineItems: updatedCheckout.lineItems });
  };

  const navigateToCheckout = async () => {
    // Use the webUrl from Shopify Buy SDK to navigate to checkout
    const checkout = await client.checkout.fetch(checkoutId);
    const webUrl = checkout.webUrl;
    navigation.navigate("Checkout", { webUrl });
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100, }}>
        <Text>Cart</Text>
        {lineItems.map((item) => (
          <View key={item.id}>
            <Image
              source={{ uri: item.variant.image.src }}
              style={{ width: 180, height: 180, borderColor: 'black', borderWidth: 1, marginTop: 30, alignContent: 'center' }}
            />
            <Text style={{ marginTop: 20, marginLeft: 32, marginBottom: 10 }} >{item.title}</Text>
            <View style={{ marginTop: 20, marginBottom: 20 }}>
              <Button 
                title="Update +"
                color='#841584'
                onPress={() => updateQuantity(item.id, checkoutId, item.quantity)}
              />
            </View>
            <Button
              style={{ margin: 20 }}
              title="Remove from Cart"
              onPress={() => removeFromCart(item.id)}
              color='#841584'
            />
          </View>
        ))}
        <View style={{ marginTop: 20 }}>
          <Button
            style={{ marginTop: 20 }}
            color="#841584"
            title="Checkout"
            onPress={navigateToCheckout} // Call navigateToCheckout function on button press
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default Cart;
