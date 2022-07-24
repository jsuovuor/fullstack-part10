import React from 'react';
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Text from '../components/Text';
import theme from '../theme';

const formatNumber = (input) => {
    if(input < 1000) return input
    let output = Number((input/1000).toFixed(1));
    return output + ' k'
}

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexGrow: 0,
      backgroundColor: '#FFFFFF',
      padding: 10
    },
    topContainer: {
        flexDirection: 'row',
    },
    logoContainer: {
        padding: 10
    },
    topTextContainer: {
        flexDirection: 'column',
        paddingTop: 10
    },
    descriptionContainer: {
        width: Dimensions. get('window'). width - 70,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
    },
    bottomCell: {
        alignItems: 'center',
    },
    language: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        flexShrink: 1,
        alignSelf: 'flex-start',
        borderRadius: 5,
    },
    logo: {
        width: 50,
        height: 50,
    },
  });
  

const RepositoryItem = ({repository}) => {
    return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.logoContainer}><Image style={styles.logo} source={{ uri: repository.ownerAvatarUrl }} /></View>
                    <View style={styles.topTextContainer}>
                        <Text color="textPrimary" fontWeight="bold" fontSize="subheading"> {repository.fullName} </Text>
                        <View style={styles.descriptionContainer}>
                            <Text color="textSecondary"> {repository.description} </Text>
                        </View>
                        <View style={styles.language}>
                            <Text color='white'> {repository.language} </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.bottomCell}>
                        <Text color="textPrimary" fontWeight="bold" fontSize="subheading">{formatNumber(repository.stargazersCount)}</Text>
                        <Text>Stars</Text>
                    </View>
                    <View style={styles.bottomCell}>
                        <Text color="textPrimary" fontWeight="bold" fontSize="subheading"> {formatNumber(repository.forksCount)}</Text>
                        <Text>Forks</Text>
                    </View>
                    <View style={styles.bottomCell}>
                        <Text color="textPrimary" fontWeight="bold" fontSize="subheading"> {formatNumber(repository.reviewCount)}</Text>
                        <Text>Reviews</Text>
                    </View>
                    <View style={styles.bottomCell}>
                        <Text color="textPrimary" fontWeight="bold" fontSize="subheading"> {formatNumber(repository.ratingAverage)}</Text>
                        <Text>Rating</Text>
                    </View>
                </View>
        </View>
    )
}

export default RepositoryItem