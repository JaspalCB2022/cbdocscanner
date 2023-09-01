import React from 'react';
import {Image} from 'react-native';
import splash_logo from '../assets/Images/splash_logo.png';

export const SplashLogoImage = props => {
  return <Image source={splash_logo} {...props} />;
};
