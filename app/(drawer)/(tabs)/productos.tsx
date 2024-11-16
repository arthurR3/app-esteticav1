import InputLogin from '@/components/InputText'
import CardProducts from '@/components/products/CardProducts'
import { Productos } from '@/interfaces/products.interface'
import ProductService from '@/services/products.service'
import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'

export default function ProductosScreen() {
  const [products, setProducts] = useState<Productos[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.getAllProducts()
        setProducts(response)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )
  const renderItem = ({ item }: { item: Productos }) =>
    <CardProducts
      key={item.id}
      id={item.id}
      title={item.name}
      imageUrl={item.image}
      descripcion={item.description}
      price={item.price}
      customStyles={{
        containerStyle: styles.container,
        cardStyle: styles.card,
        imageStyle: styles.image,
        titleStyle: styles.title,
        descripcionStyle: styles.descripcion,
        priceStyle: styles.price,
        textContainer: styles.textContainer
      }}
    />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginHorizontal: 30, marginTop: 10 }}>
        <InputLogin placeholder='Buscar...' image='search-circle'
          value={searchTerm}
          onChangeText={(e) => setSearchTerm(e)}
          imageRight='close-circle-outline' onPressIcon={() => setSearchTerm('')} />
      </View>
      <View>
        {filteredProducts.length > 0 ? (
          <FlatList
            data={filteredProducts}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
        ) : (
            <Text style={styles.titleService}>No hay productos disponibles.</Text>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  openPickerButton: {
    backgroundColor: '#452e3f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    width: '40%'
  },
  openPickerText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  pickerContainer: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerTitle: {
    fontSize: 16,
    marginBottom: 10,
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
    borderRadius: 5,
    borderWidth: 1,
    width: '40%',
    textAlign: 'center'
  },
  descripcion: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  titleService: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    color: '#452e3f',
    fontWeight: '600'
  },
});

