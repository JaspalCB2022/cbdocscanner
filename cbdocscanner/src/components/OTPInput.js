import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Input from './Input';
import style from '../styles/otpInputStyle';

const OTPInput = props => {
  const {code, setCode, maximumLength, setIsPinReady} = props;
  const inputRef = React.useRef(null);
  const boxArray = new Array(maximumLength).fill(0);
  //console.log('boxArray >>', boxArray);

  const handleOnBlur = () => {};

  const boxDigit = (item, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    return (
      <View style={style.splitBoxes} key={index}>
        <Text style={style.splitBoxText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View>
      {boxArray.map((item, index) => {
        return <Text>{11}</Text>;
      })}
      {/* <View style={style.pressable}>
        {[0, 0, 0, 0].map((item, index) => {
          const emptyInput = '';
          const digit = code[index] || emptyInput;
          return (
            <View style={style.splitBoxes} key={index}>
              <Text style={style.splitBoxText}>{digit}</Text>
            </View>
          );
        })}
      </View> */}
      <Input
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OTPInput;
