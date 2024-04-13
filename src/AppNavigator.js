import React from 'react'
import { createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import Cart from './Screens/Cart';
import Checkout  from './Screens/Checkout';
import Product from './Screens/Product';
import Welcome from './Screens/Welcome';
import PhoneSetup from './Screens/PhoneSetup';

const Stack = createStackNavigator();
export default function AppNavigator() {
  return (
   <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="PhoneSetup"
              component={PhoneSetup}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen 
              options= {{headerShown: false}} 
              name="Login" 
              component={Login} 
            />
            <Stack.Screen 
              options= {{headerShown: false}} 
              name="SignUp" 
              component={SignUp} 
            />
            <Stack.Screen 
              options= {{headerShown: false}} 
              name="Home" 
              component={Home} 
            />
            <Stack.Screen 
              options= {{headerShown: false}} 
              name="Cart" 
              component={Cart} 
            />
            <Stack.Screen 
              options= {{headerShown: false}} 
              name="Product" 
              component={Product} 
            />
            <Stack.Screen 
              options= {{headerShown: false}} 
              name="Checkout" 
              component={Checkout} 
            />
        </Stack.Navigator>
   </NavigationContainer>
  )
}