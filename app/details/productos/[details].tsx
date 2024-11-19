import { useCartContext } from '@/components/context/carritoContext'
import { useUsuarioContext } from '@/components/context/userContext'
import CustomButton from '@/components/CustomButton'
import InputLogin from '@/components/InputText'
import { CartItem, Productos } from '@/interfaces/products.interface'
import ProductService from '@/services/products.service'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View, Button, Image, StyleSheet, Alert } from 'react-native'

export default function DetailsScreen() {
  const { details } = useLocalSearchParams()
  const [detailProduct, setDetailProduct] = useState<Productos | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext()
  const { state } = useUsuarioContext()
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (details) {
        const response = await ProductService.getProductById(Number(details))
        setDetailProduct(response)
        setLoading(false)
      }
    }
    fetchData()
  }, [details])

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };


  const handleAddToCart = (product: Productos) => {
    if (!state.token) {
      Alert.alert(
        "Login Requerido",
        "Debe iniciar sesión para agregar productos al carrito.",
        [{ text: "OK" }]
      );
      return;
    }
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      quantity: quantity,
      amount: product.amount,
      total: product.price * quantity,
    };

    addToCart(cartItem, quantity);
    Alert.alert(
      "Producto Agregado",
      `${product.name} se agregó al carrito correctamente.`,
      [{ text: "OK" }]
    );
    router.navigate('/users/carrito')
  };


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#0000ff" />
        <Text>Cargando...</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      {detailProduct && (
        <View style={styles.productContainer}>
          <Image source={{ uri: detailProduct.image }} style={styles.image} />
          <Text style={styles.price}>${(detailProduct.price).toFixed(2)}</Text>
          <Text style={styles.title}>{detailProduct.name}</Text>
          <Text style={styles.description}>{detailProduct.description}</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }} >Stock Disponible</Text>
          {detailProduct.amount > 0 ? (
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'green' }}>{detailProduct.amount} unidades</Text>
          ) : (
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: 'red' }}>Sin unidades disponibles</Text>

          )}

          <View style={styles.quantityContainer}>
            <Button title="-" onPress={decreaseQuantity} disabled={quantity <= 1} />
            <Text style={styles.quantity}>{quantity}</Text>
            <Button title="+" onPress={increaseQuantity} />
          </View>
          <View style={{ marginTop: 30 }}>
            <View>
              {detailProduct.amount > 0 ? (
                <CustomButton title='Agregar al Carrito' iconName='cart-sharp' onPress={() => { handleAddToCart(detailProduct) }} disabled={false} />
              ) : (
                <CustomButton title='Agregar al Carrito' iconName='cart-sharp' onPress={() => { }} disabled />
              )}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 200
  },
  productContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 24,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'flex-end'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantity: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
})
