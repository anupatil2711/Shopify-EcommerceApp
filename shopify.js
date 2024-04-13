import Client from "shopify-buy";

// Initializing a client to return content in the store's primary language
const client = Client.buildClient({
  domain: "anushkapatil.myshopify.com",
  storefrontAccessToken: "c7e6307ec670c1c8d3aaff96713f51e4",
});

export default client;
