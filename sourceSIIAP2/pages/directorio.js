import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import Encabezado from "../assets/encabezado";

const Directorio = () => {
    return (
        <View style={Styles.container}>
            {/* Directorio */}
            <WebView 
                source={{ uri: "https://www.cucei.udg.mx/directorio" }}
                style={Styles.webview}
            />
        </View>
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    },
    webview: {
        flex: 1,
    },
})

export default Directorio;