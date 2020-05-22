import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableWithoutFeedback, View, Dimensions, Keyboard, Animated, Modal,ScrollView, TouchableHighlight, Image, StyleSheet } from 'react-native';

import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'


const { height} = Dimensions.get("window");


export default function tip({ navigation }) {

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

    const [tip, setTip] = useState('');
    const [bill, setBill] = useState('')
    const [no, setNo] = useState('')
    const [pp, setPp] = useState('')
    const [perc, setPrec] = useState('')

    const [yInput, setYInput] = useState(0);
    const transformY = useRef(new Animated.Value(height)).current;
    const handleSlide = type => {
        Animated.spring(transformY, {
            toValue: yInput,
            duration: 200,
            useNativeDriver: true
        }).start()
    };

    useEffect(() => {
        var ans = bill * tip / 100;
        setPrec(ans.toFixed(2));
        setPp((ans / no).toFixed(2))
        if (bill !== "" && tip !== "" && no !== "") { handleSlide(); }
        return () => { }
    }, [bill, tip, no])

    function Out() {
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateY: transformY }] }}>
                
                <OutputCard
                    title="Total Bill"
                    output={bill}
                />
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <OutputCard
                            title="Tip"
                            output={perc}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <OutputCard
                            title="Interest"
                            output={pp}
                        />
                    </View>
                </View>
            </Animated.View>
    )}

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1,backgroundColor:"#101010",justifyContent: "space-between" }} onLayout={event => setYInput(event.nativeEvent.layout.y)}>
                <ScrollView >
                <View onStartShouldSetResponder={() => true} >
                    <InputCard
                        input={[
                            {
                                key: "1",
                                title: "Bill",
                                type: "cash",
                                setter: setBill,
                                value: bill,
                                place: "Bill Amount"
                            },
                            {
                                key: "2",
                                title: "Tip %",
                                type: "rate",
                                setter: setTip,
                                value: tip,
                                place: "Bill %age to be given as tip"
                            },
                            {
                                key: "3",
                                title: "No. of People",
                                type: "time",
                                setter: setNo,
                                value: no,
                                place: "Enter Number"
                            }
                        ]}
                    />
                    <Out />
                    </View>
                </ScrollView>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => { setModalVisible(!modalVisible); }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>The Tip Calculator calculates tip amount for the given percentage of the cost of the service. It shows the total amount including the tip and the tip amount for each person.</Text>

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
            </View>
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
        backgroundColor: "#F194FF",
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
