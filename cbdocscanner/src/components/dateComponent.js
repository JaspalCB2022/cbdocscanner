import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {family, size, weight} from '../theme/fonts';

const DateComponent = props => {
  const {
    datestring,
    fontsize = size.font14,
    fontcolor = colors.black,
    iconcolor = colors.cardIconColor,
    iconsize = 16,
  } = props;
  return (
    <View style={styles.daterow}>
      <Icon
        name={'calendar-month'}
        size={iconsize}
        color={iconcolor}
        style={{marginRight: 2, opacity: 0.7}}
      />
      <Text
        style={{
          fontFamily: family.fontFamily,
          fontSize: fontsize,
          color: fontcolor,
          fontWeight: weight.bold,
        }}>
        {datestring}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  daterow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DateComponent;
