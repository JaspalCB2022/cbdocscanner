import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyle from './globalStyle';
import colors from '../theme/colors';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  formRow: {
    ...globalStyle.row,
    paddingBottom: 10,
  },
  loginInput: {
    ...globalStyle.textInput,
    borderRadius: 5,
    width: '100%',
    height: 50,
    //borderColor: colors.borderColor,
    backgroundColor: colors.backgorundColor,
    //borderWidth: 1,
    position: 'relative',
    //paddingLeft: 55,
    color: colors.black,
  },
  viewSpace: {
    marginBottom: 5,
  },
});

export default style;
