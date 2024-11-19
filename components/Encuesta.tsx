import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, Pressable } from 'react-native';
import { Rating } from 'react-native-ratings'; // Utiliza una librería de calificación compatible con React Native
import axios from 'axios';

type EncuestaProps = {
  id_user: number;
  onComplete: () => void;
};


const Encuesta: React.FC<EncuestaProps> = ({ id_user, onComplete }) => {
  const [value, setValue] = useState<number | null>(null);
  const [value2, setValue2] = useState<number | null>(null);
  const [value3, setValue3] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const data = {
      id_user,
      question1: value,
      question2: value2,
      question3: value3,
      createdAt: new Date(),
    };

    try {
      const response = await axios.post(`https://back-estetica-production-e475.up.railway.app/api/v1/survey`, data);
      if (response.data.success) {
        console.log('Encuesta enviada con éxito:', response.data);
        onComplete(); // Llamada a la función cuando se complete correctamente
      } else {
        setError('Hubo un problema al enviar la encuesta. Intente nuevamente.');
      }
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
      setError('Error al enviar la encuesta. Verifique su conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Encuesta de satisfacción</Text>
        <Text style={styles.description}>
          Por favor, ayúdanos a evaluar el proceso mediante las siguientes preguntas.
        </Text>

        <Text style={styles.question}>¿Qué tan fácil te resultó seleccionar el servicio?</Text>
        <Rating
          ratingCount={5}
          imageSize={30}
          startingValue={value || 0}
          onFinishRating={setValue}
          style={styles.rating}
        />

        <Text style={styles.question}>¿Qué tan claro y fácil te resultó elegir el horario para tu cita?</Text>
        <Rating
          ratingCount={5}
          imageSize={30}
          startingValue={value2 || 0}
          onFinishRating={setValue2}
          style={styles.rating}
        />

        <Text style={styles.question}>¿Cómo calificarías tu experiencia general con el proceso de reserva?</Text>
        <Rating
          ratingCount={5}
          imageSize={30}
          startingValue={value3 || 0}
          onFinishRating={setValue3}
          style={styles.rating}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            (pressed || !value || !value2 || !value3 || loading) && styles.buttonDisabled,
          ]}
          disabled={!value || !value2 || !value3 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Enviar encuesta</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    maxWidth: 350,
    paddingHorizontal:30,


  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 8,
    color: '#333',
  },
  rating: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#007bff80', // Color más claro para indicar deshabilitado
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Encuesta;
