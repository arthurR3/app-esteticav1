import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import NavBar from './navbar/nav';
import 'react-native-reanimated';
import { UsuarioProvider } from '@/components/context/userContext';
import { CarritoProvider } from '@/components/context/carritoContext';
import Toast from 'react-native-toast-message';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  DarkTheme.colors.background = '#fff0b4'
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <UsuarioProvider>
        <CarritoProvider>
          <Stack>
            <Stack.Screen
              name="(drawer)"
              options={{ header: () => <NavBar showMenu={true} /> }}
            />
            <Stack.Screen name='users/perfil' options={{ header: () => <NavBar showMenu={true} /> }} />
            <Stack.Screen name='users/carrito' options={{ header: () => <NavBar showMenu={true} /> }} />
            <Stack.Screen name='details/servicios/[details]' options={{ header: () => <NavBar showMenu={false} /> }} />
            <Stack.Screen name='details/productos/[details]' options={{ header: () => <NavBar showMenu={false} /> }} />

            <Stack.Screen name='(auth)' options={{ headerShown: false }} />
          </Stack>
        </CarritoProvider>
      </UsuarioProvider>
    </ThemeProvider>
  );
}
