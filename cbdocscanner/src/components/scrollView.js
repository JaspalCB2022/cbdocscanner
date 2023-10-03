import React from 'react';
import {ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import style from '../styles/globalStyle';

const ScrollViewWrapper = props => {
  const {
    enableHorizontal,
    verticalScroll = false,
    horizontalScroll = false,
    children,
    style,
  } = props;
  return (
    <KeyboardAwareScrollView
      horizontal={enableHorizontal}
      showsHorizontalScrollIndicator={horizontalScroll}
      showsVerticalScrollIndicator={verticalScroll}
      keyboardShouldPersistTaps={'handled'}
      style={style}
      extraScrollHeight={110}
      {...props}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        {children}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
};

export default ScrollViewWrapper;
