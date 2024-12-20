import { Text, View, Image, StyleSheet } from 'react-native';

import { Const_styles } from '../../styles/constStyles';
import { FlatList } from 'react-native-gesture-handler';

const Details = ({ navigation, route })  => {
    const {item} = route.params;
    const categories = Array.isArray(item.categories) ? item.categories : [];

    const renderItemCat = ({ item }) => {
        return (
            <View style={{
                margin: 5,
                padding: 12,
                alignItems: 'center',
                backgroundColor: Const_styles.Color_5,
                borderRadius: 20
            }}>
                <Text style={{
                    fontSize: 13,
                    fontWeight: 'bold',
                    color: Const_styles.Color_4,
                }}>{item}</Text>
            </View>
        )
    }

    return(
        <View style={Styles.Body}>
        <View style={{
            height: 155,
            backgroundColor: Const_styles.Color_5,
            marginBottom: -140,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
        }}/>
            <View style={{
                margin: 5,
            }}/>
            <View style={{
                width: '95%',
                marginHorizontal: 'auto',
                marginTop: 150,
                padding: 10,
                paddingTop: 60,
                backgroundColor: Const_styles.Color_4,
                borderRadius: 25,
            }}>
                <Image 
                    style={{
                        width:200,
                        height:240,
                        borderRadius:25,
                        marginTop: -200,
                        marginHorizontal: 'auto',
                    }}
                    source={{uri:(item.image)}}/>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 800,
                    color: Const_styles.Color_1,
                    textAlign: 'center',
                    marginTop: 10,
                }}>{item.name}</Text>

                <Text style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: Const_styles.Color_1,
                    textAlign: 'left',
                    margin: 10,
                }}>{item.description}</Text>
                
                <Text style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: Const_styles.Color_1,
                    textAlign: 'left',
                    margin: 5,
                    marginLeft:10,
                }}>Precio: ${item.price}</Text>                

                <View>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 400,
                        color: Const_styles.Color_1,
                        textAlign: 'left',
                        margin: 5,
                        marginLeft:10,
                    }}>Categorías: 
                    </Text>
                    <FlatList
                    data={categories}
                    renderItem={renderItemCat}
                    keyExtractor={(item, index) => item.index}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ marginHorizontal: 'auto', paddingBottom: 16 }}
                    style={{
                    }}/>
                </View>
            </View>
        </View>
    )
}


const Styles = StyleSheet.create ({
    Body: {
        height:'100%',
        width:'100%',
        marginHorizontal:'auto',
        padding:0,
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


export default Details;