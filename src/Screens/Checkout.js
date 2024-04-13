import React from 'react'
import { WebView } from "react-native-webview";

const Checkout = ({route}) => {
  const { webUrl } = route.params;
  return <WebView source={{ uri: webUrl }} />;
}

export default Checkout