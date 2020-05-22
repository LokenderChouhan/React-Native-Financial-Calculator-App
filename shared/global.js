import { StyleSheet} from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        padding:50,
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    titleText:{
        fontFamily:'nunito-bold',
        fontSize:18,
        color:'#333'
    },
    paragrapgh:{
        marginVertical:8,
        lineHeight:20,
    },
    input :{
      borderWidth:1,
      borderColor:'black',
      padding:10,
      fontSize:18,
      borderRadius:6,
      marginBottom:10,
      backgroundColor:'white'
    },
    errorText:{
      color:'crimson',
      fontWeight:'bold',
      marginBottom:10,
      marginTop:6,
      textAlign:'center'
    }
  });
  