import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

export default function Splash() {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
           navigation.navigate('Login')
        }, 2000);
        },[]);

        const getData=async() => {
          const email = await AsyncStorage.getItrm('Email');
          if(email !== null){
            navigation.navigate('Home');
          }
          else{
            navigation.navigate('Login');
          }
        }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source= {require('../Images/playstore.png')} style={{resizeMode: 'center', width: 500, height: 500}}></Image>
    </View>
  )
}