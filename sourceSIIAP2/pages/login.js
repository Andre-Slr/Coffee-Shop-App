import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Auth from '../assets/components/Auth';

// https://www.freecodecamp.org/espanol/news/como-configurar-el-inicio-de-sesion-de-google-en-react-native-y-firebase/
// https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=android
// 5e:8f:16:06:2e:a3:cd:2c:4a:0d:54:78:76:ba:a6:f3:8c:ab:f6:25
// npm install @react-native-google-signin/google-signin --force
// https://www.youtube.com/watch?v=vojHmGUGUGc&t=513s

const Login = ({navigation}) => {
  return (
    <View style={Styles.Body}>
      <Text>Inicia sesión con tu cuenta de estudiante</Text>
      <Auth />
    </View>
  );
};

const Styles = StyleSheet.create({
  Body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
