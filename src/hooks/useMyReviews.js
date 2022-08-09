import { useQuery } from '@apollo/client';
import { GET_MY_REVIEWS } from '../graphql/queries';

const useMyReviews = () => {
  
    const { data, loading, refetch  } = useQuery(GET_MY_REVIEWS, {
      fetchPolicy: 'cache-and-network',
        });

    if(!loading) return { data, refetch };
  
    return { data, loading, };
  };

  export default useMyReviews;