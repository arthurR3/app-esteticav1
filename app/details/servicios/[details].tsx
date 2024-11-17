import { Text, View, ActivityIndicator, ScrollView, Image, StyleSheet } from 'react-native'
import { Servicios } from '@/interfaces/services.interface'
import ServiciosService from '@/services/services.service'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'

export default function DetailsScreen() {
  const { details } = useLocalSearchParams()
  const [detailService, setDetailService] = useState<Servicios | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (details) {
        const response = await ServiciosService.getDetail(Number(details))
        setDetailService(response)
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
      <View>
        {detailService ?(
          <>
            <View style={styles.containerImage}>
              <Image source={{ uri: detailService.image }} style={styles.image} />
              <View style={styles.gradientContainer}>
                <Text style={styles.price}>$ {(detailService.price.toFixed(2))}</Text>
                <Text style={styles.title}>{detailService.name}</Text>
              </View>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Descripción:</Text>
              <Text style={styles.detailText}>{detailService.description}</Text>

              <Text style={styles.label}>Duración del servicio:</Text>
              <Text style={styles.detailText}>{detailService.duration}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Ubicación:</Text>
              <Text style={styles.detailText}>Velazquez Ibarra, Col. Centro, Huejutla de Reyes, Hidalgo</Text>
            </View>
            <View style={styles.containerButton}>
            <CustomButton title="Agendar Cita" onPress={() => { router.push(`/${detailService.id}`) }} disabled={false} />
            </View>
          </>
        ) : (
          <Text>No se encontró el servicio</Text>
        )}
      </View>
    </ScrollView>
  )
}

/*  */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 16,
  },
  containerImage: {
    position: 'relative',
    marginBottom: 16
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    color: 'white',
  },
  detailContainer: {
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginTop: 10,
  },
  detailText: {
    fontSize: 22,
    color: '#555',
    marginTop: 4,
  },
  gradientContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 10,
    alignItems: 'center',
  },
  containerButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 100
  },
})
