import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {MyStyles} from '../styles/constStyles';

const Encabezado = ({navigation, route}) => {
  const {name: page} = route; // Extraemos el nombre de la pantalla actual

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const variableHeader = () => {
    switch (page) {
      case 'Principal':
        return (
          <View>
            <View style={Styles.headerContent}>
              {/* Ir atrás */}
              <Text style={Styles.backText}> </Text>

              {/* Autentificar */}
              <TouchableOpacity onPress={goToLogin}>
                <Text style={Styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text>28°C</Text>

              {/* Imagen CUCEI */}
              <Text>Imagen CUCEI</Text>

              <Text></Text>
            </View>
          </View>
        );
      case 'Directorio':
        return (
          <View>
            <View style={Styles.headerContent}>
              {/* Ir atrás */}
              <TouchableOpacity onPress={() => navigation.popToTop()}>
                <Text style={Styles.backText}>Back</Text>
              </TouchableOpacity>

              {/* Autentificar */}
              <TouchableOpacity onPress={goToLogin}>
                <Text style={Styles.loginText}>Login</Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text>28°C</Text>

              {/* Imagen CUCEI */}
              <Text>Imagen CUCEI</Text>

              <Text></Text>
            </View>
          </View>
        );
      case 'Login':
        return (
          <View>
            <View style={Styles.headerContent}>
              {/* Ir atrás */}
              <TouchableOpacity onPress={() => navigation.popToTop()}>
                <Text style={Styles.backText}>Back</Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text>28°C</Text>

              {/* Imagen CUCEI */}
              <Text>Imagen CUCEI</Text>

              <Text style={Styles.loginText}></Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={Styles.headerContent}>
            {/* Temperatura */}
            <Text>28°C</Text>

            {/* Imagen CUCEI */}
            <Text>Imagen CUCEI</Text>
          </View>
        );
    }
  };

  return <View style={Styles.EncabezadoEstilo}>{variableHeader()}</View>;
};

const Styles = StyleSheet.create({
  EncabezadoEstilo: {
    height: 100,
    backgroundColor: MyStyles.mainColor,
    paddingHorizontal: 10,
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  backText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Encabezado;
