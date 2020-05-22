import React, { useState, useEffect,useRef } from 'react'
import { Text, TouchableWithoutFeedback,View, Dimensions, Keyboard ,Animated, ScrollView,Image,Modal,StyleSheet,TouchableHighlight} from 'react-native';

import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'
const { height } = Dimensions.get("window");

export default function la({navigation}) {
    
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

    const [income,setIncome] = useState("");
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const [loan, setLoan] = useState("");
    const [pay, setPay] = useState("");
    const [total,setTotal] = useState("");

    const[yInput,setYInput] = useState(0);
    const transformY= useRef(new Animated.Value(height)).current;
    const handleSlide = type => {
        Animated.spring(transformY, {
            toValue: yInput,
            duration: 200,
            useNativeDriver: true
        }).start()

    };

    useEffect(() => {
        var intr=interest / 1200;
        var temp1=Math.round(income*(1-(Math.pow(1/(1 + intr), time)))/intr);
        var temp2= Math.round(Number(income) * Number(time));
        var temp3=Math.round(temp2*1-temp1*1);
        setLoan(temp1);
        setPay(temp2);
        setTotal(temp3);
        if(income!=="" && interest!=="" && time!==""){handleSlide();}
        return () => {}
    }, [income,interest,time])

    function Out() {
            return (
                <Animated.View style={{ flex: 1 ,transform: [{ translateY: transformY }]}}>
                    <OutputCard
                        title="Affordable Loan"
                        output={loan<0?0:loan}
                    />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Interest Payable"
                                output={pay<0?0:pay}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Total Payable Amount"
                                output={total<0?0:total}
                            />
                        </View>
                    </View>
                </Animated.View>
            )

    }

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss(); }}>
            
            <View style={{ flex: 1,backgroundColor:"#101010",justifyContent:"space-between" } } onLayout={event => setYInput(event.nativeEvent.layout.y)}>
            <ScrollView >
            <View onStartShouldSetResponder={() => true} >
                <InputCard
                    input={[
                        {
                            key: "1",
                            title: "Affordable EMI",
                            type: "cash",
                            setter: setIncome,
                            value: income,
                            place:"Monthly Salary"
                        },
                        {
                            key: "2",
                            title: "Interest Rate",
                            type: "rate",
                            setter: setInterest,
                            value: interest,
                            place:"Annual interest rate"
                        },
                        {
                            key: "3",
                            title: "Time\n(Months)",
                            type: "time",
                            setter: setTime,
                            value: time,
                            place:"No. of Months"
                        }
                    ]}
                />
                <Out/>
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
                            <Text style={styles.modalText}>Calculate how much loan you can afford based on how much EMI you can pay, with the given rate of interest and period</Text>
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
