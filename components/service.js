import React, { useState, useEffect, useRef } from 'react'
import { Text, TouchableWithoutFeedback, View, Dimensions, Keyboard, Animated, Modal, ScrollView, TouchableHighlight, Image, StyleSheet } from 'react-native';
import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'
const { height } = Dimensions.get("window");

export default function Service({ navigation }) {

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

    const [visibility,setVisibility] = useState(false)
    const [msp, setMsp] = useState('');//Military Service Pay
    const [basic, setBasic] = useState('');//basic pay
    const [cl, setCl] = useState('');//casual leave
    const [da, setDa] = useState('');//Dearness Allowance
    const [disability, setDisability] = useState(0);
    const [encashed, setEncashed] = useState(''); //Encashed Days
    const [time, setTime] = useState('');//service time
    const [pur, setPur] = useState([
        { key: '20', value: '9.188' }, { key: '36', value: '9.136' }, { key: '52', value: '8.768' },
        { key: '21', value: '9.187' }, { key: '37', value: '9.126' }, { key: '53', value: '8.724' },
        { key: '22', value: '9.186' }, { key: '38', value: '9.116' }, { key: '54', value: '8.678' },
        { key: '23', value: '9.185' }, { key: '39', value: '9.103' }, { key: '55', value: '8.627' },
        { key: '24', value: '9.184' }, { key: '40', value: '9.090' }, { key: '56', value: '8.572' },
        { key: '25', value: '9.183' }, { key: '41', value: '9.075' }, { key: '57', value: '8.512' },
        { key: '26', value: '9.182' }, { key: '42', value: '9.059' }, { key: '58', value: '8.446' },
        { key: '28', value: '9.178' }, { key: '44', value: '9.019' }, { key: '60', value: '8.287' },
        { key: '27', value: '9.180' }, { key: '43', value: '9.040' }, { key: '59', value: '8.371' },
        { key: '29', value: '9.176' }, { key: '45', value: '8.996' }, { key: '61', value: '8.194' },
        { key: '30', value: '9.173' }, { key: '46', value: '8.971' }, { key: '62', value: '8.093' },
        { key: '31', value: '9.169' }, { key: '47', value: '8.943' }, { key: '63', value: '7.982' },
        { key: '32', value: '9.164' }, { key: '48', value: '8.913' }, { key: '64', value: '7.862' },
        { key: '33', value: '9.159' }, { key: '49', value: '8.881' }, { key: '65', value: '7.731' },
        { key: '34', value: '9.152' }, { key: '50', value: '8.846' }, { key: '66', value: '7.591' },
        { key: '35', value: '9.145' }, { key: '51', value: '8.808' }, { key: '67', value: '7.431' },
    ])
    const [last,setLast] = useState('')

    const [disabilityPension, setDisabilityPension] = useState(0);
    const [daOutput, setDaOutput] = useState('');
    const [totalPension, setTotalPension] = useState('');
    const [totalPensionc, setTotalPensionc] = useState('');
    const [perMonthPensionc, setPerMonthPensionc] = useState('');
    const [perMonthPension, setPerMonthPension] = useState('');

    const [commutation, setCommutation] = useState('');
    const [encashment, setEncashment] = useState('');
    const [gratutiy, setGratutity] = useState('');
    const [totalOneTime, setTotalOneTime] = useState('');

    const [yInput, setYInput] = useState(0);
    const transformY = useRef(new Animated.Value(2*height)).current;
    const handleSlide = type => {
        Animated.spring(transformY, {
            toValue: yInput,
            duration: 200,
            useNativeDriver: true
        }).start()
    };

    useEffect(() => {
        var tempcl = cl !== '' ? Number(cl) : 0;
        var total = (Number(basic) + tempcl + Number(msp)) / 2;
        var halfTotal = total / 2;

        //permonth pension 
        setPerMonthPension(total);

        //permonth pension c
        setPerMonthPensionc(total / 2);

        //disability
        setDisabilityPension(((last===''?(total*2):last) * 0.003 * disability).toFixed(2))

        if (da === '') {
            setDaOutput('Enter DA');
            setTotalPension('Enter DA');
            setTotalPensionc('Enter DA');

            setGratutity('Enter DA');
            setEncashment('Enter DA');
            setTotalOneTime('Enter DA');
        }
        else {
            //daOutput
            setDaOutput((total+((last===''?(total*2):last) * 0.003 * disability)) * da / 100);

            //Total PerMonth Pension
            setTotalPension((total + ((total+((last===''?(total*2):last) * 0.003 * disability)) * da / 100) + ((last===''?(total*2):last) * 0.003 * disability)).toFixed(2));

            //Total PerMonth Pension c
            setTotalPensionc(((total / 2) + ((total+((last===''?(total*2):last) * 0.003 * disability)) * da / 100) + ((last===''?(total*2):last) * 0.003 * disability)).toFixed(2));

            //encashment
            if (encashed === '') setEncashment('Enter No. Encashed Days')
            else {
                if (Number(encashed) < 0 || Number(encashed) > 300) setEncashment('Encashed Days must be 0 to 300 days')
                else {
                    setEncashment(((Number(basic) + ((total+((last===''?(total*2):last) * 0.003 * disability)) * da / 200)) * Number(encashed) / 30).toFixed(2))
                }
            }

            //gratutity
            if (time === '') setGratutity('Enter Service Time');
            else {
                if (Number(time) < 20 || Number(time) > 67) setGratutity('Service Time must be 20 to 67 years');
                else {
                    let mypur = pur.filter(item => item.key == Number(time).toFixed(0))
                    setGratutity(((total + ((total+((last===''?(total*2):last) * 0.003 * disability)) * da / 200)) * (Number(mypur[0].value) + Number(time))).toFixed(2))
                }
            }

        }

        //commmutation
        if (time === '') setCommutation('Enter Service Time');
        else {
            if (Number(time) < 20 || Number(time) > 67) setCommutation('Commutation not applicable, Service Time must be 20 to 67 years');
            else {
                let mypur = pur.filter(item => item.key == Number(time).toFixed(0))
                setCommutation((halfTotal * mypur[0].value * 12).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            }
        }

        if (basic !== "" && msp !== "") { setVisibility(true); handleSlide(); }
        return () => { }

    }, [basic, cl, da, msp, disability, encashed, time,last])



    useEffect(() => {
        if (!isNaN(gratutiy) && !isNaN(encashment) && gratutiy!=='' && encashment!=='')
            setTotalOneTime((Number(gratutiy) + Number(encashment)));
        else if (!isNaN(gratutiy) && isNaN(encashment) && gratutiy!=='')
            setTotalOneTime(Number(gratutiy));
        else if (isNaN(gratutiy) && !isNaN(encashment)  && encashment!=='')
            setTotalOneTime(Number(encashment));
        else if (isNaN(gratutiy) && isNaN(encashment))
            setTotalOneTime(0);
        return () => { }
    }, [gratutiy, encashment])

    function Out() {

       if(visibility){
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateY: transformY }] }}>
                <View style={{...styles.card, backgroundColor : '#0091cd' }}>
                <Text style={styles.headerStyle}>One Time Gratutity and Encashment</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Gratutity"
                                output={gratutiy !== '' ? gratutiy.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <OutputCard
                                title="Encashment"
                                output={encashment !== '' ? encashment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                            />
                        </View>
                    </View>
                    <OutputCard
                        title="Gratutity + Encashment"
                        output={!isNaN(totalOneTime)?Number(totalOneTime).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):0}
                    />
                </View>
                <View style={{...styles.card, backgroundColor : '#0091cd' }}>
                    <Text style={styles.headerStyle}>Without Commutation</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 3 }}>
                            <OutputCard
                                title={"Pension\n/month"}
                                output={!isNaN(perMonthPension) ? Number(perMonthPension).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : perMonthPension}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <OutputCard
                                title={"Total\nDA"}
                                output={!isNaN(daOutput) ? Number(daOutput).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : daOutput}
                            />
                        </View>
                        <View style={{ flex: 3 }}>
                            <OutputCard
                                title={"Disability\nPension"}
                                output={Number(disabilityPension).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />
                        </View>
                    </View>
                    <OutputCard
                        title={"Total Per Month Pension\n(Adding above three)"}
                        output={totalPension.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    />
                </View>
                <View style={{...styles.card, backgroundColor : '#0091cd' }}>
                    <Text style={styles.headerStyle}>If Applied for Commutation</Text>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <View style={{ flex: 3 }}>
                            <OutputCard
                                title={"Pension\n/month"}
                                output={!isNaN(perMonthPensionc) ? Number(perMonthPensionc).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : perMonthPension}
                            />
                        </View>
                        <View style={{ flex: 2 }}>
                            <OutputCard
                                title={"Total\nDA"}
                                output={!isNaN(daOutput) ? Number(daOutput).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : daOutput}
                            />
                        </View>
                        <View style={{ flex: 3 }}>
                            <OutputCard
                                title={"Disability\nPension"}
                                output={Number(disabilityPension).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            />
                        </View>
                    </View>
                    <OutputCard
                        title={"Total Per Month Pension\n(Adding above three)"}
                        output={totalPensionc.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    />
                    <OutputCard
                        title="Commutation"
                        output={commutation !== '' ? commutation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                    />
                </View>
            </Animated.View >
        )}
    else {return(null);}
    }

    return (
        
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1, backgroundColor: "#101010", justifyContent: "space-between",maxHeight:height}} onLayout={event => setYInput(event.nativeEvent.layout.y)}>
                <ScrollView >
                    <View onStartShouldSetResponder={() => true} >
                        <InputCard
                            input={[
                                {
                                    key: "1",
                                    title: "Basic Pay",
                                    type: "cash",
                                    setter: setBasic,
                                    value: basic,
                                    place: "Basic Pay"
                                },
                                {
                                    key: "2",
                                    title: "MSP",
                                    type: "cash",
                                    setter: setMsp,
                                    value: msp,
                                    place: "Military Service Pay"
                                },
                                {
                                    key: "3",
                                    title: "CL Pay",
                                    type: "cash",
                                    setter: setCl,
                                    value: cl,
                                    place: "Casual Leave"
                                },
                                {
                                    key: "4",
                                    title: "Disabilty %\n(if any)",
                                    type: "dropDown",
                                    setter: setDisability,
                                    value: disability,
                                    
                                },
                                {
                                    key: "5",
                                    title: "Last Drawn Salary",
                                    type: "cash",
                                    setter: setLast,
                                    value: last,
                                    place: "For Disability Pension"
                                },
                                {
                                    key: "6",
                                    title: "Service Time\n(Years)",
                                    type: "time",
                                    setter: setTime,
                                    value: time,
                                    place: "Service Years"
                                },
                                {
                                    key: "7",
                                    title: "Encashed Days\n(Max 300 days)",
                                    type: "time",
                                    setter: setEncashed,
                                    value: encashed,
                                    place: "No. of Encashed Days"
                                },
                                {
                                    key: "8",
                                    title: "DA %",
                                    type: "rate",
                                    setter: setDa,
                                    value: da,
                                    place: "Dearness Allowance"
                                },
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
                            <Text style={styles.modalText}>
                                Calculate Pension for Army Personnels.{'\n'}You Must Input Basic Pay and MSP for calculations (and CL Pay if provided).
                                {'\n'}{'\n'}Select Disability slabs (if any, default is 0-19%) and last drawn Salary for calcualting the pension for the same.
                                Without Last drawn salary input, Basic Pay + MSP + CL pay is considered as default last drawn salary.
                                {'\n'}{'\n'}Input Current DA%(Dearness Allowance) which is revised twice in a year – first from January 1 and second from July 1.
                                {'\n'}{'\n'}Output shows One time Encashment and Gratutity Pay with two options for recieving pension with and without commutation.
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
    headerStyle: {
        fontFamily: 'roboto-regular',
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:20
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        paddingBottom:4
    },

})
