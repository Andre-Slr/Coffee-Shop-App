//import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Const_styles } from '../styles/constStyles';

import Member from '../pages/member/member';

const MyDrawer = () => {
  //const { codigo, nip, user_data } = route.params; // Extraemos codigo y nip

  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator>
          <Drawer.Screen name='Member' component={Member} />
      </Drawer.Navigator>
  );
}

export default MyDrawer;
