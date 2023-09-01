import React from 'react';
import {StyleSheet, Appearance} from 'react-native';
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
    height: 35,
    width: '100%',
    //borderWidth: 1,
    margin: 0,
    paddingHorizontal: 20,
    fontSize: size.font12,
    fontWeight: weight.semi,
    fontFamily: family.fontFamily,
    color: colors.black,
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
    top: 5,
    padding: 3,
    borderRadius: 5,
  },

  flexboxs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sendflexboxs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
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
    color: colors.black,
  },
  rightbox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  sendnames: {
    flex: 1,
    fontSize: size.font14,
    color: colors.black,
    fontWeight: weight.bold,
    textTransform: 'capitalize',
  },

  sendrightbox: {
    //display: 'flex',
    //flexDirection: 'row',
    alignItems: 'flex-end',
    //flex: 1,
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
    fontSize: size.font12,
    marginLeft: 8,
    flex: 1,
    color: colors.black,
  },
  iconarow: {
    flex: 1,
  },
  sendContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  sendrowShadow: {
    ...globalStyle.shadow,
    backgroundColor: colors.white,
    padding: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default styles;
