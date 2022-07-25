import { View, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_SIGNED_IN_USER } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    display: 'flex',
  },
  text: {
    color: '#FFFFFF',
    padding: 10,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.title
  },
});


const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const signedUser = useQuery(GET_SIGNED_IN_USER);
  const [signedIn, setSignedIn] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    if ( signedUser.data && signedUser.data.me != null ) {
      setSignedIn(true)
      console.log(signedUser.data)
    }
  }, [signedUser.data])

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    setSignedIn(false);
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to='/'>
          <Text style={styles.text}>Repositories</Text>
        </Link>
        {signedIn ? <Text style={styles.text} onPress={onSignOut}>Sign out</Text> : 
        <Link to='/signin'>
          <Text style={styles.text}>Sign in</Text>
        </Link>
        }
      </ScrollView>
    </View>
)

};

export default AppBar;