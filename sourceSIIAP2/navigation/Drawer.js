import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import Principal from '../pages/principal';
import Directorio from '../pages/directorio';
//import { Const_styles } from '../styles/constStyles';

const MyDrawer = ({ navigation }) => {
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator screenOptions={{
        headerTitle: '',
      }}>
          <Drawer.Screen name='Principal' component={Principal}/>
          <Drawer.Screen name='Directorio' component={Directorio}/>
          
      </Drawer.Navigator>
  );
}

export default MyDrawer;
