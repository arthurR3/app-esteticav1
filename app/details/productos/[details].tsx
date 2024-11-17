import { useCartContext } from '@/components/context/carritoContext'
import CustomButton from '@/components/CustomButton'
import InputLogin from '@/components/InputText'
import { Productos } from '@/interfaces/products.interface'
import ProductService from '@/services/products.service'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View, Button, Image, StyleSheet } from 'react-native'

export default function DetailsScreen() {
  const { details } = useLocalSearchParams()
  const [detailProduct, setDetailProduct] = useState<Productos | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const { addToCart } = useCartContext()

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


  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator  color="#0000ff" />
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
          <Text style={{fontSize:24, fontWeight:'bold'}} >Stock Disponible</Text>
          {detailProduct.amount > 0 ? (
                        <Text style={{fontSize:24, fontWeight:'bold', marginBottom:10, color:'green'}}>{detailProduct.amount} unidades</Text>
          ):(
            <Text style={{fontSize:24, fontWeight:'bold', marginBottom:10, color:'red'}}>Sin unidades disponibles</Text>

          )}
          <View style={{marginTop:30}}>
            <View>
            {detailProduct.amount > 0 ? (
            <CustomButton title='Agregar al Carrito' iconName='cart-sharp' onPress={()=>{}} disabled={false}/>
          ):(
            <CustomButton title='Agregar al Carrito' iconName='cart-sharp' onPress={()=>{}} disabled/>
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
    justifyContent:'flex-end'
  },
})
