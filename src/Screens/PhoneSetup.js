import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'


const PhoneSetup = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [confirm, setConfirm] = useState(null);
    const navigation = useNavigation();

    const signInWithPhoneNumber = async () => {
        try{
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
        } catch (error) {
            console.log("Error sending code: ", error);
             
        }
    };

    const confirmCode = async () => {
        try{
            const userCredential = await confirm.confirm(code);
            const user = userCredential.user;
            const userDocument = await firestore()
            .collection("users")
            .doc(user.id)
            .get();

            if(userDocument.exists) {
                navigation.navigate("Home");
            } else {
                navigation.navigate("SignUp", {uid: user.uid});
            }
        } catch (error){
            console.log("Invalid Code.", error);
        }
    };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{
        fontSize: 32,
        fontWeight: "bold",
        marginBottom: 40,
        marginTop: 150,
      }}>Authenticating you using otp 😄</Text>
      {!confirm ? (
        <>
        <Text style={{marginBottom:20, fontSize: 18}}>Enter your Phone number: </Text>
        <TextInput style={{ height: 50, width: '100%', borderColor:'black', borderWidth:1, marginBottom: 30, paddingHorizontal:10, }} placeholder='e.g., +1 650-555-3434' value = {phoneNumber} onChangeText={setPhoneNumber} />
        <TouchableOpacity onPress={signInWithPhoneNumber}
            style={{
                backgroundColor: '#841584',
                padding: 10, 
                borderRadius: 5,
                marginBottom: 20,
                alignItems: 'center',
            }} >
                <Text style={{color: 'white', fontSize: 22, fontWeight: 'bold'}}> Send Code</Text>
            </TouchableOpacity>
        </>
      ) : ( 
        <>
        <Text style = {{marginBottom: 20, fontSize: 18}}>Enter the code sent to your phone: </Text>
        <TextInput style={{height: 50, width: '100%', borderColor: 'black', borderWidth: 1, marginBottom: 30, paddingHorizontal: 10 }} placeholder='Enter code' value ={code} onChangeText={setCode}></TextInput>
        <TouchableOpacity onPress = {confirmCode} 
            style ={{backgroundColor: "#841584",
                padding: 10, 
                borderRadius: 5,
                marginBottom: 20,
                alignItems: 'center'
            }} >
                <Text style={{
                    color: 'white',
                    fontSize: 22, 
                    fontWeight: 'bold'
                }}> Confirm code</Text>
            </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default PhoneSetup