import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

import { Const_styles } from "../../styles/constStyles";
import { useState } from "react";

const Chatbot = () => {
    const [myMessage, setMyMessage] = useState("");

    const sendMessage = () => {
        myMessage ? console.log(myMessage) : console.log("No message typed");
    }

    return(
        <View style={Styles.Body}>
            <View style={{
                height: 155,
                backgroundColor: Const_styles.Color_5,
                marginBottom: -140,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
            }}/>
            <Text style={{
                fontSize: 20,
                fontWeight: 600,
                textAlign: 'center',
            }}>CHATBOTITO</Text>

            {/* AQUÍ VA EL CHAT COMO TAL */}
            <View style={{
                height: '75%',
                margin: 10,
                backgroundColor: Const_styles.Color_4,
                borderRadius: 25,
            }}>

            </View>

            <View>
                <TouchableOpacity onPress={sendMessage}>
                    <View style={{
                        height: 45,
                        width: 50,
                        margin: 10,
                        marginTop: -5,
                        backgroundColor: Const_styles.Color_5,
                        borderRadius: 20,
                        alignSelf: 'flex-end',
                    }}/>
                </TouchableOpacity>
                <TextInput 
                    editable
                    multiline
                    numberOfLines={2}
                    style={Styles.Input} 
                    onChangeText={setMyMessage}
                    placeholder="Escribe tu mensaje"
                    placeholderTextColor={Const_styles.Color_2}/>
            </View>
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
        height: 'auto',
        borderRadius:20,
        marginTop: -55,
        marginVertical:5,
        marginHorizontal:10,
        marginRight: 70,
        padding: 10,
        backgroundColor: Const_styles.Color_4,
        color: '#222',
        textAlignVertical: 'top'
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