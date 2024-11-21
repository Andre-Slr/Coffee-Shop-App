import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {MyStyles} from '../styles/constStyles';
import Mapa from '../assets/components/mapa';

const Principal = ({navigation}) => {
  const goToDirectorio = () => {
    navigation.navigate('Directorio');
  };

  return (
    <View>
      {/* Apartados */}
      <View style={Styles.ApartadoContenedor}>
        {/* Directorio */}
        <TouchableOpacity
          onPress={goToDirectorio}
          style={Styles.ApartadoBloque}>
          <Text style={Styles.Texts}>Directorio</Text>
        </TouchableOpacity>

        {/* Realidad Aumentada */}
        <TouchableOpacity style={Styles.ApartadoBloque}>
          <Text style={Styles.Texts}>RA</Text>
        </TouchableOpacity>

        {/* Módulos */}
        <TouchableOpacity style={Styles.ApartadoBloque}>
          <Text style={Styles.Texts}>Módulos</Text>
        </TouchableOpacity>
      </View>

      {/* Mapa CUCEI */}
      <View style={Styles.ApartadoContenedorMapa}>
        <View style={Styles.ApartadoSeccionMapa}>
          <Text style={[Styles.Texts, {margin: 5}]}>MAPA CUCEI</Text>
          <Mapa />
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  ApartadoContenedor: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ApartadoBloque: {
    width: '25%',
    height: 50,
    backgroundColor: MyStyles.mainColor,
    margin: 10,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ApartadoContenedorMapa: {
    width: '95%',
    height: '75%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ApartadoSeccionMapa: {
    width: '100%',
    backgroundColor: MyStyles.mainColor,
    padding: 10,
    borderRadius: 18,
  },
  Texts: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
  },
});

export default Principal;
