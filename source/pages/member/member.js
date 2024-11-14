import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, BackHandler, ToastAndroid} from 'react-native';
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
    const [backPressCount, setBackPressCount] = useState(0);
    const [searchProd, setSearchProd] = useState("");
    const [searchCat, setSearchCat] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [
                    { data: coffeeShopData, error: coffeeError }, 
                    { data: categoriesData, error: categoryError }] = await Promise.all([
                    supabase.from('CoffeeShop')
                    .select('*')
                    .order('name', { ascending: true })
                    .neq('id', 9),

                    supabase.from('Categories')
                    .select('*')
                    .order('id', { ascending: true }),
                ]);

                if (coffeeError) console.log(coffeeError);
                else setElements(coffeeShopData);

                if (categoryError) console.log(categoryError);
                else setCategories(categoriesData);

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

                    setTimeout(() => setBackPressCount(0), 1000);

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
        navigation.navigate('Details', {item});
    }

    const deslogueo = async () => {
        try {
            await AsyncStorage.removeItem('atlas');
            navigation.navigate('Login');
        } catch (error) {
            // remove error
            console.log(error);
        }
    }

    const selectCatAndSearch = (id) => {
        setSearchCat(id); // Actualiza el estado con el id de la categoría seleccionada
        searchAgain(id);  // Llama a searchAgain inmediatamente con el id de la categoría
    };
    
    // Observa los cambios en searchCat y ejecuta searchAgain si cambia la categoría seleccionada
    useEffect(() => {
        if (searchCat) {
            //console.log("Categoría seleccionada:", searchCat);
            searchAgain(searchCat);
        }
    }, [searchCat]);
    
    // Modificación de la función searchAgain para aceptar un parámetro de búsqueda
    const searchAgain = async (categoryId = searchCat, searchQuery = searchProd) => {
        try {
            // console.log('Category ID:', categoryId); // Verifica que el ID de categoría sea correcto
            // console.log('Search Query:', searchQuery); // Verifica que el query de búsqueda sea correcto
        
            // Paso 1: Obtén los productos relacionados en Product_Categories
            const { data: productCategories, error: pcError } = await supabase
                .from('Product_Categories')
                .select('product_id')
                .eq('category_id', categoryId);

            if (pcError) throw pcError;

            // Verifica si productCategories tiene datos
            if (productCategories.length === 0) {
                // console.log('No se encontraron productos para esta categoría.');
                setElements([]); // Limpia los elementos si no hay resultados
                return;
            }

            // console.log('Datos de productCategories:', productCategories);

            // Extrae los IDs de productos
            const productIds = productCategories.map((pc) => pc.product_id);
            // console.log('IDs de productos:', productIds);

            // Paso 2: Filtra los productos en CoffeeShop usando los IDs obtenidos
            const { data: CoffeeShop, error: csError } = await supabase
                .from('CoffeeShop')
                .select('*')
                .in('id', productIds)
                .order('name', { ascending: true })
                .ilike('name', `%${searchQuery}%`);

            if (csError) throw csError;

            setElements(CoffeeShop);
        } catch (error) {
            // console.log('Error:', error);
        }
    };    

    const renderItemCat = ({ item }) => {
        // Verifica si la categoría actual es la seleccionada
        const isSelected = searchCat === item.id;
        
        return (
            <View>
                <TouchableOpacity onPress={() => selectCatAndSearch(item.id)} style={[Styles.CategoryButton, isSelected && {backgroundColor: Const_styles.Color_6}]}>                    
                    <View style={Styles.CategoryTextWrapper}>
                        <Text style={[Styles.CategoryText, isSelected && {color : Const_styles.Color_4}]}>{item.category}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => seeDetail(item)} style={Styles.ElementsButton}>
                    <Image source={{ uri: item.image }} style={Styles.ElementsImage}/>
                    <View style={Styles.ElementsTextWrapper}>
                        <Text style={[Styles.ElementsText, {fontWeight: 'bold',}]}>{item.name}</Text>
                        <Text style={Styles.ElementsText}>${item.price}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={Styles.Body}>
            <View style={Styles.Header}/>
                    
            <Text style={{
                fontSize: 20,
                fontWeight: 600,
                textAlign: 'center',
                marginBottom: 10,
            }}>BIENVENIDO</Text>

            <View />

            {/* Search bar */}
            <View>
                <TextInput
                style={Styles.SearchInput}
                placeholder='Busca un producto'
                placeholderTextColor={Const_styles.Color_2}
                onChangeText={setSearchProd}
                onSubmitEditing={() => searchAgain(searchCat, searchProd)}
                />

                <TouchableOpacity onPress={() => searchAgain(searchCat, searchProd)}>
                    <Image 
                        source={require('../../assets/components/lupa.png')}
                        style={{
                            width:20, 
                            height: 20,
                            alignSelf: 'flex-end',
                            marginTop: -30,
                            marginRight: '10%',
                        }}/>
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    horizontal
                    data={categories}
                    renderItem={renderItemCat}
                    showsHorizontalScrollIndicator={false}                    
                    keyExtractor={(item) => item.id}
                    style={Styles.CategoriesList}
                />
            </View>

            {(elements <= 0) ? (
                <View style={{height: '70%', alignItems: 'center'}}>
                    <Text style={{
                        fontSize: 30,
                        color: Const_styles.Color_5,
                        fontWeight: 'heavy',
                        marginVertical: 'auto',
                    }}>¡Lo siento! No tengo un producto con esas características</Text>
                    <Image source={require('../../assets/components/Coffee_cup.png')} style={Styles.ElementsCoffeeError}/>
                </View>
            ) : (
                <View>
                    <FlatList
                        data={elements}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        contentContainerStyle={{ marginHorizontal: 'auto', paddingBottom: 16 }}
                        showsVerticalScrollIndicator={false}
                        style={Styles.ElementsList}
                    />                    
                </View>
            )}

            <TouchableOpacity onPress={deslogueo}>
                <View style={Styles.DeslogueoButton}>
                    <Text style={Styles.DeslogueoText}>Desloguear</Text>
                </View>
            </TouchableOpacity>
            
        </View>
    );
}

const Styles = StyleSheet.create ({
    Body: {
        flex: 1,
        backgroundColor: Const_styles.Color_3,
    },
    Header: {
        height: 155,
        backgroundColor: Const_styles.Color_5,
        marginBottom: -140,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    SearchInput: {
        width: '85%',
        height: 50,
        marginHorizontal: 'auto',
        borderRadius: 20,
        backgroundColor: Const_styles.Color_4,
        paddingHorizontal: 15,
        paddingVertical: 10, 
        color: '#222',
    },
    CategoriesList: {
        marginTop:10,
        height: 50,
        marginHorizontal: 'auto',
    },
    CategoryButton: {
        marginHorizontal: 5,
        backgroundColor: Const_styles.Color_4,
        borderRadius: 20,
        padding: 5,
    },
    CategoryTextWrapper: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
    },
    CategoryText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Const_styles.Color_1,
    },
    ElementsList: {
        marginBottom: 10,
        height: '70%',
    },
    ElementsButton:{
        width: 120,
        margin: 5,
        alignItems: 'center',
        backgroundColor: Const_styles.Color_4, // Fondo de cada producto
        borderRadius: 15,
        padding: 5,
    },
    ElementsImage: {
        width: 110,
        height: 110,
        borderRadius: 10,
        marginBottom: -10,
        marginHorizontal: 'auto',
        resizeMode: 'cover',
    },
    ElementsTextWrapper:{
        width: 100,
        padding: 5,
        backgroundColor: Const_styles.Color_4,
        borderRadius: 40,
        alignItems: 'center',
    },
    ElementsText: {
        fontSize: 12,
        color: Const_styles.Color_1,
        textAlign: 'center',
    },
    ElementsCoffeeError: {
        height: 270,
        width: 270,
        marginHorizontal: 'auto',
        marginTop: -100,
    },
    DeslogueoButton:{
        width:'40%',
        height: 40,
        marginHorizontal:'auto',
        backgroundColor: Const_styles.Color_5,
        borderRadius:20,
    },
    DeslogueoText: {
        fontSize: 15,
        color: '#fff',
        marginTop:10,
        marginHorizontal:'auto',
    },
  })

export default Member;