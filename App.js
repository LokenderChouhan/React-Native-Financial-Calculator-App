
import React,{useEffect} from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Image} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

import Slider from './components/slider'
import Interest from './components/interest'
import Rd from './components/rd'
import Fd from './components/fd'
import Tc from './components/tipCalc'
import Sip from './components/sip'
import Mf from './components/mf'
import Emi from './components/emi'
import Le from './components/le'
import La from './components/la'
import Service from './components/service'
const Stack = createStackNavigator();

export default function App (){
  
  useEffect(()=>{
    SplashScreen.hide()
  },[])

  const Header = () => {
    return (

      <View style={{ ...styles.header, minHeight: 70, }}>
        <StatusBar barStyle="light-content" backgroundColor="#222222" />
        <Text style={{ ...styles.headerText, fontFamily: 'roboto-regular' }}>FinCalc</Text>

        <Image
          style={styles.interestLogo}
          source={require('./assets/cube1.png')}
        />

      </View>

    )

  }

  const screen_style = 
    {
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontFamily: "roboto-bold",
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: "#222222",
        elevation:4
      }
  }

  return (
      <NavigationContainer>
          <Stack.Navigator headerMode="screen">
            <Stack.Screen name="Home" component={Slider}
              options={{ headerStyle: { marginTop: 0 }, header: () => {return (<Header />);}}}
            />
            <Stack.Screen name="Interest" component={Interest}
              options={screen_style}
            />
            <Stack.Screen name="Recurring Deposit" component={Rd}
              options={screen_style}
            />
            <Stack.Screen name="Fixed Deposit" component={Fd}
              options={screen_style}
            />
            <Stack.Screen name="Tip Calculator" component={Tc}
              options={screen_style}
            />
            <Stack.Screen name="SIP" component={Sip}
              options={screen_style}
            />
            <Stack.Screen name="Mutual Funds" component={Mf}
              options={screen_style}
            />
            <Stack.Screen name="EMI Calculator" component={Emi}
              options={screen_style}
            />
            <Stack.Screen name="Loan Eligibility" component={Le}
              options={screen_style}
            />
            <Stack.Screen name="Loan Affordability" component={La}
              options={screen_style}
            />
            <Stack.Screen name="Military Service" component={Service}
              options={screen_style}
            />
          </Stack.Navigator>
        </NavigationContainer >
    
     
  );
};

const styles = StyleSheet.create({
  interestLogo: {
    resizeMode: "contain",
    width: 40,
    height: 40,
    alignSelf: "center",
    margin: 0
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#222222",
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    paddingLeft: 10
  }

});

