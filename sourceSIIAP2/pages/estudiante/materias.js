import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {MyStyles} from '../../styles/constStyles';

const Materias = ({route, navigation}) => {
  const {dataEstudiante} = route.params;

  const renderMaterias = ({item}) => {
    const calif = item.calificacion.split('(');
    return (
      <View style={Styles.MateriaContent}>
        <Text style={Styles.TextsClave}>{item.clave}</Text>
        <Text style={Styles.TextsMateria}>{item.descripcion}</Text>
        <Text style={Styles.TextsCalif}>{calif[0]}</Text>
      </View>
    );
  };

  return (
    <View style={Styles.Body}>
      <View style={Styles.MateriaContainer}>
        <View style={Styles.MateriaHeader}>
          <Text style={Styles.TextsClave}>Clave</Text>
          <Text style={Styles.TextsMateria}>Materia</Text>
          <Text style={Styles.TextsCalif}>Calificación</Text>
        </View>
        <FlatList
          data={dataEstudiante.materias}
          renderItem={renderMaterias}
          keyExtractor={item => item.nrc}
          showsVerticalScrollIndicator={true}
          style={Styles.MateriaList}
        />
      </View>
      <Text style={Styles.Texts}>Promedio: {dataEstudiante.promedio}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  Body: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  Texts: {
    color: 'black',
    fontSize: 15,
  },
  MateriaContainer: {
    width: '95%',
    height: '85%',
    backgroundColor: MyStyles.mainColor,
    borderRadius: 18,
    margin: 10,
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  MateriaList: {
    marginBottom: 10,
    padding: 5,
    paddingTop: 10,
    paddingBottom: -5,
    width: '95%',
  },
  MateriaHeader: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
  },
  MateriaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    margin: 5,
    borderWidth: 1,
    borderColor: MyStyles.chartFront,
    borderRadius: 10,
    backgroundColor: MyStyles.chartBack,
  },
  TextsClave: {
    width: '15%',
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
  },
  TextsMateria: {
    width: '60%',
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  TextsCalif: {
    width: '20%',
    color: 'black',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default Materias;
