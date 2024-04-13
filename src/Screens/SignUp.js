import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomTextInput from '../common/CustomTextInput'
import CommonButton from '../common/CommonButton'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import COLORS from '../constants/Color'

const isValid = true;
const SignUp = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [badName, setBadName] = useState(false);
  const [email, setEmail] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [badPassword, setBadPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [badConfirmPassword, setBadConfirmPassword] = useState(false);
  const [mobile, setMobile] = useState('');
  const [badMobile, setBadMobile] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const signup = () => {
    setButtonDisabled(true);
    if (name == '') {
      setBadName(true);
      setButtonDisabled(false);
    }
    else {
      setBadName(false);
      if (email == '') {
        setBadEmail(true);
        setButtonDisabled(false);
      }
      else {
        setBadEmail(false);
        if (mobile == '') {
          setBadMobile(true);
          setButtonDisabled(false);
        }
        else if (mobile.length < 10) {
          setBadMobile(true);
          setButtonDisabled(false);
        }
        else {
          setBadMobile(false);
          if (password == '') {
            setBadPassword(true);
            setButtonDisabled(false);
          }
          else {
            setBadPassword(false);
            if (confirmPassword == '') {
              setBadConfirmPassword(true);
              setButtonDisabled(false);
            }
            else {
              setBadConfirmPassword(false);
              if (password !== confirmPassword) {
                setBadConfirmPassword(true);
                setButtonDisabled(false);
              }
              else {
                setBadConfirmPassword(false);
                saveData();
              }
            }
          }
        }
      }
    } 
  };

  const saveData = async () => {
      await AsyncStorage.setItem('NAME', name);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('MOBILE', mobile);
      await AsyncStorage.setItem('PASSWORD', password);
      navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1">
        <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black,
                        marginLeft: 40,
                        marginTop:70
                    }}>
                        Create Account
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black,
                        marginLeft: 40,
                    }}>Connect Quick to shop!</Text>
                    
        <CustomTextInput
          value={name}
          onChangeText={txt => {
            setName(txt);
          }}
          placeholder={'Enter Name'}
          icon={require('../Images/user.png')} />
        {badName === true && (
          <Text style={{ marginTop: 10, marginLeft: 30, color: 'red' }}>
            Please Enter Name</Text>
        )}

        <CustomTextInput
          value={email}
          onChangeText={txt => {
            setEmail(txt);
          }}
          placeholder={'Enter Email id'}
          icon={require('../Images/email.png')} />
        {badEmail === true && (
          <Text style={{ marginTop: 10, marginLeft: 30, color: 'red' }}>
            Please Enter Email Id</Text>
        )}

        <CustomTextInput
          value={mobile}
          onChangeText={txt => {
            setMobile(txt);
          }}
          keyboardType={'number-pad'}
          placeholder={'Enter Mobile'}
          icon={require('../Images/phone.png')} />
        {badMobile === true && (
          <Text style={{ marginTop: 10, marginLeft: 30, color: 'red' }}>
            Please Enter Number</Text>
        )}

        <CustomTextInput
          value={password}
          onChangeText={txt => {
            setPassword(txt);
          }}
          placeholder={'Enter password'}
          icon={require('../Images/lock.png')} />
        {badPassword === true && (
          <Text style={{ marginTop: 10, marginLeft: 30, color: 'red' }}>
            Please Enter password</Text>
        )}
        <CustomTextInput
          value={confirmPassword}
          onChangeText={txt => {
            setConfirmPassword(txt);
          }}
          placeholder={'Enter Confirm password'}
          icon={require('../Images/lock.png')} />
        {badConfirmPassword === true && (
          <Text style={{marginTop: 10, marginLeft: 30, color: 'red'}}>
          Please Enter correct password</Text>
        )}

        <CommonButton
          title={'Signup'}
          bgColor={buttonDisabled ? '#8e8e8e' : '#000'}
          textColor={'#fff'}
          onPress={() => {
            signup();
          }}
          disabled={buttonDisabled}
        />
        <Text style={{ fontSize: 18, fontWeight: '700', textDecorationLine: 'underline', alignSelf: 'center', marginTop: 20, marginBottom: 50 }} onPress={() => {
          navigation.goBack();
        }}>Already Have Account?</Text>
      </View>
    </ScrollView>
  )
}

export default SignUp