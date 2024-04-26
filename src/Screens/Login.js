import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../common/CustomTextInput'
import CommonButton from '../common/CommonButton'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';
import Loader from '../common/Loader'

export default function Login({route}) {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [badPhone, setBadPhone] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] =useState(false);

  
  const login = () => {
    setModalVisible(true);
    if(phone==''){
      setModalVisible(false);
      setBadPhone(true);
    }
    else{
      setBadPhone(false);
      if(password==''){
        setModalVisible(false);
        setBadPassword(true);
      }
      else{
        setTimeout(() => {
          setBadPassword(false);
          getData();
        }, 2000);
      }
    }
  };
  const getData = async () => {
    try {
      const userDoc = await firestore().collection('users').doc(phone).get();
      const userData = userDoc.data();
      if (userData && userData.password === password) {
        setModalVisible(false)
        navigation.navigate('Home', { phone });
      } else {
        setModalVisible(false)
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error("Error logging in");
    }
  }

  return (
    <View className="flex-1">
      <Image source={require('../Images/playstore.png')} style={{ width: 90, height: 90, alignSelf: 'center', marginTop: 100 }}></Image>

      <Text style={{ marginTop: 50, alignSelf: 'center', fontSize: 30, fontWeight: 600, color: '#000' }}>Login</Text>
      <CustomTextInput placeholder={'Enter Phone Number'} value={phone} onChangeText={ setPhone} icon={require('../Images/phone-book.png')}/>
      {badPhone === true && (
          <Text style={{marginTop: 10, marginLeft: 30, color: 'red'}}>
          Please Enter Email Id</Text>
      )}
      <CustomTextInput type={'password'} placeholder={'Enter password'} value={password} onChangeText={txt => {
          setPassword(txt);
        }} icon={require('../Images/lock.png')}/>
      {badPassword === true && (
          <Text style={{marginTop: 10, marginLeft: 30, color: 'red'}}>
          Please Valid Password</Text>
      )}
      <CommonButton title={'Login'} bgColor={'#000'} textColor={'#fff'} onPress={() => {
        login(phone, password);
      }} />
      <Text style={{fontSize:18, fontWeight:'700', textDecorationLine:'underline', alignSelf:'center', marginTop: 20}} onPress={() => {
          navigation.navigate('SignUp');
      }}>Create New Account?</Text>
      <Text style={{fontSize:18, fontWeight:'700', textDecorationLine:'underline', alignSelf:'center', marginTop: 20}} onPress={() => {
          navigation.navigate('PhoneSetup');
      }}>Sign in using otp</Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  )
}