import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, View, Pressable, StyleProp, ViewStyle, ImageStyle, TextStyle, Alert } from 'react-native'
import { useCartContext } from '../context/carritoContext'
import { useUsuarioContext } from '../context/userContext'

interface CardComponentProps {
  id: number,
  title: string,
  imageUrl: any,
  price?: number,
  descripcion?: string
  amount?: number,
  customStyles: {
    containerStyle: StyleProp<ViewStyle>,
    cardStyle: StyleProp<ViewStyle>,
    imageStyle: StyleProp<ImageStyle>,
    titleStyle: StyleProp<TextStyle>,
    descripcionStyle?: StyleProp<TextStyle>,
    priceStyle?: StyleProp<TextStyle>,
    textContainer?: StyleProp<ViewStyle>,
  }
}

const CardProducts: React.FC<CardComponentProps> = (props) => {
  const { addToCart } = useCartContext()
  const {state} = useUsuarioContext()
  // Aquí puedes agregar tus estilos personalizados a cada componente.
  const handleAddToCart = () => {
    if(state.token){

    
    const cartItem = {
      id: props.id,
      name: props.title,
      price: props.price || 0,
      description: props.descripcion || '',
      image: props.imageUrl,
      quantity: 1,  // Puedes agregar un contador de cantidad si es necesario
      total: (props.price || 0) * 1,  // Calcula el total (precio * cantidad)
      amount: props.amount || 0
    };

    addToCart(cartItem, 1);
    Alert.alert('Producto Agregado', `${props.title} se agregó al carrito correctamente.`);
  }else{
    Alert.alert('Error', 'Debes iniciar sesión para agregar productos al carrito.');
    return;  // Evita que el botón de agregar al carrito se habilite si no hay un token de usuario.
  }
  };
  return (
    <Link href={`/details/productos/${props.id}`} asChild>
      <Pressable>
        <View style={props.customStyles.containerStyle} key={props.id}>
          <View style={props.customStyles.cardStyle}>
            <Image source={{ uri: props.imageUrl }} style={props.customStyles.imageStyle} />
            <View style={props.customStyles.textContainer}>
              <Text style={props.customStyles.titleStyle}>{props.title}</Text>
              {props.descripcion && <Text style={props.customStyles.descripcionStyle}>{props.descripcion}</Text>}
              {props.price && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                  <Text style={props.customStyles.priceStyle}>
                    ${(props.price).toFixed(2)}
                  </Text>
                  <Pressable style={{ alignItems: 'center' }} onPress={handleAddToCart}>
                    <Ionicons name='cart-outline' size={24} />
                  </Pressable>
                </View>
              )}
            </View>
          </View>
        </View>
      </Pressable>
    </Link>
  )
}
export default CardProducts;


