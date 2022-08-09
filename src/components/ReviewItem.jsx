import { format } from 'date-fns'
import { View, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import Text from '../components/Text';
import { openLink } from '../utils/miscellaneous';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';

const ReviewItem = ({ review, showReviewActions, refetch }) => {

    const [deleteReview] = useDeleteReview();

    const deleteAlert = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          style: 'cancel'
        },
        { text: 'DELETE', onPress: () => handleDeleteReview() }
      ]
    );

    const handleDeleteReview = () => {
      deleteReview(review.node.id);
      refetch();
    };

    const styles = StyleSheet.create({
      container: {
        backgroundColor: '#FFFFFF',
        marginTop: 7,
      },
      topContainer: {
        flexDirection: 'row',
      },
      topTextContainer: {
        flexDirection: 'column',
        paddingTop: 10
      },
      ratingContainer: {
        flexGrow: 0,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        width: 40,
        height: 40,
        borderStyle: 'solid',
        borderRadius: 20,
        borderColor: theme.colors.primary,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      },
      reviewTextContainer: {
        width: Dimensions.get('window').width * 0.8,
        flexGrow: 1,
        flexShrink: 1,
        marginTop: 3,
        marginBottom: 7,
      },
      reviewActionsContainer: {
        flexDirection: 'row',
      },
      reviewActionButton: {
        margin: 10
      },
    });
  
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.ratingContainer}>
            <Text color='primary' fontWeight='bold' fontSize='subheading'>{review.node.rating}</Text>
          </View>
          <View style={styles.topTextContainer}>
            {showReviewActions ?
            <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>{review.node.repository.fullName}</Text> :
            <Text color='textPrimary' fontWeight='bold' fontSize='subheading'>{review.node.user.username}</Text>
            }
            <Text color='textSecondary' fontSize='subheading'>{format(new Date(review.node.createdAt), 'dd.MM.yyyy')}</Text>
            <View style={styles.reviewTextContainer}>
              <Text color='textPrimary'>{review.node.text}</Text>
            </View>
            {showReviewActions ? 
            <View style={styles.reviewActionsContainer}>
                <View style={styles.reviewActionButton}>
                    <Button color={theme.colors.primary} title='View repository' onPress={ () => openLink(review.node.repository.url)}/>
                </View>
                <View style={styles.reviewActionButton}>
                    <Button color='red' title='Delete review' onPress={deleteAlert}/>
                </View>
            </View> : <></>}
          </View>
        </View>
      </View>
    );
  };

  export default ReviewItem;