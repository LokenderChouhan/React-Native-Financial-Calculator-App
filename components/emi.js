import React, { useState, useEffect,useRef } from 'react'
import { Text, TouchableWithoutFeedback,View, Dimensions, Keyboard ,Animated, ScrollView,Image,Modal,StyleSheet,TouchableHighlight} from 'react-native';

import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'
import OutputChart from '../shared/outputChart'

const { height } = Dimensions.get("window");

export default function emi({navigation}) {

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

    const [principal, setPrincipal] = useState("");
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const [result, setResult] = useState("");
    const [diff, setDiff] = useState("");
    const [totalint,setTotalint]= useState("")

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
        if(principal!=="" && interest!=="" && time!==""){
            var mi = interest/1200;
            var temp = principal * mi / (1 - Math.pow(1/(1 + mi), time))
            setResult(temp.toFixed(2));
            var total = temp*Number(time);
            setDiff(total.toFixed(2));
            setTotalint((diff-principal).toFixed(2))
            handleSlide();
        }
        return () => {}
    }, [principal, interest, time,result,diff])


    function Out() {
            return (
                <Animated.View style={{ flex: 1 ,transform: [{ translateY: transformY }]}}>
                    <OutputCard
                        title="Loan EMI"
                        output={result<0?0:result}
                    />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Total Payment"
                                output={diff<0?0:diff}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Total Interest"
                                output={totalint<0?0:totalint}
                            />
                        </View>
                    </View>
                    <OutputChart section1={{title:"Principal",value:Number(principal)}} section2={{title:"Interest",value:Number(totalint)}}/>
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
                            title: "Loan Amount",
                            type: "cash",
                            setter: setPrincipal,
                            value: principal,
                            place:"Principal Amount"
                        },
                        {
                            key: "2",
                            title: "Interest Rate",
                            type: "rate",
                            setter: setInterest,
                            value: interest,
                            place:"Annual Rate"
                        },
                        {
                            key: "3",
                            title: "No.of Months",
                            type: "time",
                            setter: setTime,
                            value: time,
                            place:"Months"
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
                            <Text style={styles.modalText}>Calculate the expected monthly EMI for the given loan amount, rate of interst and duration</Text>
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
