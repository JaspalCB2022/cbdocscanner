import React from 'react';
import {
  Pressable,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import style from '../styles/globalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {size} from '../theme/fonts';

const Button = props => {
  const {
    iconname,
    title,
    onPress,
    width = '100%',
    iconcolor = colors.white,
    iconsize = 20,
    bgColor = colors.primary,
    textColor = colors.white,
    borderColor = colors.primary,
    customStyle = false,
    customButtonStyle = null,
    textSize = size.font16,
    loading = false,
  } = props;
  return (
    <TouchableOpacity
      style={{
        ...style.button,
        width: width,
        backgroundColor: bgColor,
        borderWidth: 1,
        borderColor: borderColor,
        ...(customStyle && customButtonStyle),
      }}
      onPress={loading ? () => {} : onPress}>
      {loading ? (
        <>
          <ActivityIndicator size={'small'} color={textColor} />
        </>
      ) : (
        <>
          {iconname ? (
            <View
              style={{
                ...style.row,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name={iconname} size={iconsize} color={iconcolor} />
              <Text
                style={{
                  ...style.buttonText,
                  marginLeft: 5,
                  color: textColor,
                  fontSize: textSize,
                }}>
                {title}
              </Text>
            </View>
          ) : (
            <Text style={style.buttonText}>{title}</Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
