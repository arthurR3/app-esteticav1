export interface Productos{
    id: number;
    id_category: number;
    id_brand: number;
    id_supplier : number;
    name: string;
    price: number;
    amount:number;
    description: string;
    image: string;
    status: boolean;
    categoria: Categoria;
    marca: Marca;
}

export interface Categoria {
    name: string
}

export interface Marca {
    name: string
}