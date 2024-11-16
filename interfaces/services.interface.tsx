export interface Servicios {
    id: number;
    name: string;
    id_categoria: number;
    description: string;
    price: number;
    duration: string
    image: string;
    status: boolean;
    categoria: Categoria;
}

export interface Categoria {
    name: string;
}

export interface Schedule {
    dia_semana: number;
    intervalos: Intervalos[];
}
export interface Intervalos {
    hora_desde: string;
    hora_hasta: string;
}
export interface Exceptions{
    id: number;
    id_administrador: number;
    dia_semana : number;
    hora_desde: string;
    hora_hasta: string;

}