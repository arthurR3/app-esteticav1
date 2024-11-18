import { useUsuarioContext } from "@/components/context/userContext";
import { UserData } from "@/interfaces/auth.interface";
import { Cita } from "@/interfaces/dates.interface";
import DatesService from "@/services/dates.service";
import { ActivityIndicator } from "@react-native-material/core";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
    const { state } = useUsuarioContext();
    const [userToken, setUserToken] = useState<UserData | null>(null);
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (state.token) {
            const decoded = jwtDecode(state.token) as { idUser: number, user: any };
            setUserToken(decoded.user);
        }
    }, [state.token]);

    useEffect(() => {
        const fetchDates = async (id_user: number) => {
            try {
                const response = await DatesService.getDateByUserId(id_user);
                setCitas(response);
            } catch (error) {
            }
        };

        if (userToken && userToken.idUser) {
            fetchDates(userToken.idUser);
        }
    }, [userToken]);

    const filterCitasByStatus = (status: string) => {
        return citas.filter(cita => cita.date_status === status);
    };

    const renderCitas = (citas: Cita[]) => (
        citas.map((cita: Cita) => (
            <View key={cita.id} style={styles.citaContainer}>
                <View style={styles.citaHeader}>
                    <Text style={styles.citaTitle}>Servicios agendados:</Text>
                    <Text style={styles.citaDate}>{new Date(cita.date).toLocaleDateString()}</Text>
                </View>
                <View style={styles.citaDetails}>
                    {cita.Detalle_citas.map((details, index) => (
                        <Text key={index} style={styles.serviceName}>{details.Servicio.name}</Text>
                    ))}
                </View>
                <View style={styles.paymentInfo}>
                    <Text style={cita.paid ? styles.paidText : styles.remainingText}>
                        Pagado: ${cita.paid.toFixed(2)} Falta por pagar: ${cita.remaining.toFixed(2)}
                    </Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.statusText}>Estado de la cita:</Text>
                    <Text style={styles.statusValue}>{cita.date_status}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.timeText}>Hora agendada:</Text>
                    <Text style={styles.timeValue}>{cita.time}</Text>
                </View>
            </View>
        ))
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Mis Citas</Text>
            {loading ? (
                <ActivityIndicator size={36} color="#6200EE" />
            ) : (
                <>
                    <Text style={styles.sectionTitle}>Pendientes por confirmar</Text>
                    {renderCitas(filterCitasByStatus("P_Confirmar"))}

                    <Text style={styles.sectionTitle}>Atendidas</Text>
                    {renderCitas(filterCitasByStatus("Atendida"))}

                    <Text style={styles.sectionTitle}>Canceladas</Text>
                    {renderCitas(filterCitasByStatus("Cancelada"))}
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginVertical: 8,
    },
    citaContainer: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
    },
    citaHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    citaTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1e3a8a',
    },
    citaDate: {
        fontSize: 14,
        color: '#4b5563',
    },
    citaDetails: {
        marginBottom: 8,
    },
    serviceName: {
        fontSize: 14,
        color: '#4b5563',
    },
    paymentInfo: {
        marginBottom: 8,
    },
    paidText: {
        fontSize: 14,
        color: '#10b981',
    },
    remainingText: {
        fontSize: 14,
        color: '#f59e0b',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    statusText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4b5563',
    },
    statusValue: {
        fontSize: 14,
        color: '#7c3aed',
    },
    timeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4b5563',
    },
    timeValue: {
        fontSize: 14,
        color: '#7c3aed',
    },
});
