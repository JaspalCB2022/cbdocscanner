import React from 'react';
import {View, Text} from 'react-native';
import ScannerComponent from '../components/scanner';

const HomeScreen = props => {
  return (
    <View>
      <Text>{'Home Screen'}</Text>
      <ScannerComponent />
    </View>
  );
};

export default HomeScreen;
