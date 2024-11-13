//import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Const_styles } from '../styles/constStyles';
import React from 'react';

import Member from '../pages/member/member';
import Chatbot from '../pages/chatbot/chatbot';

const MyDrawer = ({ navigation }) => {
  //const { codigo, nip, user_data } = route.params; // Extraemos codigo y nip
  React.useEffect(() => {
    const logout = navigation.addListener('drawerItemPress', (e) => {
      // Prevent default behavior
      e.preventDefault();
  
      deslogueo();
    });
  
    return logout;
  }, [navigation]);

  const deslogueo = async () => {
    try {
        var a = await AsyncStorage.removeItem('atlas');
        console.log(a)
    } catch (e) {
        // remove error
        console.log(e)
    }

    if (a == null) {
        navigation.navigate('Login');
    }
  };

  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator screenOptions={{
        drawerActiveTintColor: Const_styles.Color_4,
        drawerStyle: {
          backgroundColor: Const_styles.Color_5,
        },
        headerStyle: { // Aquí defines el color de fondo del header
          backgroundColor: Const_styles.Color_5, // Cambia este color
        },
        headerTitle: '',
      }}>
          <Drawer.Screen name='Inicio' component={Member}/>
          <Drawer.Screen name='Chatbot' component={Chatbot}/>
          
      </Drawer.Navigator>
  );
}

export default MyDrawer;
