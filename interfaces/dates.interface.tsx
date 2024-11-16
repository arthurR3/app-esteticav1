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