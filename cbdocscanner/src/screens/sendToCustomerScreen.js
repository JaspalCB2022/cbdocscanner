import React from 'react';
import {View, Text} from 'react-native';
import colors from '../theme/colors';

const SendToCustomerScreen = props => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
      }}>
      <Text>{'Send To Customer Screen'}</Text>
    </View>
  );
};

export default SendToCustomerScreen;
