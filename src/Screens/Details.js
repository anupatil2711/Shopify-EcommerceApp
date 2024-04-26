import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const Details = ({ route, navigation }) => {
    const { uid } = route.params;
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');

    const saveDetails = async () => {
        try {
            await firestore().collection('users').doc(uid).set({
                name,
                dob,
                gender,
                phone,
            });
    
            navigation.navigate("Home", { phone }); // Pass phone number to Fetch component
        } catch (error) {
            console.log("error saving details: ", error);
        }
    };

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
            <Text style={{
                fontSize: 32,
                fontWeight: 'bold',
                marginBottom: 40,
                marginTop: 150,
            }}>Enter your details: </Text>
            <TextInput
                style={{
                    height: 50,
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                }}
                value={name}
                onChangeText={setName}
                placeholder={'Enter Name'}
            />
            <TextInput
                style={{
                    height: 50,
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                }}
                value={dob}
                onChangeText={setDob}
                placeholder={'Enter Dob'}
            />

            <TextInput
                style={{
                    height: 50,
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                }}
                value={gender}
                onChangeText={setGender}
                placeholder={'Enter Gender'}
            />
            <TextInput
                style={{
                    height: 50,
                    width: '100%',
                    borderColor: 'black',
                    borderWidth: 1,
                    marginBottom: 30,
                    paddingHorizontal: 10,
                }}
                value={phone}
                onChangeText={setPhone}
                placeholder={'Enter Phone Number'}
            />
            <TouchableOpacity
                onPress={saveDetails}
                style={{
                    backgroundColor: '#841584',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 20,
                    alignItems: 'center',
                }}>
                <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Save Details</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Details;
