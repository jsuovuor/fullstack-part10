import { View, StyleSheet, Button } from 'react-native';
import { useNavigate } from 'react-router-native';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

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
      .min(1, 'Username length must be between 1 and 30')
      .max(30, 'Username length must be between 1 and 30')
      .required('Username is required'),
    password: yup
      .string()
      .min(5, 'Password length must be between 5 and 30')
      .max(50, 'Password length must be between 5 and 30')
      .required('Password is required'),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password confirmation is required'),
  });

const SignUpForm = ({ onSubmit }) => {
    return (
    <View style={styles.container}>
        <FormikTextInput name='username' placeholder='Username' />
        <FormikTextInput name='password' placeholder='Password' secureTextEntry={true} />
        <FormikTextInput name='passwordConfirmation' placeholder='Password confirmation' secureTextEntry={true} />
        <View style={styles.buttonContainer}>
            <Button color={theme.colors.primary} title='Sign up' onPress={onSubmit} />
        </View>
    </View>
    );
}

const SignUp = () => {
    const [SignUp] = useSignUp();
    const [SignIn] = useSignIn();
    let navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log(values);
        const { username, password } = values;

        try {
          const { data } = await SignUp({ username, password });
          await SignIn({ username, password });
          console.log(data);
          navigate('/');
        } catch (e) {
          console.log(e);
        }
      };
      
    return (
      <SignUpContainer onSubmit={onSubmit} />
  )
};

export const SignUpContainer = ({ onSubmit }) => {
  return (
    <View>
        <Formik initialValues={{ username: '', password: '', passwordConfirmation: '' }} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    </View>
  )
}

export default SignUp;