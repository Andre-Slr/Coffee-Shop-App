import { Text, View, Image, StyleSheet } from 'react-native';

import { Const_styles } from '../../styles/constStyles';

const Details = ({ navigation, route })  => {
    const {item} = route.params;

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
                    fontSize: 18,
                    fontWeight: 400,
                    color: Const_styles.Color_1,
                    textAlign: 'left',
                    margin: 5,
                    marginLeft:10,
                }}>Precio: ${item.price}</Text>
                
                <Text style={{
                    fontSize: 18,
                    fontWeight: 400,
                    color: Const_styles.Color_1,
                    textAlign: 'left',
                    margin: 5,
                    marginLeft:10,
                }}>Disponibles: {item.quantity}</Text>
                
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