import { Productos } from "@/interfaces/products.interface";
import { Servicios } from "@/interfaces/services.interface";
import { Link } from "expo-router";
import React from "react";
import { View, Text, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import Swiper from "react-native-swiper";
const { width: screenWidth } = Dimensions.get("window");
const itemsToShow = 3; // Número de elementos a mostrar
const itemWidth = screenWidth / itemsToShow;

interface CarouselItemProps {
  products: Productos[];
}

const CarouselItem: React.FC<CarouselItemProps> = ({ products }) => {
  return (
    <View style={styles.container}>
      <Swiper
        showsPagination={false}
        autoplay={true}
        autoplayTimeout={3}
        width={screenWidth}
        height={screenWidth / 2}
        loop={true}
        overScrollMode="auto"
        index={0}
        showsButtons={false}
        horizontal={true}
        contentContainerStyle={{ flexDirection: "row" }}
      >
        {products.map((item) => (
          <Link href={`/details/productos/${item.id}`} asChild key={item.id}>
            <Pressable>

              <View>  {/* Agregar contenedor View */}
                <View style={[styles.card]}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </View>
            </Pressable>

          </Link>
        ))}
      </Swiper>
    </View>
  );
};

interface CarouselServicesProps {
  servicios: Servicios[]
}

const CarouselServices: React.FC<CarouselServicesProps> = ({ servicios }) => {
  return (
    <View style={styles.container}>
      <Swiper
        showsPagination={false}
        autoplay={true}
        autoplayTimeout={3}
        width={screenWidth}
        height={screenWidth / 2}
        loop={true}
        overScrollMode="auto"
        index={0}
        showsButtons={false}
        horizontal={true}
        contentContainerStyle={{ flexDirection: "row" }}
      >
        {servicios.map((item) => (
          <Link href={`/details/servicios/${item.id}`} asChild key={item.id}>
            <Pressable>

              <View>  {/* Agregar contenedor View */}
                <View style={[styles.card]}>
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <Text style={styles.title}>{item.name}</Text>
                </View>
              </View>
            </Pressable>

          </Link>
        ))}
      </Swiper>
    </View>
  );
};




const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 160,
    marginBottom: 15,
    backgroundColor: 'transparent'
  },
  card: {
    backgroundColor: '#fff',
    margin: 'auto',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '80%',
    height: 100,
    borderRadius: 10,
    aspectRatio: 1
  },
  title: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});
export { CarouselItem, CarouselServices }