import {createStackNavigator} from '@react-navigation/stack';

import Login from '../pages/login/Login';
import Signup from '../pages/login/Signup';
import Member from '../pages/member/member';
import MyDrawer from './Drawer';
import Details from '../pages/product/Details';
import Chatbot from '../pages/chatbot/chatbot';

import {Const_styles} from '../styles/constStyles';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        animationEnabled: false,
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
      {/*
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
 */}

      <Stack.Screen
        name="Member"
        component={Member}
        options={{
          headerShown: false,
          title: 'Member',
          //headerShown: false,
          headerStyle: {
            backgroundColor: Const_styles.Color_5,
            shadowOpacity: 0,
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
            backgroundColor: Const_styles.Color_5,
            shadowOpacity: 0,
          },
        }}
      />

      <Stack.Screen
        name="MyDrawer"
        component={MyDrawer}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Chatbot"
        component={Chatbot}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
