import { useMutation } from '@apollo/client'
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';



const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE);
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
  
    const signIn = async ({ username, password }) => {
        const data = await mutate({variables: {credentials: {username, password}}});
        await authStorage.setAccessToken(data.data.authenticate.accessToken);
        apolloClient.resetStore();

        return data;
    };
  
    return [signIn, result];
  };

  export default useSignIn;