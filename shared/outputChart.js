import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Dimensions,ScrollView
} from 'react-native'


import {
    PieChart,
} from "react-native-chart-kit";


const { width } = Dimensions.get("window");

export default (props) => {

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5
    };

    const pieData = [
        {
            name: props.section1.title,
            population: props.section1.value,
            color: '#278ea5',
            legendFontColor: 'black',
            legendFontSize: 15,
        },
        {
            name: props.section2.title,
            population: props.section2.value,
            color: '#cb3b3b',
            legendFontColor: 'black',
            legendFontSize: 15,
        }
    ];

    return (
        <View style={styles.card}>
            <ScrollView style={styles.cardContent}>
            <PieChart
                data={pieData}
                width={width}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="0"
                absolute
            />
            </ScrollView>
        </View>
    )

}

const styles = StyleSheet.create({
    number:{
        fontSize:15,
        fontWeight:"bold",
        textAlign:"center"
    },
    title:{
        color:"darkblue",
        fontSize:23,
        fontWeight:"bold",
        textAlign:"center"
    },
    line:{
        height: 2,
        width: "100%",
        backgroundColor:"lightgrey",
        borderWidth: 0.5,
        borderColor: 'lightgrey',
    },
    card: {
        flex:1,
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 4
    },
    cardContent: {
        marginHorizontal: 0,
        marginVertical: 20,
    }
})