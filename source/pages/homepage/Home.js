import React from "react";
import { Text, View, StyleSheet } from "react-native";

import { Const_styles } from "../../styles/constStyles";

const Home = ({ route }) => {
    const { userEmail } = route.params;

    return(
        <View style={Styles.Body}>
            <Text>Hiii, {userEmail}</Text>
        </View>
    )
}


const Styles = StyleSheet.create ({
    Body: {
        height:'100%',
        width:'100%',
        marginHorizontal:'auto',
        padding:30,
        color: '#ddd',
        backgroundColor: Const_styles.Color_4,
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

export default Home;