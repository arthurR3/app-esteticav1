import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import CustomButton from '@/components/CustomButton';
import InputLogin from '@/components/InputText';
import useValidation from '@/hooks/validation/useValidation';
import axios from 'axios';
import { router } from 'expo-router';

export default function ForgettedScreen() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false); // Estado de carga
    const { validationEmail, emailError, validationPassword, passwordError } = useValidation();

    const handleSendEmail = () => {
        const isEmailValid = validationEmail(email);
        if (!isEmailValid) {
            Alert.alert('Error', 'Por favor ingrese su correo electrónico');
            return;
        }

        setLoading(true); // Activar el loading
        axios.post('https://dcd4-189-240-192-130.ngrok-free.app/api/v1/users/recover-password', {
            email: email
        })
        .then((response) => {
            if (response.data.success) {
                setStep(2);
            } else {
                Alert.alert('Email Incorrecto', 'No se pudo enviar el correo electrónico. Por favor intente nuevamente.');
            }
        })
        .catch(() => {
            Alert.alert('Email Incorrecto', 'No se pudo enviar el correo electrónico. Por favor intente nuevamente.');
        })
        .finally(() => {
            setLoading(false); // Desactivar el loading
        });
    };

    const handleVerifyCode = () => {
        if (!code || code.length!== 5) {
            Alert.alert('Error', 'Por favor ingrese el código que recibió en su correo.');
            return;
        }

        setLoading(true); // Activar el loading
        axios.post(`https://dcd4-189-240-192-130.ngrok-free.app/api/v1/users/verification-password`, {
            email: email,
            resetCode: parseInt(code)
        })
        .then((response) => {
            if (response.data.success) {
                setStep(3);
            } else {
                Alert.alert('Codigo Incorrecto', 'El código de recuperación es incorrecto. Por favor intente nuevamente.');
            }
        })
        .catch(() => {
            Alert.alert('Codigo Incorrecto', 'El código de recuperación es incorrecto. Por favor intente nuevamente.');
        })
        .finally(() => {
            setLoading(false); // Desactivar el loading
        });
    };

    const handleUpdatePassword = () => {
        const isPasswordValid = validationPassword(newPassword);

        if (!newPassword || !isPasswordValid) {
            Alert.alert('Error', 'Por favor ingrese su nueva contraseña.');
            return;
        }

        setLoading(true); // Activar el loading
       
        axios.post(`https://dcd4-189-240-192-130.ngrok-free.app/api/v1/users/change-password`, {
            email: email,
            newPassword: newPassword
        })
        .then((response) => {
            if (response.data.success) {
                    Alert.alert('Cambio exitoso', 'Tu contraseña se ha actualizado', [
                        { text: 'OK', onPress: () => router.replace('/login') }
                    ]);
            }
        })
        .catch(() => {
            Alert.alert('Error', 'Hubo un error, intente de nuevo!');
        })
        .finally(() => {
            setLoading(false); // Desactivar el loading
        });
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <Text style={styles.title}>¿Has olvidado tu contraseña?</Text>
                        <Text style={styles.subtitle}>Actualizar contraseña.</Text>
                        <View style={{ marginTop: 40 }}>
                            <Text style={styles.inputText}>CORREO ELECTRÓNICO</Text>
                            <InputLogin
                                placeholder='micorreo@gmail.com'
                                image='mail'
                                keyboardType='email-address'
                                value={email}
                                onChangeText={setEmail}
                                bolError={!!emailError} strError={emailError}
                            />
                        </View>
                        <CustomButton title='Recuperar contraseña' onPress={handleSendEmail} disabled={loading} />
                        {loading && <ActivityIndicator color="#0000ff" style={{ marginTop: 20 }} />}
                    </>
                );
            case 2:
                return (
                    <>
                        <Text style={styles.title}>Código de verificación</Text>
                        <Text style={styles.subtitle}>Introduce el código que recibiste en tu correo.</Text>
                        <View style={{ marginTop: 40 }}>
                            <Text style={styles.inputText}>CÓDIGO</Text>
                            <InputLogin
                                placeholder='123456'
                                image='key'
                                keyboardType='numeric'
                                value={code}
                                onChangeText={setCode}
                            />
                        </View>
                        <CustomButton title='Verificar código' onPress={handleVerifyCode} disabled={loading} />
                        {loading && <ActivityIndicator color="#0000ff" style={{ marginTop: 20 }} />}
                    </>
                );
            case 3:
                return (
                    <>
                        <Text style={styles.title}>Nueva contraseña</Text>
                        <Text style={styles.subtitle}>Introduce tu nueva contraseña.</Text>
                        <View style={{ marginTop: 40 }}>
                            <Text style={styles.inputText}>NUEVA CONTRASEÑA</Text>
                            <InputLogin
                                placeholder='••••••••'
                                image='lock-closed'
                                secureTextEntry
                                value={newPassword}
                                onChangeText={setNewPassword}
                                bolError={!!passwordError} strError={passwordError}
                            />
                        </View>
                        <CustomButton title='Actualizar contraseña' onPress={handleUpdatePassword} disabled={loading} />
                        {loading && <ActivityIndicator  color="#0000ff" style={{ marginTop: 20 }} />}
                    </>
                );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View>
                    {renderStep()}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        textAlign: 'center',
    },
    inputText: {
        color: '#452E3F',
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    subtitle: {
        color: 'gray',
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
    },
    avoidingView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
