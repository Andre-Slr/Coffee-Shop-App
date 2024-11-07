//import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Const_styles } from '../styles/constStyles';

import Member from '../pages/member/member';
import { NavigationContainer } from '@react-navigation/native';

const MyDrawer = () => {
  //const { codigo, nip, user_data } = route.params; // Extraemos codigo y nip

  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator 
      screenOptions={{
        drawerInactiveBackgroundColor: Const_styles.Color_3, // No seleccionado
        drawerActiveBackgroundColor: Const_styles.Color_3,   // Seleccionado
        drawerContentStyle: {
          backgroundColor: Const_styles.Color_3,
        }
      }}>
          {/*<Drawer.Screen name="Login" component={Login} />*/}
          <Drawer.Screen name="Member" component={Member} />
      </Drawer.Navigator>
  );
}

export default MyDrawer;
