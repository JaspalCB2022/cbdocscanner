import React from 'react';
import {View, Text} from 'react-native';
import Label from './label';
import style from '../styles/globalStyle';
import {size, weight} from '../theme/fonts';
import ScrollViewWrapper from './scrollView';
import CustomCard from './card';
import Button from './button';
import colors from '../theme/colors';

const CustomerHistory = props => {
  const {headerTitle, navigation} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginHorizontal: 20,
        marginTop: 20,
      }}>
      <Label
        title={headerTitle}
        fontsize={size.font16}
        fontWeight={weight.semi}
        enablecapitalize={false}
      />
    </View>
  );
};

export default CustomerHistory;
