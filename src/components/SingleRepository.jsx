import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-native';
import { FlatList } from 'react-native';
import Text from '../components/Text';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => {
  return (
    <RepositoryItem repository={repository} showGitHub={true}/>
  );
};


const SingleRepository = () => {
    const [selectedRepository, setSelectedRepository] = useState(null)

    const { id } = useParams();
    const repository = useRepository(id);

    useEffect(() => {
        if ( repository.data && !repository.loading ) {
            setSelectedRepository(repository.data.repository)
        }
      }, [repository.loading])

    if(selectedRepository === null) return <Text>Loading...</Text>

    return(
    <FlatList
          data={selectedRepository.reviews.edges}
          renderItem={({ item }) => <ReviewItem review={item} showReviewActions={false} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={() => <RepositoryInfo repository={selectedRepository} />}
          stickyHeaderIndices={[0]}
        />
        );
  };

export default SingleRepository;
