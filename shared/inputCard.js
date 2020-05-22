import React  from 'react';
import { StyleSheet, View, Text,TextInput,Image } from 'react-native';
import {Picker} from '@react-native-community/picker'


export default function Card(props) {

    const handleIcon = (type) => {

        if (type === "cash") {
            return (
               <Image style={{
                    width: 20,
                    height: 25,
                    alignSelf: "center",
                    justifyContent:"center",
                    padding:10
                }}
                source = {require("../assets/rupee.png")}
                />
            )
        }

        if (type === "time" || type === "freq") {
            return (
                <Image style={{
                    width: 30,
                    height: 30,
                    alignSelf: "center",
                    justifyContent:"center",
                    padding:10
                }}
                source = {require("../assets/numbers.png")}
                />
            )
        }
        if (type === "rate") {
            return (
                <Image style={{
                    width: 20,
                    height: 20,
                    alignSelf: "center",
                    justifyContent:"center",
                    padding:10
                }}
                source = {require("../assets/percent.png")}
                />
            )
        }
    }

    const FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    borderWidth: 0.5,
                    borderColor: 'lightgrey',
                }}
            />
        );
    }
    return (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                {props.input.map((item) => {

                    return (
                        <View key={item.key} style={{ flex: 1 ,flexDirection: "row", marginVertical: 10, justifyContent: "space-between", alignItems: "center" }}>
                            <Text style={{ flex: 2, fontSize: 20,  fontFamily:"roboto-bold",}}>{item.title}</Text>
                            {item.type !== "dropDown" &&
                                <TextInput
                                    style={{ flex: 2, height: 40, fontFamily:"roboto-regular",}}
                                    onChangeText={text => {if(Number.isFinite(Number(text))&&text!=='+'&&text!=='-') item.setter(text)}}
                                    value= {`${item.value}`}
                                    placeholder={item.place}
                                    keyboardType='numeric'
                                />
                            }
                            {item.type !== "dropDown" && <View style={{ flex: 1, height: 40,alignItems:"center",justifyContent:"center"}}>{handleIcon(item.type)}</View>}
                            {item.type === "dropDown" && item.title === "Compounded" &&
                                <Picker
                                    selectedValue={item.value}
                                    style={{ height: 40, width: "62%" }}
                                    onValueChange={(itemValue, itemIndex) => item.setter(itemValue)}
                                    mode="dropdown"
                                >
                                    <Picker.Item label="Annually" value="1" />
                                    <Picker.Item label="Semi-Annually" value="2" />
                                    <Picker.Item label="Quaterly" value="3" />
                                    <Picker.Item label="BiMonthly" value="6" />
                                    <Picker.Item label="Monthly" value="12" />
                                    <Picker.Item label="Daily" value="365" />
                                </Picker>
                            }
                            {item.type === "dropDown" && item.title !== "Compounded" &&
                                <Picker
                                    selectedValue={item.value}
                                    style={{ height: 40, width: "62%" }}
                                    onValueChange={(itemValue, itemIndex) => item.setter(itemValue)}
                                    mode="dropdown"
                                >
                                    <Picker.Item label="0 to 19% Disability" value="0" />
                                    <Picker.Item label="20 to 49% Disability" value="50" />
                                    <Picker.Item label="50 to 74% Disability" value="75" />
                                    <Picker.Item label="75 to 100% Disability" value="100" />
                                </Picker>
                            }
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    line: {
        height:1,
        width: "50%",
        borderWidth: 0.5,
        borderColor: 'lightgrey',
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: 'white',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6
    },
    cardContent: {
        marginHorizontal: 15,
        marginVertical: 10
    }
})