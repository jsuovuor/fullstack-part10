import { View, StyleSheet, Button } from 'react-native';
import { useNavigate } from "react-router-native";
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
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
    const [signIn] = useSignIn();
    let navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log(values);
        const { username, password } = values;

        try {
          const { data } = await signIn({ username, password });
          console.log(data);
          navigate('/');
        } catch (e) {
          console.log(e);
        }
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