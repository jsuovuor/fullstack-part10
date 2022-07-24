import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
    textInputStyle: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: theme.colors.textSecondary,
    },
    textErrorStyle: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#d73a4a',
    },
});

const TextInput = ({ style, error, ...props }) => {
  let usedStyle = styles.textInputStyle;
  if(error) usedStyle = styles.textErrorStyle;

  return <NativeTextInput style={usedStyle} {...props} />;
};

export default TextInput;