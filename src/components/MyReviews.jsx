import { FlatList } from 'react-native';
import Text from './Text';
import ReviewItem from './ReviewItem';
import useMyReviews from '../hooks/useMyReviews';
import { useState, useEffect } from 'react';

const MyReviews = () => {
    const [userReviews, setUserReviews] = useState(null)
    const reviews = useMyReviews();

    useEffect(() => {
        if ( reviews && !reviews.loading ) {
            setUserReviews(reviews)
        }
      }, [reviews.loading])

    if(userReviews === null) return <Text>Loading...</Text>

    return (
        <FlatList
        data={userReviews.data.me.reviews.edges}
        renderItem={({ item }) => <ReviewItem review={item} showReviewActions={true} refetch={userReviews.refetch} />}
        keyExtractor={item => item.id}
      />
    );
}

export default MyReviews;