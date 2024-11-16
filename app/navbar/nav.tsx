import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { AppBar, IconButton, Avatar } from "@react-native-material/core";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const NavBar = ({ showMenu = true }) => {
    const colorScheme = useColorScheme();
    const backgroundColor = '#452e3f';
    const router = useRouter(); // Aquí usamos useRouter de Expo Router
    const navigation = useNavigation();

    return (
        <AppBar
            style={[styles.container, { backgroundColor }]}
            leading={props => (
                <IconButton
                    icon={props => showMenu ?
                        <Icon name='menu' {...props} /> :
                        <Icon name='arrow-left' {...props} />}
                    {...props}
                    onPress={() => showMenu ? navigation.dispatch(DrawerActions.openDrawer()) : router.back()}

                />
            )}
            trailing={props => (
                <View style={styles.trailingContainer}>
                    <IconButton icon={<Icon name='bell-ring-outline' {...props} />} />
                    <Avatar image={require('@/assets/images/logo_estetica.png')} style={styles.AvatarIcon} />
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        height: 130,
        alignItems: 'center',
    },
    trailingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 60,
    },
    AvatarIcon: {
        marginLeft: 8,
        backgroundColor: 'transparent',
    }
});

export default NavBar;
