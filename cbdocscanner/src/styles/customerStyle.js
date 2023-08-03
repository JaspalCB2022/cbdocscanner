import React from 'react';
import {StyleSheet} from 'react-native';
import globalStyle from './globalStyle';
import colors from '../theme/colors';
import {family, size, weight} from '../theme/fonts';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 40,
    width: '100%',
    //borderWidth: 1,
    margin: 5,
    paddingHorizontal: 20,
    fontSize: size.font15,
    fontWeight: weight.semi,
    fontFamily: family.fontFamily,
    //borderColor: '#009688',
    //backgroundColor: '#FFFFFF',
  },

  formRow: {
    ...globalStyle.row,
    ...globalStyle.shadow,
    backgroundColor: colors.white,
    borderRadius: 30,
    marginHorizontal: 30,
    marginVertical: 30,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: 0,
    padding: 10,
    borderRadius: 5,
  },

  flexboxs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  leftbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  badge: {
    backgroundColor: colors.backgorundColor,
    color: '#000',
    fontSize: size.font12,
    fontWeight: weight.semi,
    paddingHorizontal: 5,
    borderRadius: 4,
    marginRight: 10,
  },
  names: {
    flex: 1,
    fontSize: size.font12,
    fontWeight: weight.semi,
    textTransform: 'capitalize',
  },
  rightbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1.5,
  },
  mailbox: {
    flex: 7,
  },
  flexs: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mailtxt: {
    fontSize: 12,
    marginLeft: 8,
  },
  iconarow: {
    flex: 1,
  },
});

export default styles;
