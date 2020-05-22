import React, { useState, useRef, useEffect,} from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity,} from 'react-native';

import Financial from './financial';
import General from './general';
export default function Slider({ navigation }) {

    const { width } = Dimensions.get("window");
    const { height } = Dimensions.get("window");

    const [active, setActive] = useState(0);
    const [xTabOne, setxTabOne] = useState(0);
    const [xTabTwo, setxTabTwo] = useState(0);
    const [translateY, setTranslateY] = useState(-1000);
    const translateX = useRef(new Animated.Value(0)).current;
    const translateXTabOne = useRef(new Animated.Value(0)).current;
    const translateXTabTwo = useRef(new Animated.Value(width)).current;

    const handleSlide = type => {

        if (active === 0) {
            Animated.spring(translateX, {
                toValue: xTabOne,
                duration: 100,
                useNativeDriver: true
            }).start();
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: 0,
                    duration: 100,
                    overshootClamping: false,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: width,
                    duration: 100,
                    overshootClamping: false,
                    useNativeDriver: true
                }).start()
            ]);
        } else {
            Animated.spring(translateX, {
                toValue: xTabTwo,
                duration: 100,
                useNativeDriver: true
            }).start();
            Animated.parallel([
                Animated.spring(translateXTabOne, {
                    toValue: -width,
                    duration: 100,
                    overshootClamping: false,
                    useNativeDriver: true
                }).start(),
                Animated.spring(translateXTabTwo, {
                    toValue: 0,
                    duration: 100,
                    overshootClamping: false,
                    useNativeDriver: true
                }).start()
            ]);
        }
    };

    useEffect(() => {
        active === 0 ? handleSlide(xTabOne) : handleSlide(xTabTwo);
    }, [active])

    const MySlider = () => {
        return (
            <View style={{ width: "50%",flexDirection:'row', marginBottom: 10, marginLeft: 15, marginRight: 'auto', height: 35, position: "relative", justifyContent: 'flex-start', alignItems: 'center' }}>

                <View style={styles.new}></View>
                {/* overlay */}
                <Animated.View style={{ ...styles.overlay, transform: [{ translateX: translateX }] }} />

                {/* tab1 */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ ...styles.tabs, ...styles.tab1 }}
                    onLayout={event => setxTabOne(event.nativeEvent.layout.x)}
                    onPress={() => { setActive(0) }}
                >
                    <Text style={{ color: active === 0 ? "white" : "#4d4f53" , fontSize:15,fontFamily:'roboto-bold'}}>Financial</Text>
                </TouchableOpacity>

                {/* tab2 */}
                <TouchableOpacity
                    activeOpacity={1}
                    style={{ ...styles.tabs, ...styles.tab2 }}
                    onLayout={event => setxTabTwo(event.nativeEvent.layout.x)}
                    onPress={() => { setActive(1) }}
                >
                    <Text style={{ color: active === 1 ? "white" : "#4d4f53", fontSize:15,fontFamily:'roboto-bold'}}>General</Text>

                </TouchableOpacity>
                
            </View>

        )
    }

    return (
        
        <View style={{ flex: 1, backgroundColor: "blue", width: width, paddingLeft: 0,marginBottom:0,marginTop:30 }}>
            <View style={{ height: "100%", width: "100%", backgroundColor: "#222222", marginLeft: "auto", marginRight: "auto", }}>
                <MySlider />
                <View style={{ flex: 1, height: height - 100, marginTop: 5 }} >
                    {/* financial screen */}
                    <Animated.View
                        style={{ ...styles.container, transform: [{ translateX: translateXTabOne }] }}
                        onLayout={event => setTranslateY(event.nativeEvent.layout.height)}
                    >
                        <Financial navigation={navigation} />
                    </Animated.View>

                    {/* general screen */}
                    <Animated.View
                        style={{ height: height - 40 - 36, backgroundColor: "purple", transform: [{ translateX: translateXTabTwo }, { translateY: -translateY }] }}
                    >
                        <General style={{ height: "100%" }} />
                    </Animated.View>

                </View>
            </View>
        </View>
        
    );

}

const styles = StyleSheet.create({
    new:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position:"absolute", width: "100%", height: "90%", top: 3, left: 0,
        backgroundColor: "black",
        borderRadius: 100,
        zIndex:-1,
        borderRadius: 500,
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    tabs: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tab1: {
        borderRadius: 500,
        borderRightWidth: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        height: "80%",
    },
    tab2: {
        borderRadius: 500,
        borderLeftWidth: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        height: "80%",

    },
    overlay: {
        position:"absolute", width: "50%", height: "90%", top: 3, left: 0,
        backgroundColor: "grey",
        borderRadius: 100,
    }
});

