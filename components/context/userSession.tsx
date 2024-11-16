import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'usuarioToken';

export const saveToken = async (token: string) => {
    try {
        /* if (typeof window !== 'undefined') {
            // Estamos en la web
            localStorage.setItem(TOKEN_KEY, token);
        } else { */
            // Estamos en móviles
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        //}
        return true;
    } catch (error) {
        console.log('Error saving token', error);
        return false;
    }
}

export const getToken = async () => {
    try {
        /* if (typeof window !== 'undefined') {
            // Estamos en la web
            return localStorage.getItem(TOKEN_KEY);
        } else {
          */   // Estamos en móviles
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            return token;
        //}
    } catch (error) {
        console.log('Error getting token', error);
        return null;
    }
}

export const removeToken = async () => {
    try {
      /*   if (typeof window !== 'undefined') {
            // Estamos en la web
            localStorage.removeItem(TOKEN_KEY);
        } else {
            */ // Estamos en móviles
            await SecureStore.deleteItemAsync(TOKEN_KEY);
       // }
        return true;
    } catch (error) {
        console.log('Error deleting token', error);
        return false;
    }
}
