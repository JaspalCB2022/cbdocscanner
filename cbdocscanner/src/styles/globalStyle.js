import {Platform, StyleSheet} from 'react-native';
import colors from '../theme/colors';
import {size, weight} from '../theme/fonts';

const style = StyleSheet.create({
  textInput: {
    padding: Platform.OS === 'android' ? 5 : 10,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: colors.buttonBackgrounColor,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: size.font16,
    fontWeight: weight.semi,
  },
  labelText: {
    fontSize: size.font16,
    color: colors.black,
    fontWeight: weight.semi,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default style;
