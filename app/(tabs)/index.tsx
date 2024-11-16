import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, Alert } from 'react-native';
import CustomButton from '@/components/CustomButton';
import { useEffect, useState } from 'react';
import { Productos } from '@/interfaces/products.interface';
import ProductService from '@/services/products.service';
import { Servicios } from '@/interfaces/services.interface';
import ServiciosService from '@/services/services.service';
import { router } from 'expo-router';
import { CarouselItem, CarouselServices } from '@/components/Carousel/CarouselItem';
import Animated from 'react-native-reanimated';

export default function HomeScreen() {
  const [products, setProducts] = useState<Productos[]>([]);
  const [services, setServices] = useState<Servicios[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.getProductsForCarousel();
        const servicios = await ServiciosService.getServiciosCarousel();
        setServices(servicios);
        setProducts(response);
      } catch (error) {
        Alert.alert('Error al obtener los productos');
        return [];
      }
    };
    fetchProduct();
  }, []);

  return (
    <Animated.ScrollView>
      <ScrollView style={{ paddingBottom: 100 }}>
        <View style={styles.stepContainer}>
          <Image
            source={require('@/assets/images/portada.png')}
            style={styles.reactLogo}
          />
          <View style={styles.gradientContainer}>
            <Text style={styles.titleContainer}>
              Tu Lugar de Cuidado Personal y Belleza, A un click de Distancia
            </Text>
          </View>
        </View>
        <View style={styles.containerButton}>
          <CustomButton title="Agendar Cita" onPress={() => router.push('/')} iconName="calendar-number-outline" disabled={false} />
        </View>
        <View>
          <Text style={styles.itemCard}>Productos más vendidos</Text>
          {products.length > 0 ? (
            <CarouselItem products={products} />
          ) : (
            <Text>No hay productos disponibles</Text>
          )}
        </View>
        <View>
          <Text style={styles.itemCard}>Servicios Ofrecidos</Text>
          {services.length > 0 ? (
            <CarouselServices servicios={services} />
          ) : (
            <Text>No hay servicios disponibles</Text>
          )}
        </View>
      </ScrollView>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    marginBottom: 20,
    position: 'relative',
    alignItems: 'center',
  },
  reactLogo: {
    height: 178,
    width: 380,
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  titleContainer: {
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  card: {
    width: '30%',
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
  },
  image: {
    width: '80%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 10,
  },
  titleCard: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCard: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#452e3f',
    marginLeft: 20,
    marginBottom: 10,
  },
});
