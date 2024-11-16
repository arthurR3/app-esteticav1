export interface UserData {
    id?:string;
    name: string;
    last_name1: string;
    last_name2: string;
    email: string;
    password: string;
    phone: string;
    birthday: string;
}

export interface DecodeToken {
    user: UserData;
    iat: number;
    exp: number;

}
