import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();
      const initialValues = { username: '', password: '' };
      const { getByTestId } = render(<SignInContainer initialValues={initialValues} onSubmit={onSubmit}/>);

      fireEvent.changeText(getByTestId('username'), 'kalle');
      fireEvent.changeText(getByTestId('password'), 'password');
      fireEvent.press(getByTestId('submit'));

      await waitFor(() => {
        expect(onSubmit.mock.calls[0][0]).toEqual({
            username: 'kalle',
            password: 'password',
          });
      });
    });
  });
});