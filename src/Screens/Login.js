import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../common/CustomTextInput'
import CommonButton from '../common/CommonButton'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../common/Loader'
import COLORS from '../constants/Color'

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [modalVisible, setModalVisible] =useState(false);

  const login = () => {
    setModalVisible(true);
    if(email==''){
      setModalVisible(false);
      setBadEmail(true);
    }
    else{
      setBadEmail(false);
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
    const mEmail = await AsyncStorage.getItem('EMAIL');
    const mPass = await AsyncStorage.getItem('PASSWORD');
    if(email === mEmail && password === mPass){
      setModalVisible(false);
      navigation.navigate('Home');
    }
    else{
      setModalVisible(false);
      alert('Wrong Password');
    }
  }

  return (
    <View className="flex-1">
      <Image source={require('../Images/playstore.png')} style={{ width: 90, height: 90, alignSelf: 'center', marginTop: 100 }}></Image>
     <Text style={{
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 12,
          color: COLORS.black,
          marginLeft: 40,
          marginTop:60
        }}>
        Hi Welcome Back ! 👋
     </Text>

     <Text style={{
        fontSize: 16,
        color: COLORS.black,
        marginLeft: 40,
        }}>Hello again you have been missed!</Text>

      <CustomTextInput placeholder={'Enter Email id'} value={email} onChangeText={txt => {
          setEmail(txt);
       }} icon={require('../Images/email.png')}/>
      {badEmail === true && (
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
        login();
      }} />
      <Text style={{fontSize:18, fontWeight:'700', textDecorationLine:'underline', alignSelf:'center', marginTop: 20}} onPress={() => {
          navigation.navigate('SignUp');
      }}>Create New Account?</Text>
      <Text style={{fontSize:18, fontWeight:'700', textDecorationLine:'underline', alignSelf:'center', marginTop: 20}} onPress={() => {
          navigation.navigate('PhoneSetup');
      }}>Sign in with otp..</Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  )
}