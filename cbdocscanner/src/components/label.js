import React from 'react';
import {Text} from 'react-native';
import style from '../styles/globalStyle';
import colors from '../theme/colors';
import {size} from '../theme/fonts';

const Label = props => {
  const {
    title,
    color = colors.black,
    fontsize = size.font16,
    textAlign = 'left',
  } = props;
  return (
    <Text
      style={{
        ...style.labelText,
        color: color,
        fontSize: fontsize,
        textAlign: textAlign,
      }}>
      {title}
    </Text>
  );
};

export default Label;
