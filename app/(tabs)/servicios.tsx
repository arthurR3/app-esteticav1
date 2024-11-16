import CardServicios from '@/components/servicios/CardServices'
import { Servicios } from '@/interfaces/services.interface'
import ServiciosService from '@/services/services.service'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function ServiciosScreen() {
  const [servicios, setServicios] = useState<Servicios[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await ServiciosService.getAllServices();
      setServicios(response)
    }
    fetchData()
  }, []);
  const renderItem = ({ item }: { item: Servicios }) =>
    <CardServicios
      key={item.id}
      id={item.id}
      title={item.name}
      imageUrl={item.image}
      descripcion={item.description}
      customStyles={{
        containerStyle: styles.container,
        cardStyle: styles.card,
        imageStyle: styles.image,
        titleStyle: styles.title,
        descripcionStyle: styles.descripcion,
        priceStyle: styles.price,
        textContainer: styles.textContainer
      }} />;

      return (
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={styles.titleService}>Servicios de la estética:</Text>
          <View>
            {servicios.length > 0 ? (
              <FlatList
                data={servicios}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            ) : (
              <Text>No hay servicios disponibles</Text> 
            )}
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  titleService: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#452e3f',
    fontWeight: '600'
  },
  container: {
    marginBottom: 15,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});
