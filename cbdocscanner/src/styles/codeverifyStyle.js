import {Platform, StyleSheet} from 'react-native';
import colors from '../theme/colors';
import {size, weight} from '../theme/fonts';
import styles from './globalStyle';

const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  screenTitle: {
    fontSize: size.font19,
    fontWeight: weight.bold,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    ...styles.textInput,
    borderRadius: 5,
    width: '100%',
    borderColor: colors.borderColor,
    backgroundColor: colors.gray,
    borderWidth: 1,
    textAlign: 'center',
  },
  formRow: {
    ...styles.row,
    paddingBottom: 10,
    justifyContent: 'center',
  },
  formView: {
    marginHorizontal: 10,
  },
  buttonView: {
    width: '100%',
    //alignItems: 'center',
  },
});

export default style;
