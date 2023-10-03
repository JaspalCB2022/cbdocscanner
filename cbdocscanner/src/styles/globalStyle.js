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
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: size.font16,
    fontWeight: weight.semi,
    color: colors.white,
  },
  labelText: {
    fontSize: size.font16,
    color: colors.black,
    fontWeight: weight.low,
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
  listItem: {
    backgroundColor: '#EAF2F8',
    //paddingHorizontal: 10,
    marginVertical: 8,
    textAlign: 'center',
    //marginHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default style;
