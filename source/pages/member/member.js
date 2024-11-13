import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, BackHandler, ToastAndroid} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect

import { supabase } from '../../supabase/Supabase';
import { Const_styles } from '../../styles/constStyles';
import { FlatList } from 'react-native-gesture-handler';

/*
    https://reactnavigation.org/docs/tab-based-navigation
*/

const Member = ({ navigation })  => {
    const [elements, setElements] = useState([]);
    const [categories, setCategories] = useState([]);
    const [alignContent, setAlignContent] = useState('flex-start');
    const [backPressCount, setBackPressCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data: CoffeeShop, error } = await supabase
                .from('CoffeeShop')
                .select('*')
                .order('id', { ascending: true })
                .neq('id', 9);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data: Categories, error } = await supabase
                  .from('Categories')
                  .select('*')
                  .order('id', { ascending: true });

                if(error){
                    console.log(error)
                } else {
                    setCategories(Categories);
                    //console.log(categories);
                }
            } catch (error) {
                console.log('Error: ' + error);
            }
        }

        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (backPressCount === 0) {
                    setBackPressCount(1);
                    ToastAndroid.show("Presiona de nuevo para salir", ToastAndroid.SHORT);

                    setTimeout(() => {
                        setBackPressCount(0); // Reinicia el contador después de 2 segundos
                    }, 1000);

                return true; // Evita que se ejecute la acción de retroceso en esta pantalla
                } else if (backPressCount === 1) {
                    BackHandler.exitApp(); // Sale de la aplicación al segundo clic
                }
            };
    
            // Añade el listener cuando la pantalla está enfocada
            const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
            // Remueve el listener cuando la pantalla pierde el enfoque
            return () => backHandler.remove();
        }, [backPressCount])
    );
    

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

    const renderItemCat = ({ item }) => {
        return (
            <View style={{
                margin: 5,
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => null} activeOpacity={0.7} style={{
                    backgroundColor: Const_styles.Color_4,
                    borderRadius: 15,
                    padding: 5,
                }}>                    
                    <View style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        backgroundColor: Const_styles.Color_4,
                        borderRadius: 40,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: Const_styles.Color_1,
                            textAlign: 'center',
                        }}>{item.category}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{
                width: 120,
                margin: 5,
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={() => seeDetail(item)} activeOpacity={0.7} style={{
                    backgroundColor: Const_styles.Color_4,
                    borderRadius: 15,
                    padding: 5,
                }}>
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 10,
                            marginBottom: -10,
                            marginHorizontal: 'auto',
                            resizeMode: 'cover',
                        }}
                        source={{ uri: item.image }}
                    />
                    
                    <View style={{
                        width: 100,
                        padding: 5,
                        backgroundColor: Const_styles.Color_4,
                        borderRadius: 40,
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: Const_styles.Color_1,
                            textAlign: 'center',
                        }}>{item.name}</Text>
    
                        <Text style={{
                            fontSize: 12,
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
            <View style={{
                height: 155,
                backgroundColor: Const_styles.Color_5,
                marginBottom: -140,
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
            }}/>
                    
            <Text style={{
                fontSize: 20,
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: 20,
            }}>BIENVENIDO</Text>

            {/* Search bar */}
            <View style={{
                width: '85%',
                height: 35,
                marginHorizontal: 'auto',
                borderRadius: 20,
                backgroundColor: Const_styles.Color_4,
            }}/>

            <View style={{
                marginTop:10,
                height: 50,
                marginHorizontal: 'auto',
                width: '95%'
            }}>
                <FlatList
                    horizontal
                    data={categories}
                    renderItem={renderItemCat}
                    showsHorizontalScrollIndicator={false}                    
                    keyExtractor={(item) => item.id}
                />

            </View>

            <View style={{
                marginVertical:10,
                marginBottom: 20,
                height: '60%',
            }}>
                <FlatList
                    data={elements}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    contentContainerStyle={{ marginHorizontal: 'auto', paddingBottom: 16 }}
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
        width:'50%',
        height: 50,
        marginHorizontal:'auto',
        backgroundColor: Const_styles.Color_2,
        borderRadius:20,
    },
  })

export default Member;