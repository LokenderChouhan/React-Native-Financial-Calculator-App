import React, { useState,useRef} from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
//import Row from './row';
//import Button from './button';

const screen = Dimensions.get("window");
const buttonWidth = screen.width / 5;

function Button({ onPress, text, size, theme }) {
    const buttonStyles = [styles.button];
    const textStyles = [styles.text];

    if (size == "double") {
        buttonStyles.push(styles.buttonDouble)
    }

    if (theme == "secondary") {
        buttonStyles.push(styles.buttonSecondary);
        textStyles.push(styles.textSecondary);
    } else if (theme == "accent") {
        buttonStyles.push(styles.buttonAccent);
    }

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles}>
            <Text style={textStyles}>{text}</Text>
        </TouchableOpacity>

    )

}

function Row({ children }) {
    return (
        <View style={{ flexDirection: "row" }}>{children}</View>
    )
}

export default function App() {
    const [result, setResult] = useState("");
    const [history, setHistory] = useState("");
    const [final, setFinal] = useState("0");
    const scrollViewRef = useRef();

    calculate = () => {
        var checkResult = ''
        if (result.includes('--')) {
            checkResult = result.replace('--', '+')
        }
        else {
            checkResult = result
        }
        try {
            setResult((eval(checkResult) || "") + "");
            setFinal((eval(checkResult) || "") + "");
        } catch (e) {
            setHistory("Syntax error")

        }

    }
    const handleTap = (type, value) => {

        if (value === "=") {
            calculate()
        }

        else if (value === "C") {
            setResult("");
            setHistory("");
            setFinal("0")
        }
        else if (value === "CE") {
            setResult(result.slice(0, -1))
            setHistory(result.slice(0, -1))
        }

        else {
            setResult(result + value)
            setHistory(result + value)
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex:2}}>
                <ScrollView style={{ backgroundColor: "black" }} ref={scrollViewRef}
                onContentSizeChange={(contentWidth, contentHeight)=> {scrollViewRef.current.scrollToEnd({animated: true})}}>
                    <Text style={{...styles.value,marginBottom:0}}>{history}</Text>
                </ScrollView>
            </View>
            <View style={{ flex: 10,justifyContent:"flex-end"}}>
                    <ScrollView>
                    <Text numberOfLines={1} ellipsizeMode='head' style={styles.value}>{final === "" ? 0 : final}</Text>
                    <Row>
                        <Button text="C" theme="secondary" onPress={() => handleTap("clear", "C")} />
                        <Button text="(" theme="secondary" onPress={() => handleTap("bracOpen", "(")} />
                        <Button text=")" theme="secondary" onPress={() => handleTap("bracClose", ")")} />
                        <Button text="/" theme="accent" onPress={() => handleTap("operator", "/")} />
                    </Row>
                    <Row>
                        <Button text="7" onPress={() => handleTap("number", 7)} />
                        <Button text="8" onPress={() => handleTap("number", 8)} />
                        <Button text="9" onPress={() => handleTap("number", 9)} />
                        <Button text="x" theme="accent" onPress={() => handleTap("operator", "*")} />
                    </Row>
                    <Row>
                        <Button text="4" onPress={() => handleTap("number", 4)} />
                        <Button text="5" onPress={() => handleTap("number", 5)} />
                        <Button text="6" onPress={() => handleTap("number", 6)} />
                        <Button text="-" theme="accent" onPress={() => handleTap("operator", "-")} />
                    </Row>
                    <Row>
                        <Button text="1" onPress={() => handleTap("number", 1)} />
                        <Button text="2" onPress={() => handleTap("number", 2)} />
                        <Button text="3" onPress={() => handleTap("number", 3)} />
                        <Button text="+" theme="accent" onPress={() => handleTap("operator", "+")} />
                    </Row>
                    <Row>
                        <Button text="<-" theme="secondary" onPress={() => handleTap("backspace", "CE")} />
                        <Button text="0" onPress={() => handleTap("number", 0)} />
                        <Button text="." theme="secondary" onPress={() => handleTap("number", ".")} />
                        <Button text="=" theme="accent" onPress={() => handleTap("equal", "=")} />
                    </Row>
                    </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#202020',
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingBottom:60,
        borderRadius: 10,
    },
    value: {
        color: "grey",
        fontSize: 37,
        textAlign: "right",
        marginRight: 20,
        marginBottom: 10
    },
    text: {
        color: "#fff",
        fontSize: 25
    },
    textSecondary: {
        color: "#060606"
    },
    button: {
        backgroundColor: "#333333",
        flex: 1,
        height: buttonWidth,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: buttonWidth,
        margin: 9,
    },
    buttonSecondary: {
        backgroundColor: "#a6a6a6"
    },
    buttonAccent: {
        backgroundColor: "#0091cd"
    }
}
);
