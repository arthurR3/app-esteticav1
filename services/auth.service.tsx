import { UserData } from '@/interfaces/auth.interface';
import axios from 'axios';

class AuthService {
  private static baseUrl = `https://back-estetica-production-e475.up.railway.app/api/v1/users`;

  public static async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, { email, password });
      if (response.data.success) {
        return { success: true, data: response.data };
      }
      return { success: false, status: 400, message: 'Credenciales incorrectas.' };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'Ocurrió un error inesperado.',
        };
      } else {
        return {
          success: false,
          status: 500,
          message: 'No se puede conectar al servidor.',
        };
      }
    }
  }

  public static async createAccount(data:UserData):Promise<any> {
    try {
        const response = await axios.post(`${this.baseUrl}`,{user:data})
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Manejo de errores de respuesta del servidor
            return { success: false, message: error.message || 'Error desconocido' };
          } else {
            // Manejo de errores de red u otros
            return { success: false, message: 'Error inesperado al crear la cuenta' };
          }
    }
  }


  public static async getAddress(id_user:number): Promise<any>{
    try {
      const response = await axios.get(`https://back-estetica-production-e475.up.railway.app/api/v1/address/${id_user}`)
      return response.data;
    } catch (error) {
      console.log('Error getting address', error);
    }
  }

  public static async getUser(id_user:number): Promise<any>{
    try {
      const response = await axios.get(`https://back-estetica-production-e475.up.railway.app/api/v1/users/${id_user}`)
      return response.data;
    } catch (error) {
      console.log('Error getting users', error);
    }
  }
  
}

export default AuthService;
