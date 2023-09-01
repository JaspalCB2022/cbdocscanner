import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {family, size, weight} from '../theme/fonts';

const TimeComponent = props => {
  const {
    timestring,
    fontsize = size.font14,
    fontcolor = colors.black,
    iconcolor = colors.cardIconColor,
    iconsize = 16,
  } = props;
  return (
    <View style={styles.timerow}>
      <Icon
        name={'clock-time-five-outline'}
        size={iconsize}
        color={iconcolor}
        style={{marginRight: 2, opacity: 0.7}}
      />
      <Text
        style={{
          //fontFamily: family.fontFamily,
          fontSize: fontsize,
          color: fontcolor,
          fontWeight: weight.semi,
        }}>
        {`${timestring}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimeComponent;
