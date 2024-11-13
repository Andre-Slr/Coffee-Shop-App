import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, TouchableOpacity, StyleSheet, } from 'react-native';

import { Const_styles } from '../../styles/constStyles';
import { supabase } from '../../supabase/Supabase';

const Signup = ({ route, navigation })  => {
  const { emailLogin } = route.params;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [bandera, setBandera] = useState(false);

  const signupButton = () => {
    if ( username, password, passwordConfirm ){
      setUsername(emailLogin ? emailLogin : username);
      if ( password != passwordConfirm ){
        Alert.alert('Error', 'Las contraseñas no coinciden.');
      } else {
        signup();
      // navigation.navigate('Login')
      // navigation.navigate('Home', {userEmail: username})
      }
    } else {
      Alert.alert('Incompleto', 'Completa todos los campos.');
    }
  }

  const signup = async () => {
    setBandera(true);
    const {
      data:{session},
      error,
    } = await supabase.auth.signUp({
      email:username,
      password:password,
    })
    if(error) {
      Alert.alert(error.message);
    } else {
      if(!session) {
        Alert.alert('Por favor, revisa tu correo para la verificación.');
        navigation.navigate('Login', {userEmail: username});
      }
      setBandera(false);
    }
  }

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
            defaultValue={emailLogin ? emailLogin : username}/>
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
              onSubmitEditing={null}/>
        </View>

        <View>
          <TextInput
              style={Styles.Input}
              placeholder='confirm password'
              placeholderTextColor={Const_styles.Color_2}
              autoCapitalize='none'
              secureTextEntry={true}
              textAlign='center'
              onChangeText={setPasswordConfirm}
              onSubmitEditing={signupButton}/>
        </View>

      </View>

      <View>
        <TouchableOpacity onPress={signupButton}>
            <View style={Styles.Button}>
                <Text style={{
                    fontSize: 20,
                    color: '#fff',
                    marginTop:10,
                    marginHorizontal:'auto',
                    fontWeight:500,
                }}>Signup</Text>
            </View>
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




export default Signup;