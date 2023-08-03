import React from 'react';
import {Text} from 'react-native';
import style from '../styles/globalStyle';
import colors from '../theme/colors';
import {family, size, weight} from '../theme/fonts';

const Label = props => {
  const {
    title,
    color = colors.black,
    fontsize = size.font16,
    textAlign = 'left',
    fontWeight = weight.normal,
    opacity = 1,
  } = props;
  return (
    <Text
      style={{
        ...style.labelText,
        color: color,
        fontSize: fontsize,
        textAlign: textAlign,
        fontFamily: family.fontFamily,
        fontWeight: fontWeight,
        opacity: opacity,
        textTransform: 'capitalize',
        flexWrap: 'wrap',
        flexShrink: 1,
        ...style.width,
      }}>
      {title}
    </Text>
  );
};

export default Label;
