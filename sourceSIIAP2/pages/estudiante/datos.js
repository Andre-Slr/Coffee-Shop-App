import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {MyStyles} from '../../styles/constStyles';

const Datos = ({navigation}) => {
  const [dataEstudiante, setDataEstudiante] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch(
          'https://cuceimobile.space/Escuela/kardex.php',
        );

        const parsedValue = await response.json();
        if (parsedValue) {
          setDataEstudiante(parsedValue);
        } else {
          console.log('No se encontró la información solicitada.');
        }
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchDatos();
  }, []);

  return (
    <View>
      {/* <Text style={{color: 'black'}}>Datos</Text> */}

      {/* Apartados */}
      <View style={Styles.ApartadoContenedor}>
        {/* Directorio */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Directorio')}
          style={Styles.ApartadoBloque}>
          <Text style={Styles.Texts}>Directorio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  Body: {},
  ApartadoContenedor: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ApartadoBloque: {
    width: '25%',
    height: 60,
    backgroundColor: MyStyles.mainColor,
    margin: 10,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Texts: {
    color: 'black',
    fontSize: 15,
  },
});

export default Datos;
