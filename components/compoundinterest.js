import React, { useState, useEffect,useRef } from 'react'
import { TouchableWithoutFeedback,View, Dimensions, Keyboard ,Animated} from 'react-native';
import InputCard from '../shared/inputCard';
import OutputCard from '../shared/outputCard'
import OutputChart from '../shared/outputChart'
import { ScrollView } from 'react-native-gesture-handler';
const { height } = Dimensions.get("window");

export default function compound() {
    const [principal, setPrincipal] = useState("");
    const [interest, setInterest] = useState("");
    const [time, setTime] = useState("");
    const [n,setN] = useState(1);
    const [result, setResult] = useState("");
    const [diff, setDiff] = useState("");
    const[yInput,setYInput] = useState(0);
    const transformY= useRef(new Animated.Value(height)).current;

    const handleSlide = () => {
        Animated.spring(transformY, {
            toValue: yInput,
            duration: 200,
            useNativeDriver: true
        }).start()
    };

    useEffect(() => {
        var ans = (principal* Math.pow((1 + (interest/(n*100))), (n*time)));
        setDiff((ans-(Number(principal))).toFixed(2))
        setResult(ans.toFixed(2))
        if(principal!=="" && interest!=="" && time!=="") handleSlide();
        return () => {}
    }, [principal, interest, time,n])


    function Out() {
            return (
                <Animated.View style={{ flex: 1 ,transform: [{ translateY: transformY }]}}>
                    <OutputCard
                        title="Total Amount"
                        output={result<0?"Invalid Input":result}
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
                                output={diff<0?"Invalid Input":diff}
                            />
                        </View>
                    </View>                  
                    <OutputChart 
                        section1={{title:"Principal",value:Number.isFinite(Number(principal))?Number(principal):0}} 
                        section2={{title:"Interest",value:Number.isFinite(Number(diff))?Number(diff):0}}/>
                </Animated.View>
            )

    }

    return (
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => { Keyboard.dismiss(); }}>
            <View style={{ flex: 1 ,height:"100%",backgroundColor:"#101010"} } onLayout={event => setYInput(event.nativeEvent.layout.y)}>
                <ScrollView>
                <View onStartShouldSetResponder={() => true} >
                <InputCard
                    input={[
                        {
                            key: "1",
                            title: "Principal",
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
                            place:"Interest Compunded as below"
                        },
                        {
                            key: "3",
                            title: "Compounded",
                            type: "dropDown",
                            setter: setN,
                            value: n
                        },
                        {
                            key: "4",
                            title: "Time (Years)",
                            type: "time",
                            setter: setTime,
                            value: time,
                            place:"Years"
                        },
                        
                    ]}
                />
                <Out />
                </View>
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    )
}

