import React, { useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, Modal, View, Keyboard, TouchableHighlight, Image } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

import Simple from './simpleinterest'
import Compound from './compoundinterest'


export default function interest({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    navigation.setOptions({
        headerRight: () => (
            <TouchableWithoutFeedback onPress={() => { setModalVisible(true); Keyboard.dismiss(); }}>
                <Image
                    style={styles.leftLogo}
                    source={require('../assets/information.png')}
                />           
            </TouchableWithoutFeedback>
        )
    });

    return (
        
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss(); }}>
            <>
            <Tab.Navigator 
                tabBarOptions={{
                    labelStyle: { color: "white", fontSize: 14, fontFamily: "roboto-bold" },
                    style: { backgroundColor: '#222222', },
                }} 
                screenProps={{navigation: navigation}}
            >
                <Tab.Screen name="Simple" component={Simple} />
                <Tab.Screen name="Compound" component={Compound} />
            </Tab.Navigator>
            <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(!modalVisible); }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Displays the Simple or Compound Interest for the given amount, rate and period of time. The total amount is also shown along with the detailed graph.</Text>

                            <TouchableHighlight
                                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <Text style={styles.textStyle}>Close </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>

            </>
        </TouchableWithoutFeedback>
        
    )
}
const styles = StyleSheet.create({
    leftLogo: {
        resizeMode: "contain",
        width: 50,
        height: 30,
        alignSelf: "center",
        marginRight: 10
    },
    rightLogo: {
        resizeMode: "contain",
        width: 20,
        height: 20,
        alignSelf: "center",
        marginRight: 0
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        borderRadius: 15,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        fontFamily:'roboto-regular',
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

})
