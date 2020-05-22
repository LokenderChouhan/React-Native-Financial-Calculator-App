import React, { useState, useEffect,useRef } from 'react'
import { Text, TouchableWithoutFeedback,View, Dimensions, Keyboard ,Animated, ScrollView,Image,Modal,StyleSheet,TouchableHighlight} from 'react-native';

import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'

const { height } = Dimensions.get("window");

export default function le({navigation}) {

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
    const [emi,setEmi] = useState("");
    const [newEmi,setNewEmi] = useState("");
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
        if(income!=="" && emi!==""){
            var temp = (Number(income)-Number(emi))*0.75
            setNewEmi(temp);
            handleSlide();
        }
        return () => {}
    }, [income, emi])


    function Out() {
            return (
                <Animated.View style={{ flex: 1 ,transform: [{ translateY: transformY }]}}>
                    <OutputCard
                        title="Eligible for EMI"
                        output={newEmi<0?0:newEmi}
                    />
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
                            title: "Net Monthly Salary",
                            type: "cash",
                            setter: setIncome,
                            value: income,
                            place:"Monthly Salary"
                        },
                        {
                            key: "2",
                            title: "Total Existing EMI",
                            type: "cash",
                            setter: setEmi,
                            value: emi,
                            place:"Total Monthly EMIs"
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
                            <Text style={styles.modalText}>Caculate the EMI amount for which you are eligible based on your monthly salary and existing EMI. It is calculated as 75% of the difference between salary and existing EMI.</Text>
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
