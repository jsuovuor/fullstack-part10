import Text from './Text';
import { View, StyleSheet, Button } from 'react-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

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
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

const SignInForm = ({ onSubmit }) => {
    return (
    <View style={styles.container}>
        <FormikTextInput name="username" placeholder="Username" testID='usernameField' />
        <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
        <View style={styles.buttonContainer}>
            <Button color={theme.colors.primary} title="Sign in" onPress={onSubmit} />
        </View>
    </View>
    );
}

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
      };
      
    return (
    <View>
        <Formik initialValues={{ username: '', password: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  )
};

export default SignIn;