import { useMutation } from '@apollo/client'
import { CREATE_REVIEW } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';



const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient();
  
    const createReview = async ({ ownername, repositoryname, rating, review }) => {
        const data = await mutate({variables:{'input': {'repositoryName': repositoryname,'ownerName': ownername,'rating': parseInt(rating), 'text': review} }});
        apolloClient.resetStore();

        return data;
    };
  
    return [createReview, result];
  };

  export default useCreateReview;