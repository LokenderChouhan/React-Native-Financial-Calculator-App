import React, { useState, useEffect,useRef } from 'react'
import { Text, TouchableWithoutFeedback,View, Dimensions, Keyboard ,Animated, Image,Modal,StyleSheet,TouchableHighlight} from 'react-native';
import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'
import OutputChart from '../shared/outputChart'
import { ScrollView } from 'react-native-gesture-handler';


const { height } = Dimensions.get("window");

export default function rd({navigation}) {

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
    const [freq, setFreq] = useState("");
    const [maturity,setMaturity] = useState("");

    const [investment, setInvestment] = useState("");
    const [diff, setDiff] = useState("");

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

        var months=time;
        var temp = 0;
        for (var i = 1; i <= months; i++) {
            temp += principal * Math.pow((1 + ((interest / 100) / freq)), freq * ((months - i + 1) / 12));
        }
        setInvestment(principal*time)
        setMaturity(temp.toFixed(2));
        setDiff((temp-investment).toFixed(2))

        if(principal!=="" && interest!=="" && time!=="" && freq!=="")  handleSlide();
        return () => {}

    }, [principal, interest, time,freq])


    function Out() {
            return (
                <Animated.View style={{ flex: 1 ,transform: [{ translateY: transformY }]}}>
                    <OutputCard
                        title="Maturity Amount"
                        output={maturity}
                    />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Principal"
                                output={investment}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Interest"
                                output={diff}
                            />
                        </View>
                    </View>
                    <OutputChart section1={{title:"Principal",value:Number(investment)}} section2={{title:"Interest",value:Number(diff)}}/>
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
                            title: "Principal\n(/month)",
                            type: "cash",
                            setter: setPrincipal,
                            value: principal,
                            place:"Amount Invested per Month"
                        },
                        {
                            key: "2",
                            title: "Interest Rate",
                            type: "rate",
                            setter: setInterest,
                            value: interest,
                            place:"Interest per annum"
                        },
                        {
                            key: "3",
                            title: "Time\n(Months)",
                            type: "time",
                            setter: setTime,
                            value: time,
                            place:"No. of Months"
                        },
                        {
                            key: "4",
                            title: "Frequency",
                            type: "time",
                            setter: setFreq,
                            value: freq,
                            place:"No.of times interest compounded per year"
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
                            <Text style={styles.modalText}>Calculates how much you can save by making regular monthly deposits. Provide the monthly amount, at a desired rate of interest for a specific term for which you wish to invest.
                            {'\n'}{'\n'}If interest is calculated {'\n'} 
                            Yearly then set Frequency to 1. {'\n'}
                            Half yearly then set Frequency to 2.{'\n'}
                            Quarterly then set Frequency to 4.{'\n'}
                            Monthly then set Frequency to 12.{'\n'}
                            Note! Some banks calculate interest quarterly.
                            </Text>

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
        padding: 30,
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