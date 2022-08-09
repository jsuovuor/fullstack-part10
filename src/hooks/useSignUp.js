import { useMutation } from '@apollo/client'
import { SIGN_UP } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';



const useSignUp = () => {
    const [mutate, result] = useMutation(SIGN_UP);
    const apolloClient = useApolloClient();
  
    const SignUp = async ({ username, password }) => {
        const data = await mutate({variables: {input: {username, password}}});
        apolloClient.resetStore();

        return data;
    };
  
    return [SignUp, result];
  };

  export default useSignUp;