import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import StackNavigator from './sourceSIIAP2/navigation/StackNavigator';
//import StackNavigator from './source/navigation/StackNavigator';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}
export default App;
