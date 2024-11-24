export interface UserData {
    idUser: number;
    name: string;
    last_name1: string;
    last_name2: string;
    email: string;
    password: string;
    phone: string;  
    birthday: string;
    showSurvey: boolean;
}

export interface DecodeToken {
    user: UserData;
    iat: number;
    exp: number;

}

export interface Address {
    id: number;
    id_user: number;
    municipality: string;
    cologne: string;
    street: string;
    cp: string;
}

export interface User{
  id:number;
  name:string;
  last_name1:string;
  last_name2:string;
  email:string;
  password:string;
  phone:string;
  image:string;
  code:string;
}