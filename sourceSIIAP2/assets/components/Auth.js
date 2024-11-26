import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import {useNavigation} from '@react-navigation/native';

import {
  View,
  Alert,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {MyStyles} from '../../styles/constStyles';

// https://react-native-google-signin.github.io/docs/original

const Auth = () => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'],
      webClientId:
        '1016681221729-jrp0j69a5599ig333os7rt2ra0tt85nd.apps.googleusercontent.com',
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = user => {
    setUser(user);
    // console.log(user);
    if (user) {
      setLoggedIn(true);
      navigation.navigate('Datos');
    }
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const actualUserInfo = await GoogleSignin.signIn();
      const email = actualUserInfo.data.user.email;
      const domain = email.split('@');
      // Revisa si es que el correo sea del dominio de la escuela
      if (domain[1] != 'alumnos.udg.mx') {
        Alert.alert(
          'Correo no es de estudiante.',
          'Para que lo sea, debe de terminar en @alumnos.udg.mx',
        );
        await GoogleSignin.revokeAccess();
        setUser(null);
        setUserInfo([]);
        setLoggedIn(false);
        return null;
      }
      // console.log(JSON.stringify(actualUserInfo, null, 2));
      const idToken = actualUserInfo.data.idToken;
      if (!idToken) {
        Alert.alert('No ID token available');
      }
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
      setLoggedIn(true);
      setUserInfo(actualUserInfo);
      console.log('Sign-In Successful');
    } catch (error) {
      // console.error('Sign-In Error:', error);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            Alert.alert('Sign-In Cancelled');
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert('Sign-In In Progress');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            Alert.alert('Play Services Not Available');
            break;
          default:
            Alert.alert('Unknown Error', error.message);
        }
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await auth().signOut();
      Alert.alert('You are signed out!');
      setUser(null);
      setUserInfo([]);
      setLoggedIn(false);
    } catch (error) {
      console.error('SignOut Error:', error);
    }
  };

  return (
    <View style={Styles.Body}>
      {!user && (
        <View style={Styles.Container}>
          <Text>You are currently logged out</Text>
          <GoogleSigninButton
            style={{width: 200, height: 50}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
          />
        </View>
      )}
      {user && (
        <View style={Styles.Container}>
          <Text>Welcome, {user.displayName}!</Text>
          {user.photoURL ? (
            <Image source={{uri: user.photoURL}} style={Styles.UserPhoto} />
          ) : (
            <View style={Styles.UserPhoto} />
          )}
          <TouchableOpacity onPress={signOut} style={Styles.Buttons}>
            <Text>Logout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  Body: {
    height: 300,
    width: 250,
    borderRadius: 18,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: MyStyles.mainColor,
  },
  Container: {
    alignItems: 'center',
  },
  Buttons: {
    width: 200,
    height: 50,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  UserPhoto: {
    width: 75,
    height: 75,
    margin: 10,
    borderRadius: 18,
  },
});

export default Auth;
