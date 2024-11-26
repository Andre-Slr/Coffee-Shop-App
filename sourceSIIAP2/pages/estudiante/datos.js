import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
// https://www.npmjs.com/package/react-native-chart-kit#react-native-chart-kit-documentation
import {ProgressChart} from 'react-native-chart-kit';

import {Dimensions} from 'react-native';

import {MyStyles} from '../../styles/constStyles';
import data from '../../assets/static_kardex.json';

const screenWidth = Dimensions.get('window').width;

const Datos = ({navigation}) => {
  const [dataEstudiante, setDataEstudiante] = useState([]);

  {
    /*
     */
  }
  useEffect(() => {
    setDataEstudiante(data);
  }, []);

  {
    /*
    useEffect(() => {
      const fetchDatos = async () => {
        try {
          const response = await fetch(
            'https://cuceimobile.space/Escuela/kardex.php',
          );
  
          const parsedValue = await response.json();
          //console.log('Datos recibidos:', parsedValue); // Para depurar
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
    */
  }

  const porcentaje =
    dataEstudiante.creditosAdquiridos && dataEstudiante.creditosRequeridos
      ? (dataEstudiante.creditosAdquiridos * 100) /
        dataEstudiante.creditosRequeridos
      : 0;
  const porcentajeCeroAUno = porcentaje / 100;

  const progressData = {
    labels: [, 'Créditos Obtenidos'],
    data: [, porcentajeCeroAUno > 1 ? 1 : porcentajeCeroAUno],
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: 'white',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(${MyStyles.chartRaw}, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const creditosAreaLista = dataEstudiante.creditosArea;

  const renderCreditosArea = ({item}) => {
    const progressCreditos =
      item.diferencia == 0
        ? 100
        : (item.creditosAdquiridos * 100) / item.creditosRequeridos;
    return (
      <View
        style={{
          padding: 8,
        }}>
        <Text style={[Styles.Texts, {textAlign: 'right'}]}>{item.area}</Text>
        <Text style={[Styles.Texts, {marginTop: -20}]}>
          {item.creditosAdquiridos}/{item.creditosRequeridos}
        </Text>
        <View
          style={{
            height: 10,
            width: '100%',
            backgroundColor: MyStyles.chartBack,
            borderRadius: 18,
          }}
        />
        <View
          style={{
            height: 10,
            width: `${progressCreditos}%`,
            backgroundColor: MyStyles.chartFront,
            borderRadius: 18,
            marginTop: -10,
            marginBottom: 10,
          }}
        />
      </View>
    );
  };

  return (
    <View style={Styles.Body}>
      {/* Progreso de la carrera */}
      <View style={Styles.ProgressContainer}>
        <ProgressChart
          data={progressData}
          width={screenWidth * 0.6}
          height={screenWidth * 0.6}
          strokeWidth={screenWidth * 0.05}
          radius={screenWidth * 0.15}
          chartConfig={chartConfig}
          hideLegend={true}
        />
        <Text style={[Styles.Texts, {marginTop: -160, marginBottom: 0}]}>
          Porcentaje de créditos
        </Text>
        <Text style={Styles.ProgressText}>
          {Number(porcentaje.toFixed(2))}%
        </Text>
        <Text style={Styles.Texts}>
          {dataEstudiante.creditosAdquiridos}/
          {dataEstudiante.creditosRequeridos}
        </Text>
      </View>

      {/* Créditos por área */}
      <View style={Styles.AreaContainer}>
        <FlatList
          data={creditosAreaLista}
          renderItem={renderCreditosArea}
          keyExtractor={item => item.area}
          showsVerticalScrollIndicator={false}
          style={Styles.AreaList}
        />
      </View>

      {/* Apartados */}
      <View style={Styles.ApartadoContenedor}>
        {/* Materias */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Materias', {dataEstudiante: dataEstudiante})
          }
          style={Styles.ApartadoBloque}>
          <Text style={Styles.Texts}>Materias</Text>
        </TouchableOpacity>
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
  Body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ApartadoContenedor: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ApartadoBloque: {
    width: '25%',
    height: 50,
    backgroundColor: MyStyles.mainColor,
    borderRadius: 18,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ProgressContainer: {
    height: screenWidth * 0.6,
    width: '95%',
    backgroundColor: MyStyles.mainColor,
    borderRadius: 18,
    margin: 10,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  ProgressText: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'semibold',
    marginBottom: 20,
  },
  AreaContainer: {
    width: '95%',
    backgroundColor: MyStyles.mainColor,
    borderRadius: 18,
    margin: 10,
    marginTop: 0,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  AreaList: {
    marginBottom: 10,
    padding: 5,
    paddingTop: 10,
    paddingBottom: -5,
    width: '95%',
  },
  Texts: {
    color: 'black',
    fontSize: 15,
  },
});

export default Datos;
