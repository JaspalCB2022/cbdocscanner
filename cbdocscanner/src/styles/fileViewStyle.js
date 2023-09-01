import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyle from './globalStyle';
import colors from '../theme/colors';

const style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pdflist: {
    marginTop: 10,
    ...globalStyle.shadow,
    backgroundColor: colors.white,
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
  },
  namerow: {
    ...globalStyle.row,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headerRow: {
    ...globalStyle.row,
  },
  dateRow: {
    ...globalStyle.row,
    alignItems: 'center',
  },
  timeRow: {
    ...globalStyle.row,
    alignContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
});

export default style;
