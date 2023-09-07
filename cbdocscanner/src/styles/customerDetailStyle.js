import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../theme/colors';
import metrics from '../theme/metrics';

const styles = StyleSheet.create({
  srcLabel: {
    alignItems: 'center',
  },
  userCardView: {
    //flex: 1,
    height: '35%',
    marginTop: 20,
    //width: metrics.screenWidth,
    marginHorizontal: 20,
    backgroundColor: colors.backgorundColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImageView: {
    //padding: 10,
    //backgroundColor: colors.white,
    //borderRadius: 50,
  },
});

export default styles;
