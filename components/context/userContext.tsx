import React, { createContext, useContext, useEffect, useReducer } from "react";
import * as SecureStore from 'expo-secure-store'
import { removeToken, saveToken } from "./userSession";
interface State {
    token: string | null;
    snackbarVisible: boolean;
    snackbarMessage: string;
}

interface Action {
    type: 'login' | 'logout' | 'closeSnackbar'; 
    payload?: any;
}

interface UsuarioProviderProps{
    children: React.ReactNode;
}

const initialState: State = {
    token: null,
    snackbarVisible: false,
    snackbarMessage: '',
}

const usuarioReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'login':
            saveToken(action.payload)
            return { ...state, token: action.payload, snackbarVisible: true, snackbarMessage: 'Inicio de sesion exitoso' }

        case 'logout':
            removeToken()
            return { ...state, token: null, snackbarVisible: true, snackbarMessage: 'Cerraste sesión correctamente' }
        default:
            return state;
    }
}

export const UsuarioContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const UsuarioProvider: React.FC<UsuarioProviderProps> = ({ children }) => {

    const [state, dispatch] = useReducer(usuarioReducer, initialState)
    useEffect(() => {
        const loadToken = async () => {
            /* if (typeof window !== 'undefined') {
                // Estamos en la web
                localStorage.getItem('token');
            }else{ */
                const token = await SecureStore.getItemAsync('token')
                if (token) {
                    dispatch({ type: 'login', payload: token })
                }
            //}
            
        }
        loadToken()
    }, []);

    return (
        
        <UsuarioContext.Provider value={{state, dispatch}}>
            {children}
        </UsuarioContext.Provider>
    )

}

export const useUsuarioContext = () => {
    const context = useContext(UsuarioContext);
    if (context === undefined) {
        throw new Error('useUsuarioContext must be used within a UsuarioProvider');
    }
    return context;
};