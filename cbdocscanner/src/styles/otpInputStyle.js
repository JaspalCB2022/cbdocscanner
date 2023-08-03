import {StyleSheet} from 'react-native';
import {size} from '../theme/fonts';

const style = StyleSheet.create({
  view: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  splitBoxes: {
    borderColor: '#e5e5e5',
    borderWidth: '2px',
    borderRadius: '5px',
    padding: '12px',
    width: '50px',
  },
  pressable: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  splitBoxText: {
    fontSize: size.font20,
    textAlign: 'center',
    color: '#e5e5e5',
  },
});

export default style;
