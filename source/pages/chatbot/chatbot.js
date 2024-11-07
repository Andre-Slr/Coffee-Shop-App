import { Text, View, StyleSheet, Image } from "react-native";

import { Const_styles } from "../../styles/constStyles";

const Chatbot = () => {

    return(
        <View style={Styles.Body}>
            <Image source={require('../../assets/components/Background.png')} style={{
                width: '100%', 
                height: '100%', 
                marginBottom: '-190%',
            }}/>
            <Text>Hi</Text>
        </View>
    )
}

const Styles = StyleSheet.create ({
    Body: {
        height:'100%',
        width:'100%',
        marginHorizontal:'auto',
        color: '#ddd',
        backgroundColor: Const_styles.Color_3,
    },
    Input: {
        fontSize:20,
        width:'100%',
        height: 50,
        borderRadius:20,
        marginVertical:15,
        marginHorizontal:'auto',
        backgroundColor: Const_styles.Color_3,
        color: '#222',
    },
    Button:{
        width:'100%',
        height: 50,
        marginHorizontal:'auto',
        backgroundColor: Const_styles.Color_2,
        borderRadius:20,
    },
  })


export default Chatbot;