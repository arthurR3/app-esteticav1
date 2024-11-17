import React from 'react'
import { Drawer } from 'expo-router/drawer'
import { DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';
import { useUsuarioContext } from '@/components/context/userContext';
import { Alert } from 'react-native';
import { router } from 'expo-router';
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { state, dispatch } = useUsuarioContext()

    const handleSubmit = () => {
        try {
            router.replace('/'); // Primero navega
            setTimeout(() => {
                Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
            }, 500); // Retrasar el dispatch para evitar problemas de renderizado
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al intentar cerrar sesión');
        }
    }


    return (
        <DrawerContentScrollView {...props}>
            <DrawerItem
                label="CERRAR X"
                onPress={() => props.navigation.closeDrawer()}
            />
            {state.token && (

                <DrawerItem
                    icon={({ color }) => (<Feather name='user' size={25} color={color} />)}
                    label={'Mi Perfil'}
                    labelStyle={{ fontSize: 22 }}
                    onPress={() => { router.push('/users/perfil') }}
                />

            )}

            <DrawerItem icon={({ color }) => (<Feather name='home' size={25} color={color} />)}
                label={'Inicio'}
                labelStyle={{ fontSize: 22 }}
                onPress={() => router.replace('/')}
            />
            <DrawerItem icon={({ color }) => (<Feather name='shopping-bag' size={25} color={color} />)}
                label={'Productos'}
                labelStyle={{ fontSize: 22 }}
                onPress={() => {
                    router.replace('/productos');
                }}


            />
            <DrawerItem icon={({ color }) => (<Feather name='scissors' size={25} color={color} />)}
                label={'Servicios'}
                labelStyle={{ fontSize: 22 }}
                onPress={() => { router.replace('/servicios') }}

            />
            {state.token ? (
                <>
                    <DrawerItem
                        icon={({ color, size }) => (<Feather name='shopping-cart' size={25} color={color} />)}
                        label={'Mi Carrito'}
                        labelStyle={{ fontSize: 22 }}
                        onPress={() => { router.push('/users/carrito') }}
                    />
                    <DrawerItem
                        icon={({ color }) => (<Feather name='calendar' size={25} color={color} />)}
                        label={'Mis Compras'}
                        labelStyle={{ fontSize: 22 }}
                        onPress={() => { router.push('/') }}
                    />
                    <DrawerItem
                        icon={({ color }) => (<Feather name='calendar' size={25} color={color} />)}
                        label={'Mis Citas'}
                        labelStyle={{ fontSize: 22 }}
                        onPress={() => { router.push('/') }}
                    />
                    <DrawerItem
                        icon={({ color }) => (<Feather name='log-out' size={25} color={color} />)}
                        label={'Cerrar Sesión'}
                        labelStyle={{ fontSize: 22 }}
                        onPress={handleSubmit}
                    />
                </>
            ) : (
                <DrawerItem
                    icon={({ color }) => (<Feather name='log-in' size={25} color={color} />)}
                    label={'Iniciar Ssión'}
                    labelStyle={{ fontSize: 22 }}
                    onPress={() => { router.navigate('/(auth)/login') }}
                />
            )}
        </DrawerContentScrollView>
    )
}
export default function DrawerLayout() {
    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: '#4f3047' } }} />
    );
}
