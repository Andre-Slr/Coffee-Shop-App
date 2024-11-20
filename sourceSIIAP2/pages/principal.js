import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MyStyles } from "../styles/constStyles";

const Principal = ({ navigation }) => {
    const goToDirectorio = () =>{
        navigation.navigate('Directorio');
    }


    return (
        <View>
            {/* Apartados */}
            <View style={Styles.ApartadoContenedor}>
                {/* Realidad Aumentada */}
                <TouchableOpacity 
                    style={Styles.ApartadoBloque}>
                    <Text>RA</Text>
                </TouchableOpacity>

                {/* Módulos */}
                <TouchableOpacity 
                    style={Styles.ApartadoBloque}>
                    <Text>Módulos</Text>
                </TouchableOpacity>

                {/* Directorio */}
                <TouchableOpacity 
                    onPress={goToDirectorio}
                    style={Styles.ApartadoBloque}>
                    <Text>Directorio</Text>
                </TouchableOpacity>
                
                {/* Mapa CUCEI */}
                <TouchableOpacity 
                    style={Styles.ApartadoBloque}>
                    <Text>MAPA CUCEI</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const Styles = StyleSheet.create ({
    ApartadoContenedor: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ApartadoBloque: {
        width: '45%',
        height: 175,
        backgroundColor: MyStyles.mainColor,
        margin: 5,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: 'center',
    },
})

export default Principal;