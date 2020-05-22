import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { Text, TouchableWithoutFeedback, View, KeyboardAvoidingView, Dimensions, Keyboard, Animated, Image, TouchableHighlight, Modal, StyleSheet } from 'react-native';

import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'
import OutputChart from '../shared/outputChart'
import { ScrollView } from 'react-native-gesture-handler';

const { height } = Dimensions.get("window");

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);

export default function fd({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);
    useLayoutEffect(() => {
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
    });

    const [principal, setPrincipal] = useState("");
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const [freq, setFreq] = useState("");
    const [maturity, setMaturity] = useState("");
    const [diff, setDiff] = useState("");

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

        var ans = principal * Math.pow((1 + ((interest / 100) / freq)), freq * time / 12);
        setMaturity(ans.toFixed(2));
        setDiff((ans - Number(principal)).toFixed(2))

        if (principal !== "" && interest !== "" && time !== "" && freq !== "") handleSlide();
        return () => { }
    }, [principal, interest, time, freq])


    function Out() {
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateY: transformY }] }}>
                <OutputCard
                    title="Maturity Amount"
                    output={maturity}
                />
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <OutputCard
                            title="Deposit"
                            output={principal}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <OutputCard
                            title="Interest"
                            output={diff}
                        />
                    </View>
                </View>
                <OutputChart section1={{ title: "Principal", value: Number(principal) }} section2={{ title: "Interest", value: Number(diff) }} />
            </Animated.View>
        )

    }

    return (

        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
                <View style={{ flex: 1, backgroundColor: "#101010", justifyContent: "space-between", }} onLayout={event => setYInput(event.nativeEvent.layout.y)}>
                    <ScrollView >
                    <View onStartShouldSetResponder={() => true} >
                        <InputCard
                            input={[
                                {
                                    key: "1",
                                    title: "Principal",
                                    type: "cash",
                                    setter: setPrincipal,
                                    value: principal,
                                    place: "Principal Amount"
                                },
                                {
                                    key: "2",
                                    title: "Interest Rate",
                                    type: "rate",
                                    setter: setInterest,
                                    value: interest,
                                    place: "Interest per annum"
                                },
                                {
                                    key: "3",
                                    title: "Time\n(Months)",
                                    type: "time",
                                    setter: setTime,
                                    value: time,
                                    place: "Time in Months"
                                },
                                {
                                    key: "4",
                                    title: "Frequency",
                                    type: "time",
                                    setter: setFreq,
                                    value: freq,
                                    place: "No. of times interest compounded per year"
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
                                <Text style={styles.modalText}>Fixed Deposit Calculator calculates the maturity amount and interest earned for any Fixed Deposit account. Provide the initial amount, rate of interest and period of investment. You can change the compounding frequency if needed</Text>

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
            </KeyboardAvoidingView>
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
        fontFamily: 'roboto-regular',
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

})
