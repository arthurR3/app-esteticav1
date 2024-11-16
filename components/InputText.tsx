import Ionicons from '@expo/vector-icons/Ionicons';
import { Icon, TextInputProps } from '@react-native-material/core';
import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type IoniconNames = keyof typeof Ionicons.glyphMap; // Define los nombres válidos de Ionicons

interface InputLoginProps extends TextInputProps {

    image: IoniconNames;
    imageRight?: IoniconNames
    bolGone?: boolean;
    onPressIcon?: () => void;
    bolError?: boolean;
    strError?: string;
    secureText?: boolean;
    children?: React.ReactNode;
}

const InputLogin: React.FC<InputLoginProps> = ({
    image,
    imageRight,
    bolGone,
    onPressIcon,
    bolError,
    strError,
    secureText,
    children,
    style,
    ...rest
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Ionicons size={24} name={image} style={styles.leftIcon} />
                {children ? ( // Verifica si hay hijos (como el Picker)
                    <View style={styles.childContainer}>{children}</View>
                ) : (
                    <TextInput
                        style={styles.textInput}
                        placeholderTextColor={'gray'}
                        secureTextEntry={secureText}
                        {...rest}
                    />
                )}

                {bolGone ? (
                    <Pressable style={styles.btnVisibility} onPress={onPressIcon}>
                        <Ionicons
                            name={secureText ? 'eye-off' : 'eye'} size={24}
                        />
                    </Pressable>
                ) : (
                    imageRight && (
                        <Pressable style={styles.btnVisibility} onPress={onPressIcon}>
                            <Ionicons size={26} name={imageRight} style={styles.btnImage} />
                        </Pressable>
                    )
                )}
            </View>

            {bolError && <Text style={styles.errorMessage}>{strError}</Text>}
        </View>
    )
}
export default InputLogin;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 7,
        borderRadius: 10,
    },
    leftIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        paddingVertical: 10,
        paddingHorizontal: 18,
        color: 'black',  // Solo propiedades de TextStyle
      },
    btnVisibility: {
        height: 40,
        width: 35,
        justifyContent: 'center',
    },
    btnImage: {
        resizeMode: 'contain',
        height: '100%',
        width: '100%',
    },
    errorMessage: {
        color: 'red',
        marginTop: 5,
    },
    childContainer: {
        flex: 1,
    }
});
