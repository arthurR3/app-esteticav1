import { useUsuarioContext } from "@/components/context/userContext";
import { User, UserData } from "@/interfaces/auth.interface";
import AuthService from "@/services/auth.service";
import { router } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function IndeX() {
    const { state, dispatch } = useUsuarioContext()
    const [userToken, setUserToken] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<User>()
    useEffect(() => {
        if (state.token) {
            const decoded = jwtDecode(state.token) as { idUser: number, user: any };
            setUserToken(decoded.user);
        }
    }, [state.token]);

    // Maneja la obtención de direcciones
    useEffect(() => {
        const fetchUser = async (id_user: number) => {
            try {
                const response = await AuthService.getUser(id_user);
                setUserInfo(response);
            } catch (error) {
            }
        };

        if (userToken && userToken.idUser) {
            fetchUser(userToken.idUser);
        }
    }, [userToken]);

    const handleSubmit = () => {
        try {
            dispatch({ type: 'logout' }); // Cerrar sesión
            router.replace('/'); // Primero navega
            setTimeout(() => {
                Alert.alert('Sesión cerrada', 'Has cerrado sesión correctamente');
            }, 500); // Retrasar el dispatch para evitar problemas de renderizado
        } catch (error) {
            Alert.alert('Error', 'Hubo un error al intentar cerrar sesión');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi perfil</Text>

            <View style={styles.profileContainer}>
                <Image source={{ uri: userInfo?.image }} style={styles.profileImage} />
                <Text style={styles.profileName}>{userInfo?.name} {userInfo?.last_name1}</Text>
            </View>

            <View style={styles.infoContainer}>
                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}><Text>👤</Text></View>
                    <View style={{}}>
                        <Text style={styles.infoLabel}>Nombre:</Text>
                        <Text style={styles.infoValue}>{userInfo?.name} {userInfo?.last_name1}</Text>
                    </View>
                  
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}><Text>📧</Text></View>

                    <View style={{}}>
                        <Text style={styles.infoLabel}>Correo Eléctronico:</Text>
                        <Text style={styles.infoValue}>{userInfo?.email}</Text>
                    </View>
                </View>
                <View style={styles.infoRow}>
                    <View style={styles.iconContainer}><Text>📞</Text></View>

                    <View style={{}}>
                        <Text style={styles.infoLabel}>Télefono:</Text>
                        <Text style={styles.infoValue}>{userInfo?.phone}</Text>
                    </View>
                </View>
            </View>

            <Pressable onPress={() => router.navigate('/forgetted')} style={({ pressed }) => [styles.changePassword, { opacity: pressed ? 0.5 : 1 }]}>
                <Text style={styles.changePasswordText}>Cambiar contraseña</Text>
            </Pressable>

            <Pressable onPress={handleSubmit } style={({ pressed }) => [styles.logout, { opacity: pressed ? 0.5 : 1 }]}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        paddingBottom:20,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30
    },
    profileName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 10
    },
    infoContainer: {
        marginBottom: 20
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    iconContainer: {
        width: 30
    },
    infoLabel: {
        fontSize: 18,
        color: '#666'
    },
    infoValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333'
    },
    editIcon: {
        fontSize: 18,
        color: '#5A2E71',
        padding: 10
    },
    changePassword: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15
    },
    changePasswordText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#5A2E71'
    },
    logout: {
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        fontSize: 30,
        color: '#5A2E71'
    },
})