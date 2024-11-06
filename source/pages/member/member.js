import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView} from 'react-native';

import { supabase } from '../../supabase/Supabase';
import { Const_styles } from '../../styles/constStyles';
import { FlatList } from 'react-native-gesture-handler';

const Member = ({ navigation })  => {
    const [elements, setElements] = useState([]);
    const [alignContent, setAlignContent] = useState('flex-start');

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data: CoffeeShop, error } = await supabase
                .from('CoffeeShop')
                .select('*')
                .order('id', { ascending: true });

                if(error){
                    console.log(error)
                } else {
                    setElements(CoffeeShop);
                    //console.log(elements);
                }
            } catch (error) {
                console.log('Error: ' + error);
            }
        }

        fetchData();
    }, []);

    const seeDetail = (item) => {
        navigation.navigate('Details', {item: item});
    }

    const deslogueo = async () => {
        try {
            var a = await AsyncStorage.removeItem('atlas');
            console.log(a)
        } catch (e) {
            // remove error
            console.log(e)
        }

        if (a == null) {
            navigation.navigate('Login');
        }
    }


    const renderItem = ({ item }) => {
        return (
            <View style={{
                width: 150,
                margin: 10,
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => seeDetail(item)} activeOpacity={0.7}>
                    <Image 
                        style={{
                            width: 120,
                            height: 100,
                            borderRadius: 15,
                            marginBottom: 10,
                            resizeMode: 'cover',
                        }}
                        source={{ uri: item.image }}
                    />
                    
                    <View style={{
                        width: 140,
                        padding: 10,
                        backgroundColor: Const_styles.Color_4,
                        borderRadius: 15,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: Const_styles.Color_1,
                            textAlign: 'center',
                        }}>{item.name}</Text>
    
                        <Text style={{
                            fontSize: 18,
                            color: Const_styles.Color_1,
                            textAlign: 'center',
                        }}>${item.price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    
    

    return (
        <View style={Styles.Body}>
            <Text style={{
                fontSize: 20,
                fontWeight: 600,
                textAlign: 'center',
            }}>BIENVENIDO!</Text>

            <View style={{
                marginVertical:10,
                height: '80%',
            }}>
                <FlatList
                    data={elements}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                />

            </View>

            <TouchableOpacity onPress={deslogueo}>
                <View style={Styles.Button}>
                    <Text style={{
                        fontSize: 20,
                        color: '#fff',
                        marginTop:10,
                        marginHorizontal:'auto',
                        fontWeight:500,
                    }}>Desloguear</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Styles = StyleSheet.create ({
    Body: {
        height:'100%',
        width:'100%',
        marginHorizontal:'auto',
        padding:5,
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
        backgroundColor: Const_styles.Color_3,
        color: '#222',
    },
    Button:{
        width:'100%',
        height: 50,
        marginHorizontal:'auto',
        backgroundColor: Const_styles.Color_2,
        borderRadius:20,
    },
  })

export default Member;