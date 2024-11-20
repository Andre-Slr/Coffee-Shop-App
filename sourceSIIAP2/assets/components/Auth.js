import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {supabase} from '../../pages/supabase/supabase';
import {View, Alert, Button, Text, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {MyStyles} from '../../styles/constStyles';

// https://react-native-google-signin.github.io/docs/original

const Auth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '1016681221729-jrp0j69a5599ig333os7rt2ra0tt85nd.apps.googleusercontent.com',
    });

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onAuthStateChanged = user => {
    setUser(user);
    console.log(user);
    if (user) setLoggedIn(true);
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      setUserInfo(await GoogleSignin.signIn());
      // console.log(JSON.stringify(userInfo, null, 2));
      const idToken = userInfo.data.idToken;
      setLoggedIn(true);
      if (idToken) {
        console.log('ID token present!');
        // Supabase
        const {data, error} = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        });
        // Firebase
        const credential = auth.GoogleAuthProvider.credential(idToken);
        await auth().signInWithCredential(credential);
        console.log(error, data);
        console.log(userInfo);
      } else {
        console.log('no ID token present!');
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            setLoggedIn(false);
            Alert.alert('Cancel');
            // User cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            Alert.alert('In progress');
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            setLoggedIn(false);
            Alert.alert('Play Services not available');
            // Android only, play services not available or outdated
            break;
          default:
            setLoggedIn(false);
            Alert.alert(error.code);
          // some other error happened
        }
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      auth()
        .signOut()
        .then(() => Alert.alert('Your are signed out!'));
      setLoggedIn(false);
      setUserInfo([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={Styles.Body}>
      {!user && (
        <View>
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
        <View>
          <Text>Welcome, {user.displayName}!</Text>
          <Button
            onPress={signOut}
            title="LogOut"
            color="red"
            style={{width: 200, height: 50}}
          />
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
});

export default Auth;
