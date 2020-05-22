import React, { useState, useEffect, useRef } from 'react'
import { TouchableWithoutFeedback, View, Dimensions, Keyboard, Animated, ScrollView } from 'react-native';
import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'
import OutputChart from '../shared/outputChart'
const { height } = Dimensions.get("window");

export default function simpleinterest() {

    const [principal, setPrincipal] = useState("");
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const [result, setResult] = useState("");
    const [diff, setDiff] = useState("");

    const [yInput, setYInput] = useState(0);
    const transformY = useRef(new Animated.Value(height)).current;
    const handleSlide = type => {
        Animated.spring(transformY, {
            toValue: yInput,
            duration: 200,
            useNativeDriver: true
        }).start()

    };

    useEffect(() => {
        var ans = principal * interest * time / 100;
        setDiff(Number(principal) + ans)
        setResult(ans)
        if (principal !== "" && interest !== "" && time !== "") { handleSlide(); }
        return () => { }
    }, [principal, interest, time])

    function Out() {
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateY: transformY }] }}>
                <OutputCard
                    title="Total Amount"
                    output={diff}
                />
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <OutputCard
                            title="Principal"
                            output={principal}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <OutputCard
                            title="Interest"
                            output={result}
                        />
                    </View>
                </View>

                <OutputChart section1={{ title: "Principal", value: Number(principal) }} section2={{ title: "Interest", value: Number(result) }} />
            </Animated.View>
        )

    }

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss(); }}>

            <View style={{ flex: 1, backgroundColor: "#101010", justifyContent: "space-between" }} onLayout={event => setYInput(event.nativeEvent.layout.y)}>
                <ScrollView >
                <View onStartShouldSetResponder={() => true} >
                    <InputCard
                        input={[
                            {
                                key: "1",
                                title: "Principal",
                                type: "cash",
                                setter: setPrincipal,
                                value: principal,
                                place: "Principal Amount"
                            },
                            {
                                key: "2",
                                title: "Interest Rate",
                                type: "rate",
                                setter: setInterest,
                                value: interest,
                                place: "Interest Compounded"
                            },
                            {
                                key: "3",
                                title: "Time",
                                type: "time",
                                setter: setTime,
                                value: time,
                                place: "Years"
                            }
                        ]}
                    />
                    <Out />
                    </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}
