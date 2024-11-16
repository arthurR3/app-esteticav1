import CustomButton from '@/components/CustomButton';
import InputLogin from '@/components/InputText';
import useValidation from '@/hooks/validation/useValidation';
import React, { useState } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Pressable, Alert, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { router, useFocusEffect } from 'expo-router';

export default function Account() {
  const [name, setName] = useState('');
  const [apMaterno, setApMaterno] = useState('');
  const [apPaterno, setApPaterno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetPassword, setRepetPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false);
  const [telefono, setTelefono] = useState('')
  const [secureText, setSecureText] = useState(true);
  const { emailError, passwordError, nameError, phoneError, validationEmail, validationPassword, validationName, validationPhone } = useValidation()
  const [isloading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {

      setName('');
      setApMaterno('');
      setApPaterno('');
      setEmail('');
      setPassword('');
      setRepetPassword('');
      setFechaNacimiento('');
      setDate(new Date())
      setShowPicker(false);
      setTelefono('');
      setSecureText(true);
    }, [])
  );

  const toogleDatepicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = (event: any, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      const currentDate = selectedDate;
      setDate(currentDate);
      const formattedDate = currentDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
      setFechaNacimiento(formattedDate);
      setShowPicker(false);
    } else {
      setShowPicker(false);
    }
  };


  const isOver18 = (birthDate: Date) => {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = () => {
    setIsLoading(true)
    const isEmailValid = validationEmail(email);
    const isPasswordValid = validationPassword(password);
    const isNameValid = validationName(name);
    const isLast_nameValid = validationName(apPaterno);
    const isLast2_nameValid = validationName(apMaterno);
    const isPhoneValid = validationPhone(telefono);
    if (!isEmailValid || !isPasswordValid || !isNameValid || !isLast_nameValid || !isLast2_nameValid || !isPhoneValid) {
      setIsLoading(false)
      Alert.alert('Error de Validación', 'Por favor, completa todos los campos correctamente.');

      return;
    }

    if (isOver18(date) < 18) {
      setIsLoading(false)
      Alert.alert('Menor de Edad', 'Debes ser mayor de 18 años para registrarte');
      return;
    }
    if (password !== repetPassword) {
      setIsLoading(false)
      Alert.alert('Contraseñas no coinciden', 'Por favor verifica que las contraseñas coincidan');
      return;
    }

    const userInfo = {
      user: {
        id_role: 1,
        id_frequency: 1,
        name: name,
        last_name1: apPaterno,
        last_name2: apMaterno,
        email: email,
        password: password,
        phone: telefono,
        birthday: fechaNacimiento,
      }
    };

    axios.post(`https://dcd4-189-240-192-130.ngrok-free.app/api/v1/users/`, userInfo)
      .then(response => {
        if (response.data.success) {
          // Delay the success notification for better UX
          setTimeout(() => {
            setIsLoading(false)
            Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada', [
              { text: 'OK', onPress: () => router.push('/login') }
            ]);
          }, 3500);
        } else {
          const errorMessage = response.data.message ? response.data.message : 'Error desconocido';
          setIsLoading(false)
          Alert.alert('Registro fallido', 'Error: ' + errorMessage);
        }
      })
      .catch(error => {
        setIsLoading(false)
        if (error.response) {
          // The server responded with an error
          if (error.response.status === 400) {
            Alert.alert('Registro fallido', 'El correo ya está registrado.');
          } else {
            Alert.alert('Error', 'Error del servidor.');
          }
        } else if (error.message.toLowerCase() === 'network error') {
          Alert.alert('Error de red', 'Por favor, verifica tu conexión a Internet.');
        } else {
          Alert.alert('Error inesperado', 'Inténtalo de nuevo más tarde.');
        }
      });
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        <Text style={styles.title}>Crear una cuenta</Text>
        <Text style={styles.subtitle}>¿Ya estás registrado? Inicia sesión aquí.</Text>
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>NOMBRE</Text>
            <InputLogin placeholder='Nombre' image='person' value={name} onChangeText={setName}
              strError={nameError} bolError={!!nameError}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>APELLIDO PATERNO</Text>
            <InputLogin
              placeholder='Apellido Paterno' image='person' value={apPaterno} onChangeText={setApPaterno}
              strError={nameError} bolError={!!nameError}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>APELLIDO MATERNO</Text>
            <InputLogin placeholder='Apellido Materno' image='person' value={apMaterno} onChangeText={setApMaterno}
              strError={nameError} bolError={!!nameError}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>FECHA DE NACIMIENTO</Text>
            {!showPicker && (
              <Pressable onPress={toogleDatepicker}>
                <InputLogin placeholder='Fecha de Nacimiento' image='calendar-number' value={fechaNacimiento} onChangeText={setFechaNacimiento}
                  editable={false} onPressIn={toogleDatepicker}
                />
              </Pressable>
            )}

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                style={styles.datePicker}
              />
            )}

          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>CORREO ELECTRONICO</Text>
            <InputLogin placeholder='example@example.com' keyboardType='email-address'
              image='mail' value={email} onChangeText={setEmail}
              bolError={!!emailError} strError={emailError}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputText}>No. CELULAR</Text>
            <InputLogin placeholder='789 890 1015' image='phone-portrait'keyboardType='numeric' 
              value={telefono} onChangeText={setTelefono}
              strError={phoneError} bolError={!!phoneError}
            />
          </View>
        </View>
   
            <Text style={styles.inputText}>CONTRASEÑA</Text>
            <InputLogin placeholder='*********' image='lock-closed' value={repetPassword} onChangeText={setRepetPassword}
              strError={passwordError} bolError={!!passwordError} secureText={secureText}
            />

            <Text style={styles.inputText}>REPETIR CONTRASEÑA</Text>
            <InputLogin placeholder='********' image='lock-closed' value={password} onChangeText={setPassword}
              secureText={secureText} bolGone={true} onPressIcon={() => setSecureText(!secureText)}
              bolError={!!passwordError} strError={passwordError}
            />

        {isloading ? (
          <ActivityIndicator  color="#452e3f" style={styles.loading} />
        ) : (
          <CustomButton title='Registrarme' onPress={handleSubmit} disabled={isloading} />
        )}
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 20
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#452e3f'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row', // Para alinear los inputs en una fila
    justifyContent: 'space-between', // Distribuye el espacio uniformemente
    marginBottom: 15, // Espacio entre filas
  },
  inputWrapper: {
    flex: 1, // Cada input ocupa el mismo espacio en la fila
    marginHorizontal: 6, // Espacio entre los inputs
  },
  inputText: {
    color: '#452E3F',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 1,
  },
  datePicker: {
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 4,
    justifyContent: 'center'
  },
  loadingContainer: {
    position: 'absolute', // Asegúrate de que el overlay sea absoluto
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparente
    zIndex: 10, // Se asegura de estar sobre el formulario
  },
  loading: {
    marginVertical: 20,
  },
});
