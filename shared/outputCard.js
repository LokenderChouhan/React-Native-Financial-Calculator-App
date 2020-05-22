import React, { useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput ,Animated} from 'react-native';


export default function Card(props) {


    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.line}/>
                <Text style={styles.number}>{props.output}</Text>
            </View>
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
        color:"#222222",
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center"
    },
    line:{
        height: 2,
        width: "100%",
        backgroundColor:"grey",
        borderWidth: 1,
        borderColor: 'grey',
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
        marginVertical: 4,
        flex:1,
        flexDirection:'column',
        justifyContent:'center'
    },
    cardContent: {
        marginHorizontal: 15,
        marginVertical: 10,
    }
})