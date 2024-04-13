import React from "react";
import { View, Text, Image, Button } from "react-native";

const CartScreen = ({ route, navigation }) => {
  const { productVariantId, checkoutId, lineItems, webUrl } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Cart</Text>
      {lineItems.map((item) => (
        <View key={item.id}>
          <Image
            source={{ uri: item.variant.image.src }}
            style={{ width: 180, height: 180, borderColor:'black',  borderWidth: 1, marginTop: 30, alignContent:'left' }}
          />
          <Text style={{marginTop: 20,marginLeft:32, marginBottom: 30}} >{item.title}</Text>
        </View>
      ))}
      <Button  color="#841584" 
        title="Checkout"
        onPress={() => navigation.navigate("Checkout", { webUrl: webUrl })}
      />
    </View>
  );
};

export default CartScreen;
