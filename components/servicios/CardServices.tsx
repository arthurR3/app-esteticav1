import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, Pressable, StyleProp, ViewStyle, TextStyle, ImageStyle, Alert } from 'react-native';

interface CardServiciosProps {
  id: number;
  title: string;
  imageUrl: string;
  descripcion?: string;
  price?: number;
  // Customizable styles for each screen 
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

const CardServicios: React.FC<CardServiciosProps> = (props) => {
  return (
    <Link href={`/`} asChild>
      <Pressable>
        <View style={props.customStyles.containerStyle} key={props.id}>
          <View style={props.customStyles.cardStyle}>
            <Image source={{ uri: props.imageUrl }} style={props.customStyles.imageStyle} />
            <View style={props.customStyles.textContainer}>
              <Text style={props.customStyles.titleStyle}>{props.title}</Text>
              {props.price && <Text style={props.customStyles.priceStyle}>Precio: ${(props.price).toFixed(2)}</Text>}
              {props.descripcion && <Text style={props.customStyles.descripcionStyle}>{props.descripcion}</Text>}
            </View>
          </View>
        </View>
        </Pressable>
    </Link>
  );
};

export default CardServicios;
