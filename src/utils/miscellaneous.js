import * as Linking from 'expo-linking';

export const openLink = (url) => {
    Linking.openURL(url);
}