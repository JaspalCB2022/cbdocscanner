import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyle from './globalStyle';
import colors from '../theme/colors';

const style = StyleSheet.create({
  container: {
    ...globalStyle.row,
    ...globalStyle.shadow,
    //flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.white, //colors.backgorundColor,
    marginBottom: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  namerow: {
    ...globalStyle.row,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  nameIcon: {
    backgroundColor: colors.cardIconColor,
    padding: 3,
    borderRadius: 50,
    marginRight: 7,
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
  mailboxView: {
    backgroundColor: colors.backgorundColor,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  mailStatusView: {
    backgroundColor: colors.backgorundColor,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 3,
    marginLeft: 30,
  },
});

export default style;
