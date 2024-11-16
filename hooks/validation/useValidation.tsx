import { useState } from "react";

const useValidation = () => {
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');

  // Validación del correo electrónico
  const validationEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('El correo es inválido');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Validación de la contraseña
  const validationPassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    setPasswordError('');
    return true;
  };

  // Validación del nombre: solo letras
  const validationName = (name: string) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!regex.test(name)) {
      setNameError('El nombre solo debe contener letras');
      return false;
    }
    setNameError('');
    return true;
  };

  // Validación del teléfono: solo números
  const validationPhone = (phone: string) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(phone)) {
      setPhoneError('El teléfono solo debe contener números');
      return false;
    }
    setPhoneError('');
    return true;
  };

  return {
    emailError,
    passwordError,
    nameError,
    phoneError,
    validationEmail,
    validationPassword,
    validationName,
    validationPhone
  };
};

export default useValidation;
