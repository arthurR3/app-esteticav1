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

export type CartItem = {
    id: number;
    name: string;
    price: number;
    description: string;
    quantity: number;
    amount: number;
    image: string;
    total: number;
}

interface ProductDetail {
    id: number;
    id_sale: number;
    id_product: number;
    product_name: string;
    image_product: string;
    amount: number;
    unit_price: number;
    subtotal: number;
    category_id: number;
    category_name: string;
    brand_id: number;
    brand_name: string;
  }
  
  export interface UserSales {
    id: number;
    id_user: number;
    id_payment: number;
    id_address: number;
    shipping_status: string; // Ejemplo: "Entregado", "Pendiente"
    total: number;
    date: string; // Fecha en formato ISO 8601
    details: ProductDetail[]; // Detalles de los productos en la compra
  }