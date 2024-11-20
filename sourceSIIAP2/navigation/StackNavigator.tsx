import {createStackNavigator} from '@react-navigation/stack';

//import {Const_styles} from '../styles/constStyles';
import MyDrawer from './Drawer';
import Encabezado from '../assets/encabezado';
import Principal from '../pages/principal';
import Directorio from '../pages/directorio';
import Login from '../pages/login';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={({route, navigation}) => ({
        header: () => <Encabezado route={route} navigation={navigation} />,
        headerTitleAlign: 'center',
        animationEnabled: false,
        cardStyle: {backgroundColor: 'white'},
      })}>
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Directorio" component={Directorio} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
