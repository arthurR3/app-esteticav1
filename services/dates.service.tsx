import { Cita, DataRequest } from "@/interfaces/dates.interface"
import axios from "axios"

interface ApiResponse {
  success: boolean;
  message?: string;
}

class DatesService {
  private static baseUrl = 'https://back-estetica-production-e475.up.railway.app/api/v1/dates'

  public static async sendDate(data: DataRequest): Promise<ApiResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/create-sinpay`, data)
      if (response.data.success) {
        return { success: true };
      } else {
        return { success: false, message: 'Error al guardar los datos.' };
      }

    } catch (error) {
      console.log('Error getting all products:', error);
      return { success: false, message: 'Error al enviar los datos.' };
    }
  }

  public static async getDateByUserId(user_id: number): Promise<Cita[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/${user_id}`)
      const data: Cita[] = response.data
      return data;
    } catch (error) {
      console.log('Error getting dates', error)
      return [];
    }
  }
}

export default DatesService;