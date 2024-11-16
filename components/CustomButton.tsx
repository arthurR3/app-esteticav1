import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { GestureResponderEvent, Image, Pressable, StyleSheet, Text, View } from 'react-native';

type IoniconNames = keyof typeof Ionicons.glyphMap; // Define los nombres válidos de Ionicons

interface CustomButtonProps {
    title: string,
    onPress: (event: GestureResponderEvent) => void;
    backgroundColor?: string
    imageSource?: any;
    iconName?: IoniconNames
    disabled: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, backgroundColor = '#632e3d', imageSource, iconName, disabled }) => {
    return (
        <Pressable 
            style={[style.button, disabled ? style.buttonDisabled : { backgroundColor }]} 
            onPress={disabled ? undefined : onPress} // Deshabilita el evento onPress si está desactivado
        >
            <View style={style.content}>
                {imageSource && <Image source={imageSource} style={style.image} />}
                <Text style={[style.text, disabled && style.textDisabled]}>{title}</Text>
                {iconName && <Ionicons name={iconName} size={36} style={{ marginLeft: 30 }} color={'white'} />}
            </View>
        </Pressable>
    );
}

export default CustomButton;

const style = StyleSheet.create({
    button: {
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        elevation: 3,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        padding: 3,
        fontSize: 28,
        color: 'white',
        textAlign: 'center',
        fontWeight: '600'
    },
    textDisabled: {
        color: '#fff', // Cambia el color del texto en estado desactivado si es necesario
        opacity: 0.5, // Opcional: reduce la opacidad del texto
    },
    image: {
        width: 24,
        height: 24,
        marginHorizontal: 8
    },
    buttonDisabled: {
        backgroundColor: 'rgba(176, 176, 176, 0.5)', // Color de fondo con efecto difuminado
        opacity: 0.6, // Reduce la opacidad del botón
    },
});
