import {StyleSheet} from 'react-native';
import globalstyle from './globalStyle';
import colors from '../theme/colors';
import {size, weight} from '../theme/fonts';

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: colors.white,
  },
  formRow: {
    ...globalstyle.row,
    paddingBottom: 10,
  },
  loginInput: {
    ...globalstyle.textInput,
    borderRadius: 5,
    width: '100%',
    height: 50,
    //borderColor: colors.borderColor,
    backgroundColor: colors.backgorundColor,
    //borderWidth: 1,
    position: 'relative',
    paddingLeft: 55,
    color: colors.black,
  },
  cardTitle: {
    fontSize: size.font24,
    fontWeight: weight.semi,
    marginBottom: 30,
    textAlign: 'center',
    color: colors.black,
  },
  cardStyle: {
    //backgroundColor: '#F4F6F6',
    paddingHorizontal: 10,
    padding: 10,
  },
  forgetpassword: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  emailIcon: {
    backgroundColor: colors.white,
    position: 'absolute',
    left: 5,
    top: 5,
    padding: 10,
    borderRadius: 5,
  },
  loginButton: {
    paddingTop: 20,
  },
});

export default style;
