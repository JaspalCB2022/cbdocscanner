import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from '../styles/globalStyle';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../theme/colors';

const Button = props => {
  const {iconname, title, onPress} = props;
  return (
    <Pressable style={style.button} onPress={onPress}>
      {iconname ? (
        <View style={style.row}>
          <Text style={style.buttonText}>{title}</Text>
          {/* <Icon name={iconname} size={20} color={colors.black} /> */}
        </View>
      ) : (
        <Text style={style.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

export default Button;
