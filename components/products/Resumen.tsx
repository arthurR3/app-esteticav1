import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ResumenOrdenProps = {
  subTotal: number;
  descuento: number;
  impuestos: number;
  envio: number;
  total: number;
};

const ResumenOrden: React.FC<ResumenOrdenProps> = ({ subTotal, descuento, impuestos, envio, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de orden</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Sub Total</Text>
        <Text style={styles.value}>${subTotal.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Descuento:</Text>
        <Text style={styles.value}>-${descuento.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>IVA Incluido (16%)</Text>
        <Text style={styles.value}>${impuestos.toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Envío</Text>
        <Text style={styles.value}>${envio.toFixed(2)}</Text>
      </View>
      <View style={styles.rowTotal}>
        <Text style={styles.labelTotal}>Total</Text>
        <Text style={styles.valueTotal}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#452e3f',
    borderRadius: 8,
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#fff',
    paddingTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
  },
  value: {
    fontSize: 16,
    color: '#fff',
  },
  labelTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  valueTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ResumenOrden;
