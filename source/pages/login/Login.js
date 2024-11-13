import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet, } from 'react-native';

import { Const_styles } from '../../styles/constStyles';
import { supabase } from '../../supabase/Supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Login = ({ route, navigation })  => {
  const {userEmail} = route.params ? route.params : "";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bandera, setBandera] = useState(false);

  const loginButton = () => {
    if( username, password) {
      login()
      // navigation.navigate('Home', {userEmail: username})
    } else {
      Alert.alert('Incompleto', 'Completa todos los campos.');
    }
  }

  const signupButton = () => {
    navigation.navigate('Signup', {emailLogin: username ? username : null})
  }

  const login = async () => {
    setBandera(true);
    const {error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password,
    })
    if(error){
      Alert.alert('Intenta otra vez')
    } else {
      try {
        navigation.navigate('MyDrawer')
        await AsyncStorage.setItem('atlas', username)
      } catch(e){
        // errores
      }
    }
  }

  useEffect(() => {
    const fetchLogin = async () => {
      try {
        var a = await AsyncStorage.getItem('atlas')
      } catch(e){
        //errores
      }
      if(a == null){
        // console.log('Deslogueado')
      } else {
        navigation.navigate('MyDrawer')
        console.log('Logueado: ' + a)
      } 
    }

    fetchLogin();
  })

  return (
    <View style={Styles.Body}>
      <View style={{
          height: 155,
          backgroundColor: Const_styles.Color_5,
          marginBottom: -140,
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
      }}/>
      <View style={{
        height:300,
        padding: 30}}>
        <View>
          <TextInput
            style={Styles.Input}
            placeholder='email'
            placeholderTextColor={Const_styles.Color_2}
            autoCapitalize='none'
            textAlign='center'
            onChangeText={setUsername}
            defaultValue={userEmail ? userEmail : username}
            returnKeyType="next" // Show "Next" button on keyboard
          />
        </View>
        
        <View>
          <TextInput
              style={Styles.Input}
              placeholder='password'
              placeholderTextColor={Const_styles.Color_2}
              autoCapitalize='none'
              secureTextEntry={true}
              textAlign='center'
              onChangeText={setPassword}
              defaultValue={password}
              onSubmitEditing={loginButton}/>
        </View>

      </View>

      <View>
        <TouchableOpacity onPress={loginButton}>
            <View style={Styles.Button}>
                <Text style={{
                    fontSize: 20,
                    color: '#fff',
                    marginTop:10,
                    marginHorizontal:'auto',
                    fontWeight:500,
                }}>Login</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={signupButton}>
                <Text style={{
                    fontSize: 15,
                    color: Const_styles.Color_1,
                    marginTop:20,
                    marginHorizontal:'auto',
                    fontWeight:500,
                }}>First time?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create ({
  Body: {
      height:'100%',
      width:'100%',
      marginHorizontal:'auto',
      color: '#ddd',
      backgroundColor: Const_styles.Color_3,
  },
  Input: {
      fontSize:20,
      width:'100%',
      height: 50,
      borderRadius:20,
      marginVertical:15,
      marginHorizontal:'auto',
      backgroundColor: Const_styles.Color_4,
      color: '#222',
  },
  Button:{
      width:'100%',
      height: 50,
      marginHorizontal:'auto',
      backgroundColor: Const_styles.Color_5,
      borderRadius:20,
  },
})



export default Login;