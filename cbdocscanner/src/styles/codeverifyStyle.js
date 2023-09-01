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
    //marginHorizontal: 10,
    backgroundColor: colors.white,
  },
  screenTitle: {
    fontSize: size.font19,
    fontWeight: weight.bold,
    alignItems: 'center',
    marginBottom: 20,
    color: colors.black,
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
    paddingBottom: 40,
    justifyContent: 'center',
  },
  formView: {
    marginHorizontal: 10,
  },
  buttonView: {
    ...styles.row,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //alignItems: 'center',
  },
});

export default style;
