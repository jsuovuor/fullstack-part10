import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selectedSort) => {

  const sortVariablesToQuery = sortVariableSorter(selectedSort)

  const { data, loading  } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network', variables: sortVariablesToQuery,
      });

  if(!loading) return data;

  return { data, loading, };
};

const sortVariableSorter = (selectedSort) => {
  if(selectedSort === 'CREATED_AT') return {orderDirection: 'DESC', orderBy: 'CREATED_AT'}
  if(selectedSort === 'ASC') return {orderDirection: 'ASC', orderBy: 'RATING_AVERAGE'}
  if(selectedSort === 'DESC') return {orderDirection: 'DESC', orderBy: 'RATING_AVERAGE'}
}

export default useRepositories;