import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type CarritoItemProps = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
  imagen: string;
  onEliminar: () => void;
};

const CarritoItem: React.FC<CarritoItemProps> = ({ nombre, descripcion, precio, cantidad, imagen, onEliminar }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imagen }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Text style={styles.descripcion}>{descripcion}</Text>
        <Text style={styles.precio}>${(precio).toFixed(2)}</Text>
        <Text style={styles.cantidad}>Cantidad: {cantidad}</Text>
      
        <TouchableOpacity onPress={onEliminar}>
          <Text style={styles.eliminar}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  descripcion: {
    fontSize: 14,
    color: '#777',
    marginVertical: 2,
  },
  precio: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cantidad: {
    fontSize: 14,
    marginVertical: 2,
  },
  eliminar: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
});

export default CarritoItem;
