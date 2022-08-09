import { View, StyleSheet, Button } from 'react-native';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexGrow: 0,
      backgroundColor: '#FFFFFF',
      padding: 10
    },
    buttonContainer: {
        margin: 10,
    },
  });

  const validationSchema = yup.object().shape({
    ownername: yup
      .string()
      .required('Repository owner name is required'),
    repositoryname: yup
      .string()
      .required('Repository name is required'),
    rating: yup
      .number()
      .typeError('Rating must be between 0 and 100')
      .min(0, 'Rating must be between 0 and 100')
      .max(100, 'Rating must be between 0 and 100')
      .required('Repository name is required'),
    review: yup
      .string()
      .optional()
      
  });

const CreateReviewForm = ({ onSubmit }) => {
    return (
    <View style={styles.container}>
        <FormikTextInput name='ownername' placeholder='Repository owner name' />
        <FormikTextInput name='repositoryname' placeholder='Repository name' />
        <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
        <FormikTextInput name='review' placeholder='Review' multiline={true}/>
        <View style={styles.buttonContainer}>
            <Button color={theme.colors.primary} title='Create a review' onPress={onSubmit} />
        </View>
    </View>
    );
}

const CreateReview = () => {
    const [createReview] = useCreateReview();
    let navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log(values);
        const { ownername, repositoryname, rating, review } = values;

        try {
          const { data } = await createReview({ ownername, repositoryname, rating, review });
          console.log(data);
          navigate(`/repository/${data.createReview.repositoryId}`);
        } catch (e) {
          console.log(e);
        }
      };
      
    return (
      <CreateReviewContainer onSubmit={onSubmit} />
  )
};

export const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <View>
        <Formik initialValues={{ ownername: '', repositoryname: '', rating: '', review: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  )
}

export default CreateReview;