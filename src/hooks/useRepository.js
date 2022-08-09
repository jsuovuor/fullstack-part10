import { useQuery } from '@apollo/client';
import { GET_SINGLE_REPOSITORY } from '../graphql/queries';

const useRepository = (id) => {

  const { data, loading  } = useQuery(GET_SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network', variables: { id }
      });

  if(!loading) return { data, loading };

  return { data, loading, };
};

export default useRepository;