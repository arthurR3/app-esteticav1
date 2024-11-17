import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUsuarioContext } from './userContext';
import { jwtDecode } from 'jwt-decode';


type CartItem = {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    amount: number;
    image: string;
    total: number;
}
type CartContextType = {
    cart: CartItem[];
    addToCart: (product: CartItem, quantity: number) => Promise<void>;
    removeCart: (product_id: number) => Promise<void>;
    clearCart: () => Promise<void>;
}

interface CarritoProps{
    children: React.ReactNode;
}


export const CartContext = createContext<CartContextType | null>(null);

export const CarritoProvider: React.FC<CarritoProps> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([])
    const { state } = useUsuarioContext();
    const [decodeToken, setDecodeToken] = useState<any | null>(null);

    useEffect(() => {
        const initialCart = async () => {
            if (state.token) {
                const decoded = jwtDecode(state.token) as { idUser: number, user: any }
                decodeToken(decoded.user)
                await updateCartApi(decoded.idUser)
            }
        }
        initialCart()
    }, [state.token])

    useEffect(()=>{
        if(state.token && decodeToken.idUser){
            updateCartApi(decodeToken.idUser)
        }
    }, [decodeToken])
    const updateCartApi = async (id_user: number) => {
        try {
            const response = await axios.get(`https://1e01-201-97-107-140.ngrok-free.app/api/v1/carts/${id_user}`)
            const data = response.data.data;
            const cartData: CartItem[] = data.map((item: any) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                description: item.description,
                quantity: item.quantity,
                amount: item.amount,
                image: item.image,
                total: item.quantity * item.price,
            }))
            if (cartData.length > 0) {
                setCart(cartData);
                await SecureStore.setItemAsync('Cart', JSON.stringify(cartData));
            } else {
                setCart([]);
                await SecureStore.deleteItemAsync('Cart');
            }
        } catch (error) {
            console.error('Error fetching Cart:', error);
        }
    }

    useEffect(() => {
        const saveCartToStorage = async () => {
          await SecureStore.setItemAsync('Cart', JSON.stringify(cart));
        };
        saveCartToStorage();
      }, [cart]);
    
      const addToCart = async (product: CartItem, quantity: number) =>{
        try {
            const existingProduct = cart.find((item) => product.id === item.id);
            if (existingProduct) {
              const newQuantity = existingProduct.quantity + quantity;
              if (newQuantity <= product.amount) {
                const updatedCart = cart.map((item) =>
                  item.id === product.id ? { ...item, quantity: newQuantity } : item
                );
                setCart(updatedCart);
                await updateToCart(product.id, decodeToken.idUser, newQuantity);
              } else {
                console.log('No se puede agregar más productos al carrito');
              }
            } else {
              if (quantity <= product.amount) {
                const newProduct = { ...product, quantity };
                const newCart = [...cart, newProduct];
                setCart(newCart);
                await addCartProduct(newProduct);
              } else {
                console.log('No se puede agregar más productos al carrito');
              }
            }
          } catch (error) {
            console.error('Error adding product to cart:', error);
          }
      }


  const addCartProduct = async (newProduct: CartItem) => {
    try {
      const newCartItem = {
        id_user: decodeToken.idUser,
        ...newProduct,
        total: newProduct.quantity * newProduct.price,
      };
      await axios.post(`https://1e01-201-97-107-140.ngrok-free.app/api/v1/carts/add/`, newCartItem);
    } catch (error) {
      console.error('Error adding item to Cart:', error);
    }
  };

  const updateToCart = async (product_id: number, idUser: string, quantity: number) => {
    try {
      await axios.put(`https://1e01-201-97-107-140.ngrok-free.app/api/v1/carts/${idUser}/${product_id}`, { quantity });
    } catch (error) {
      console.error('Error updating product in cart:', error);
    }
  };

  const removeCart = async (product_id: number) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== product_id);
      setCart(updatedCart);
      await deleteCart(product_id);
    } catch (error) {
      console.error('Error deleting product in cart:', error);
    }
  };

  const deleteCart = async (productId: number) => {
    try {
      const cartDelete = {
        productId,
        id_user: decodeToken.idUser,
      };
      await axios.delete(`https://1e01-201-97-107-140.ngrok-free.app/api/v1/carts/removeProduct`, { data: cartDelete });
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`https://1e01-201-97-107-140.ngrok-free.app/api/v1/carts/${decodeToken.idUser}`);
      setCart([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{cart, addToCart, removeCart, clearCart}}>
        {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCartContext must be used within a CartContext.Provider');
    }
    return context;
  };
  
  export default CartContext;