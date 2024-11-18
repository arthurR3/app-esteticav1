import { useUsuarioContext } from "@/components/context/userContext";
import { UserData } from "@/interfaces/auth.interface";
import { UserSales } from "@/interfaces/products.interface";
import AuthService from "@/services/auth.service";
import { ActivityIndicator } from "@react-native-material/core";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index(){
    const { state } = useUsuarioContext();
    const [userToken, setUserToken] = useState<UserData | null>(null);
    const [sales, setSales] = useState<UserSales[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (state.token) {
            const decoded = jwtDecode(state.token) as { idUser: number, user: any };
            setUserToken(decoded.user);
        }
    }, [state.token]);

    useEffect(() => {
        setIsLoading(true);

        const fetchDates = async (id_user: number) => {
            try {
                const response = await AuthService.getOrders(id_user);
                setSales(response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
                setIsLoading(false);

            } catch (error) {
                console.error('Error fetching dates:', error);
                setIsLoading(false);

            }
        };
        
        if (userToken && userToken.idUser) {
            fetchDates(userToken.idUser);
        }
    }, [userToken]);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Mis Compras</Text>
            {isLoading ? (
                <ActivityIndicator size={36} color="#6200EE" />
            ) : (
                <FlatList
                    data={sales}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.orderCard}>
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderTitle}>Compra #{item.id}</Text>
                                <Text style={styles.orderDate}>{new Date(item.date).toLocaleDateString()}</Text>
                            </View>
                            <FlatList
                                data={item.details}
                                keyExtractor={(detail, index) => index.toString()}
                                renderItem={({ item: detail }) => (
                                    <View style={styles.orderDetail}>
                                        <Image source={{ uri: detail.image_product }} style={styles.productImage} />
                                        <View>
                                            <Text style={styles.productName}>{detail.product_name}</Text>
                                            <Text style={styles.productAmount}>Cantidad: {detail.amount}</Text>
                                        </View>
                                    </View>
                                )}
                            />
                            <View style={styles.orderFooter}>
                                <Text style={styles.orderTotal}>Total: ${item.total.toFixed(2)}</Text>
                                <Text style={[
                                    styles.orderStatus,
                                    item.shipping_status === 'Entregado' ? styles.statusDelivered :
                                    item.shipping_status === 'En proceso' ? styles.statusInProgress : styles.statusCancelled
                                ]}>
                                    {item.shipping_status}
                                </Text>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No se encontraron compras con los filtros seleccionados</Text>
                        </View>
                    )}
                />
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
    },
    filtersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    filterButton: {
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    orderCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    orderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    orderTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6200EE',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
    },
    orderDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    productImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
    },
    productAmount: {
        fontSize: 14,
        color: '#666',
    },
    orderFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    orderStatus: {
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    statusDelivered: {
        color: 'green',
    },
    statusInProgress: {
        color: 'orange',
    },
    statusCancelled: {
        color: 'red',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 32,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});
