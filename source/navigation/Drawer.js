//import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Const_styles } from '../styles/Const_styles';

import Login from '../pages/login/Login';
import Member from '../pages/member/member';

const Drawer = ({ navigation, route }) => {
  //const { codigo, nip, user_data } = route.params; // Extraemos codigo y nip

  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator 
      /*
      screenOptions={{
        drawerInactiveBackgroundColor: Const_styles.Color_3, // No seleccionado
        drawerActiveBackgroundColor: Const_styles.Color_3_Shadow,   // Seleccionado
        drawerContentStyle: {
          backgroundColor: Const_styles.Color_3,
        }
      }}
        */  
      >
          {/*<Drawer.Screen name="Login" component={Login} />*/}
          <Drawer.Screen name="Member" component={Member} />
      </Drawer.Navigator>
  );
}

export default Drawer
