import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CustomPickerProps {
  selectedValue: any;
  onValueChange: (itemValue: any, itemIndex: number) => void;
  items: { label: string; value: any }[];
  placeholder?: string;
}

const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  placeholder = "Selecciona una opción",
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  if (Platform.OS === 'android') {
    return (
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ color: 'black' }}
      >
        <Picker.Item label={placeholder} value={null} />
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    );
  }

  // Modal para iOS
  return (
    <View>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.pickerTrigger}
      >
        <Text style={styles.selectedText}>
          {items.find((item) => item.value === selectedValue)?.label || placeholder}
        </Text>
      </Pressable>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedValue}
              itemStyle={{ color: 'black' }} // Estilo para los ítems
              onValueChange={(value) => {
                onValueChange(value, items.findIndex((item) => item.value === value));
                setModalVisible(false);
              }}
            >
              {items.map((item, index) => (
                <Picker.Item key={index} label={item.label} value={item.value} style={{ color: 'gray' }} />
              ))}
            </Picker>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerTrigger: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#075985',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CustomPicker;
