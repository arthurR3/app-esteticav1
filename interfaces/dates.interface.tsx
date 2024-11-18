import { Servicios } from "./services.interface";

export interface DataRequest {
    customer:{
        email:string;
    },
    data:{
        time: string;
        date:string;
        service: Servicios[];
    }
    total: number;
}

interface Usuario {
    id: number;
    name: string;
    last_name1: string;
    last_name2: string;
    phone: string;
    email: string;
  }
  
  interface Servicio {
    id_service: number;
    price: number;
    duration: string; // duración en formato "HH:MM:SS"
    Servicio: {
      name: string;
    };
  }
  
  interface MetodoPago {
    type: string; // "account_money" u otros tipos que puedas tener
  }
  
  export interface Cita {
    id: number;
    id_user: number;
    id_payment: number;
    date: string; 
    time: string; 
    paid: number; 
    remaining: number; 
    payment_status: string; 
    date_status: string; 
    Usuario: Usuario;
    Detalle_citas: Servicio[];
    Metodo_pago: MetodoPago;
  }
  