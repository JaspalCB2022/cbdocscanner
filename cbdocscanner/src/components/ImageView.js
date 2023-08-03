import React from 'react';
import {View, Image} from 'react-native';

const ImageView = props => {
  const {url, imagestyle} = props;
  return (
    <Image source={{uri: url}} style={imagestyle} resizeMode={'contain'} />
  );
};

export default ImageView;
