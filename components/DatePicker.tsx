import { useState } from "react";
import { Alert, Modal, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import InputLogin from "./InputText";

interface DatePickerProps {
    onDateChange: (date: Date) => void;
    display: 'inline' | 'spinner',
    minimumDate?: Date;
    filterDate: (date: Date) => boolean;
}

const CustomDatePicker = ({ onDateChange, minimumDate, filterDate}: DatePickerProps) => {
    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState<string>('');

    const toggleDatePicker = () => {
        setShowPicker(!showPicker);
    }

    const onChange = (event: any, selectedDate?: Date) => {
      if (event.type === 'set' && selectedDate) {
          if (filterDate(selectedDate)) {  // Verificar si la fecha es laboral
              setDate(selectedDate);
              const formatted = selectedDate.toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
              });
              setFormattedDate(formatted);
              onDateChange(selectedDate); // Propaga el objeto Date

              if (Platform.OS === 'android') {
                  toggleDatePicker();
              }
          } else {
              // Manejar caso cuando la fecha seleccionada no es laboral
              Alert.alert(
                "Fecha no disponible",
                "Este día no es laborable en la estética. Por favor, elige otro día.",
                [{ text: "OK", onPress: () => toggleDatePicker() }]
            );
          }
      } else {
          toggleDatePicker();
      }
  };
    const confirmiOSDate = () => {
        setFormattedDate(date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        }));
        onDateChange(date); // También propaga el objeto Date aquí
        toggleDatePicker();
    };

    return (
        <View>
            {!showPicker && (
                <Pressable onPress={toggleDatePicker}>
                    <InputLogin
                        placeholder="Selecciona una fecha"
                        image="calendar"
                        value={formattedDate}
                        editable={false}
                        onPressIn={toggleDatePicker}
                    />
                </Pressable>
            )}

            {showPicker && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showPicker}
                    onRequestClose={toggleDatePicker}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <DateTimePicker
                                
                                mode="date"
                                display={Platform.OS === 'ios' ? 'inline' : 'spinner'}
                                value={date}
                                onChange={onChange}
                                minimumDate={minimumDate}
                            />
                        </View>
                        {Platform.OS === 'ios' && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <Pressable style={[styles.button, { backgroundColor: 'white' }]} onPress={toggleDatePicker}>
                                <Text style={{ fontSize: 24, color: 'black' }}>Cancel</Text>
                            </Pressable>
                            <Pressable style={[styles.button]} onPress={confirmiOSDate}>
                                <Text style={{ fontSize: 24, color: 'white', fontWeight: '500' }}>Seleccionar</Text>
                            </Pressable>
                        </View>
                        )}
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CustomDatePicker;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'black',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        marginTop: 10,
        marginBottom: 5,
        backgroundColor: "#075985",
        color: 'white',
        paddingHorizontal: 20,
        margin: 6,
    },
});
