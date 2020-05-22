import React, { useState } from 'react'
import { StyleSheet, Text, Image, View, Dimensions,TouchableNativeFeedback, ScrollView } from 'react-native';


export default function financial({navigation}) {
    const Header = ({ name }) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{name}</Text>
            </View>
        )
    }
    const iconRight="../assets/right-arrow1.png"
    const content = [
        {
            key:1,
            headerText: "Calculators",
            items:[
                {
                    key:1,
                    iconLeft: require('../assets/graph1.png'),
                    text: "Interest Calculator",
                    line: true,
                    nav: () => navigation.navigate('Interest',{navigation})
                },
                {
                    key:2,
                    iconLeft: require('../assets/insurance.png'),
                    text: "Tip Calculator",
                    line: false,
                    nav: () => navigation.navigate('Tip Calculator',{navigation})
                },
            ]
        },
        {
            key:2,
            headerText:"Savings",
            items:[
                {
                    key:1,
                    iconLeft: require('../assets/hourglass.png'),
                    text: "Recurring Deposit",
                    line: true,
                    nav: () => navigation.navigate('Recurring Deposit',{navigation})
                },
                {
                    key:2,
                    iconLeft: require('../assets/investment.png'),
                    text: "Fixed Deposit",
                    line: true,
                    nav: () => navigation.navigate('Fixed Deposit',{navigation})
                },
                {
                    key:3,
                    iconLeft: require('../assets/income.png'),
                    text: "SIP",
                    line: true,
                    nav: () => navigation.navigate('SIP',{navigation})
                },
                {
                    key:4,
                    iconLeft: require('../assets/bar-chart.png'),
                    text: "Mutual Funds",
                    line: false,
                    nav: () => navigation.navigate('Mutual Funds',{navigation})
                }
            ]
        },
        {
            key:3,
            headerText:"Loan",
            items:[
                {
                    key:1,
                    iconLeft: require('../assets/budget.png'),
                    text: "EMI Calculator",
                    line: true,
                    nav: () => navigation.navigate('EMI Calculator',{navigation})
                },
                {
                    key:2,
                    iconLeft: require('../assets/credit-card.png'),
                    text: "Loan Eligibility",
                    line: true,
                    nav: () => navigation.navigate('Loan Eligibility',{navigation})
                },
                {
                    key:3,
                    iconLeft: require('../assets/pay.png'),
                    text: "Loan Affordability",
                    line: false,
                    nav: () => navigation.navigate('Loan Affordability',{navigation})
                },
            ]
        },
        {
            key:4,
            headerText:"Pension",
            items:[
                {
                    key:1,
                    iconLeft: require('../assets/pension.png'),
                    text: "Military Service",
                    line: true,
                    nav: () => navigation.navigate('Military Service',{navigation})
                },
            ]
        }

    ]
    return (
        <View style={{ height: "100%", width: "102%" }}>
            <ScrollView>
                {
                    content.map((sections) => {
                        return(
                            <View key={sections.key} style={styles.card}>
                            <Header name={sections.headerText} />
                            {
                                sections.items.map((list)=>{
                                    return(
                                        <View key={list.key} style={styles.cardContent}>
                                        <TouchableNativeFeedback onPress={list.nav}>
                                            <View style={{ flex: 1, flexDirection: "row", height: 40, justifyContent: "space-between", margin: 10, alignItems: "center" }} >
                                                <View style={{ flex: 1,backgroundColor:"black",borderRadius:50 }}>
                                                    <Image
                                                        style={styles.leftLogo}
                                                        source={list.iconLeft}
                                                    />
                                                </View>
                                                <View style={{ flex: 4, }}>
                                                    <Text style={styles.text} >{list.text}</Text>
                                                </View>
                                                <View style={{ flex: 1 }}>
                                                    <Image
                                                        style={styles.rightArrow}
                                                        source={require(iconRight)}
                                                    />
                                                </View>
                                            </View>
                                        </TouchableNativeFeedback>
                                    </View> 
                                    )
                                    
                                })
                            }
                            <View style={styles.line}/>
                        </View>
                        )
                        
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    
    text: {
        color:"grey",
        alignSelf: "center",
        marginHorizontal: 18,
        marginVertical: 10,
        fontSize: 18,
        fontFamily:'roboto-regular'
    },
    header: {
        backgroundColor: "black",
        height: 40,
        justifyContent: "center",
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        elevation: 4,
        alignItems:"flex-start",
        paddingLeft:10
    },
    headerText: {
        color: "grey",
        fontSize: 18,
        fontFamily:"roboto-bold"
    },
    leftLogo: {
        resizeMode: "contain",
        width: 30,
        height: 30,
        alignSelf: "center",

    },
    rightArrow: {
        resizeMode: "contain",
        width: 15,
        height: 15,
        alignSelf: "center",
    },
    line: {
        height: 1,
        width: "100%",
        borderWidth: 1,
        borderColor: '#222222',
        alignSelf:"center"
    },
    card: {
        backgroundColor: "blue",
        borderRadius: 2,
        elevation: 3,
        backgroundColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 3,
        marginVertical: 0
    },
    cardContent: {
        marginHorizontal: 0,
        marginVertical: 0
    }

})
