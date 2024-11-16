import { View, Text, StyleSheet, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';

import CustomButton from '@/components/CustomButton';
import InputLogin from '@/components/InputText';
import { useUsuarioContext } from '@/components/context/userContext';
import useValidation from '@/hooks/validation/useValidation';
import AuthService from '@/services/auth.service';



export default function LoginScreen() {
  const { state, dispatch } = useUsuarioContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false); 
  const { emailError, passwordError, validationEmail, validationPassword } = useValidation();

  const handleSubmit = async () => {
    const isEmailValid = validationEmail(email);
    const isPasswordValid = validationPassword(password);

    if (isEmailValid && isPasswordValid) {
      setLoading(true);

      const response = await AuthService.login(email, password);

      if (response.success) {
        // Iniciar sesión y redirigir si tiene éxito
        dispatch({ type: 'login', payload: response.data.data });
        router.replace('/');
      } else {
        // Mostrar la alerta basada en el código de error
        Alert.alert('Error Inesperado', response.message);
      }

      setLoading(false);
    }
  };

  const toogleAccount = () => {
   // router.navigate('/(auth)/account');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.welcome}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar.</Text>
        <View style={{ marginTop: 40 }}>
          <Text style={styles.inputText}>CORREO ELECTRONICO</Text>
          <InputLogin
            placeholder='example@example.com'
            image='mail'
            keyboardType='email-address'
            value={email}
            onChangeText={setEmail}
            bolError={!!emailError}
            strError={emailError}
          />
          <Text style={styles.inputText}>CONTRASEÑA</Text>
          <InputLogin
            placeholder='********'
            image='lock-closed'
            secureText={secureText}
            bolGone={true}
            onPressIcon={() => setSecureText(!secureText)}
            value={password}
            onChangeText={setPassword}
            bolError={!!passwordError}
            strError={passwordError}
          />
        </View>

        {/* Mostrar el indicador de carga si loading es verdadero */}
        {loading ? (
          <ActivityIndicator  color="#452e3f" style={styles.loading} />
        ) : (
          <CustomButton title='Iniciar Sesión' onPress={handleSubmit} disabled={loading} />
        )}

{/*         <Link style={{ margin: 15, fontSize: 20, alignSelf: 'center' }} href={'/(auth)/forgetted'}>Recuperar contraseña</Link>
 */}        <CustomButton title='Crear cuenta' onPress={toogleAccount}  disabled={false} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 60,
    color: '#452e3f',
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    color: 'gray',
    fontSize: 28,
  },
  inputText: {
    color: '#452E3F',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  loading: {
    marginVertical: 20,
  },
});
