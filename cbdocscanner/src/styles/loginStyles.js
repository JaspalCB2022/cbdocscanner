import {StyleSheet} from 'react-native';
import globalstyle from './globalStyle';
import colors from '../theme/colors';
import {size, weight} from '../theme/fonts';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  formRow: {
    ...globalstyle.row,
    paddingBottom: 10,
  },
  loginInput: {
    ...globalstyle.textInput,
    borderRadius: 5,
    width: '100%',
    borderColor: colors.borderColor,
    backgroundColor: colors.gray,
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: size.font24,
    fontWeight: weight.semi,
    marginBottom: 30,
    textAlign: 'center',
  },
  cardStyle: {
    backgroundColor: '#F4F6F6',
    paddingHorizontal: 10,
    padding: 10,
  },
  forgetpassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
});

export default style;
