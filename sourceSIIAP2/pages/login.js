import React, { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
// how to:
    // https://www.freecodecamp.org/espanol/news/como-configurar-el-inicio-de-sesion-de-google-en-react-native-y-firebase/
// SHA-1:
    // 5E:8F:16:O6:2E:A3:CD:2C:4A:OD:54:78:76:BA:A6:F3:8C:AB:F6:25

import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState([]);

    // Manejo de la autentificación
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const {accessToken, idToken} = await GoogleSignin.signIn();
            setLoggedIn(true);
            const credential = auth.GoogleAuthProvider.credential(
                idToken,
                accessToken,
            );
            await auth().signInWithCredential(credential);
        } 
        catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // El usuario canceló el flujo del login
                Alert.alert('Cancel');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // La operación ya está en progreso
                Alert.alert('Signin in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // Play Services no disponible o desactualizados
                Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
            } else {
                // Otro error
            }
        }
    };

    // Configuración del objeto de inicio de sesión de Google
    useEffect(() => {
        GoogleSignin.configure({
            scopes: ['email'], 
            webClientId:
                '1016681221729-jrp0j69a5599ig333os7rt2ra0tt85nd.apps.googleusercontent.com',
            offlineAccess: true,
        });
    }, []);

    // Función de deslogueo
    const signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setLoggedIn(false);
            setUserInfo([]);
        }
        catch ( error ) {
            console.error(error);
        }
    }

    return (
        <View>
            <Text>Login</Text>

            {/* Botón de Google */}
            <View>
                <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={signIn}
                />
            </View>
            <View>
                {!loggedIn && <Text>You are currently logged out</Text>}
                {loggedIn && (
                    <Button
                        onPress={signOut}
                        title="LogOut"
                        color="red"/>
                )}
            </View>
        </View>
    );
}

export default Login;