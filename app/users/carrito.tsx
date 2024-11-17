import { useCartContext } from "@/components/context/carritoContext";
import { useUsuarioContext } from "@/components/context/userContext";
import CustomButton from "@/components/CustomButton";
import CarritoItem from "@/components/products/CarritoItem";
import ResumenOrden from "@/components/products/Resumen";
import { Address, UserData } from "@/interfaces/auth.interface";
import { Productos } from "@/interfaces/products.interface";
import AuthService from "@/services/auth.service";
import { ActivityIndicator } from "@react-native-material/core";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";

export default function IndeX() {
  const { state } = useUsuarioContext()
  const { cart, addToCart, removeCart, clearCart } = useCartContext()
  const [userToken, setUserToken] = useState<UserData | null>(null);
  const [address, setAddress] = useState<Address | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state.token) {
      const decoded = jwtDecode(state.token) as { idUser: number, user: any };
      setUserToken(decoded.user);
    }
  }, [state.token]);

  // Maneja la obtención de direcciones
  useEffect(() => {
    const fetchAddress = async (id_user: number) => {
      try {
        const response = await AuthService.getAddress(id_user);
        setAddress(response);
      } catch (error) {
      }
    };

    if (userToken && userToken.idUser) {
      fetchAddress(userToken.idUser);
    }
  }, [userToken]);
  
  const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const impuestos = subTotal * 0.16;
  const envio = 50;
  const total = subTotal + envio;


  const handlePayment = async () => {
    if (!userToken) {
      alert("El usuario no está autenticado");
      return;
    }
  
    if (!address) {
      alert("No se encontró una dirección válida.");
      return;
    }
  
    try {
      setIsLoading(true);  // Activa el indicador de carga
      const response = await axios.post(`https://back-estetica-production-e475.up.railway.app/api/v1/sales/create-payement`, {
        amount: total * 100,
      });
  
      const { client_secret } = response.data;
  
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: 'Estetica Emma',
      });
      if (initError) throw initError;
  
      const { error: paymentError } = await presentPaymentSheet();
      if (paymentError) throw paymentError;
  
      const data = {
        id_user: userToken.idUser,
        direccion: address?.id,
        total: total,
        session_id: client_secret.split('_secret')[0],
        productos: cart.map((producto) => ({
          id: producto.id,
          nombre: producto.name,
          quantity: producto.quantity,
          unit_amount: Math.round(producto.price * 100),
        })),
      };
  
      await axios.post(`https://back-estetica-production-e475.up.railway.app/api/v1/sales/confirmation-payment`, data);
      Alert.alert('Compra realizada con éxito!');
      await clearCart();
    } catch (error) {
      return;
    } finally {
      setIsLoading(false);  // Desactiva el indicador de carga
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito</Text>
      {isLoading && (
        <View style={styles.loaderContainer}>
        <ActivityIndicator size={36} color="#0000ff" />
      </View>
      )}
      {cart.length === 0 ? (
        <Text style={styles.empty}>Tu carrito está vacío</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CarritoItem
              id={item.id.toString()}
              nombre={item.name}
              descripcion={item.description}
              precio={item.price * item.quantity}
              cantidad={item.quantity}
              imagen={item.image}
              onEliminar={() => removeCart(item.id)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
      <ResumenOrden subTotal={subTotal} descuento={0} impuestos={impuestos} envio={envio} total={total} />
      {cart.length > 0 && (
        <View style={styles.footer}>
          <CustomButton title="Realizar Pago" onPress={handlePayment} disabled={false} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  empty: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#333',
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  loaderContainer: {
    marginVertical: 20,    // Asegúrate de que el indicador esté por encima de otros elementos
  },
})