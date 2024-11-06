import {createStackNavigator} from '@react-navigation/stack';

import Login from '../pages/login/Login';
import Home from '../pages/homepage/Home';
import Signup from '../pages/login/Signup';
import Member from '../pages/member/member';
import Drawer from './Drawer';
import Details from '../pages/product/Details';

import {Const_styles} from '../styles/constStyles';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        animationEnabled: true,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: Const_styles.Color_3,
          },
        }}
      />

      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'Signup',
          headerStyle: {
            backgroundColor: Const_styles.Color_3,
          },
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          //headerShown: false,
          headerStyle: {
            backgroundColor: Const_styles.Color_3,
          },
        }}
      />

      <Stack.Screen
        name="Member"
        component={Member}
        options={{
          title: 'Member',
          //headerShown: false,
          headerStyle: {
            backgroundColor: Const_styles.Color_3,
          },
        }}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Details',
          //headerShown: false,
          headerStyle: {
            backgroundColor: Const_styles.Color_3,
          },
        }}
      />

      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: Const_styles.Color_3,
          },
        }}
      />
    </Stack.Navigator>
  );
}
