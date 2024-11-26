import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

import {firebase} from '@react-native-firebase/auth';

import {MyStyles} from '../styles/constStyles';

const Encabezado = ({navigation, route}) => {
  const {name: page} = route; // Extraemos el nombre de la pantalla actual
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = firebase.auth();

  auth.onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

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
                <Image
                  source={
                    loggedIn
                      ? require('../assets/images/user.png')
                      : require('../assets/images/login.png')
                  }
                  style={Styles.Login}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text style={Styles.Texts}>28°C</Text>
            </View>

            <View style={Styles.headerContent}>
              <Text style={Styles.Texts}></Text>
              {/* Imagen CUCEI */}
              <Image
                source={require('../assets/images/CUCEI_logo.jpg')}
                style={Styles.Logo}
              />
              <Text style={Styles.Texts}></Text>
            </View>
          </View>
        );
      case 'Directorio':
        return (
          <View>
            <View style={Styles.headerContent}>
              {/* Ir atrás */}
              <TouchableOpacity onPress={() => navigation.popToTop()}>
                <Image
                  source={require('../assets/images/back.png')}
                  style={Styles.backImage}
                />
              </TouchableOpacity>

              {/* Autentificar */}
              <TouchableOpacity onPress={goToLogin}>
                <Image
                  source={
                    loggedIn
                      ? require('../assets/images/user.png')
                      : require('../assets/images/login.png')
                  }
                  style={Styles.Login}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text style={Styles.Texts}>28°C</Text>
            </View>

            <View style={Styles.headerContent}>
              <Text style={Styles.Texts}></Text>
              {/* Imagen CUCEI */}
              <Image
                source={require('../assets/images/CUCEI_logo.jpg')}
                style={Styles.Logo}
              />
              <Text style={Styles.Texts}></Text>
            </View>
          </View>
        );
      case 'Login':
        return (
          <View>
            <View style={Styles.headerContent}>
              {/* Ir atrás */}
              <TouchableOpacity onPress={() => navigation.popToTop()}>
                <Image
                  source={require('../assets/images/back.png')}
                  style={Styles.backImage}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text style={Styles.Texts}>28°C</Text>

              <Text style={Styles.loginText}></Text>
            </View>

            <View style={Styles.headerContent}>
              <Text style={Styles.Texts}></Text>
              {/* Imagen CUCEI */}
              <Image
                source={require('../assets/images/CUCEI_logo.jpg')}
                style={Styles.Logo}
              />
              <Text style={Styles.Texts}></Text>
            </View>
          </View>
        );
      case 'Materias':
        return (
          <View>
            <View style={Styles.headerContent}>
              {/* Ir atrás */}
              <TouchableOpacity onPress={() => navigation.navigate('Datos')}>
                <Image
                  source={require('../assets/images/back.png')}
                  style={Styles.backImage}
                />
              </TouchableOpacity>

              {/* Autentificar */}
              <TouchableOpacity onPress={goToLogin}>
                <Image
                  source={require('../assets/images/logout.png')}
                  style={Styles.Logout}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text style={Styles.Texts}>28°C</Text>

              <Text style={Styles.loginText}></Text>
            </View>

            <View style={Styles.headerContent}>
              <Text style={Styles.Texts}></Text>
              {/* Imagen CUCEI */}
              <Image
                source={require('../assets/images/CUCEI_logo.jpg')}
                style={Styles.Logo}
              />
              <Text style={Styles.Texts}></Text>
            </View>
          </View>
        );
      default:
        return (
          <View>
            <View style={Styles.headerContent}>
              {/* Ir atrás */}
              <TouchableOpacity onPress={() => navigation.popToTop()}>
                <Image
                  source={require('../assets/images/back.png')}
                  style={Styles.backImage}
                />
              </TouchableOpacity>

              {/* Autentificar */}
              <TouchableOpacity onPress={goToLogin}>
                <Image
                  source={require('../assets/images/logout.png')}
                  style={Styles.Logout}
                />
              </TouchableOpacity>
            </View>

            <View style={Styles.headerContent}>
              {/* Temperatura */}
              <Text style={Styles.Texts}>28°C</Text>

              <Text style={Styles.loginText}></Text>
            </View>

            <View style={Styles.headerContent}>
              <Text style={Styles.Texts}></Text>
              {/* Imagen CUCEI */}
              <Image
                source={require('../assets/images/CUCEI_logo.jpg')}
                style={Styles.Logo}
              />
              <Text style={Styles.Texts}></Text>
            </View>
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
    marginTop: 5,
  },
  Texts: {
    color: 'black',
    fontSize: 15,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
  backText: {
    width: 30,
    height: 30,
    color: 'white',
    fontSize: 16,
  },
  backImage: {
    width: 30,
    height: 30,
  },
  Logo: {
    width: 150,
    height: 57,
    marginTop: -50,
  },
  Login: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
  Logout: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
});

export default Encabezado;
