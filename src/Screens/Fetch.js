import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const Fetch = ({ route, navigation }) => {
    const { phone } = route.params; // Receive phone number from Details component
    const [userDetails, setUserDetails] = useState([]);

    const handleLogout = () => {
        navigation.navigate('Login'); // Navigate to the login screen
    };

    useEffect(() => {
        const subscriber = firestore()
            .collection('users')
            .where('phone', '==', phone)  // Filter by phone number
            .onSnapshot(querySnapshot => {
                const details = [];

                querySnapshot.forEach(documentSnapshot => {
                    details.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setUserDetails(details);
            });

        return () => subscriber();
    }, [phone]); // Use phone instead of mobile

    return (
        <View>
            <FlatList
                data={userDetails}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.itemHeading}>Name: {item.name}</Text>
                            <Text style={styles.itemHeading}>Email: {item.email}</Text>
                            <Text style={styles.itemHeading}>Phone: {item.phone}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={{
                width: '50%',
                marginTop: 50,
                alignItems: 'center',
            }}>
            <Button color="#841584" title="Logout" onPress={handleLogout} />
            </View>
        </View>
    );
};

export default Fetch;

const styles = StyleSheet.create({
    container: {
        width: '50%',
        marginTop: 50,
        backgroundColor: '#e5e5e5',
        padding: 15,
        borderRadius: 5,
        margin: 5,
        marginHorizontal: 10,
    },
    innerContainer: {
        alignItems: 'flex-start',
        flexDirection: 'column',
    },
    itemHeading: {
        fontWeight: '300',
        marginTop: 10,
    },
});
