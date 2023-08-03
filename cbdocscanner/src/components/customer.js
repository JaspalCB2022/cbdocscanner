import React from 'react';
import {View, Text, Pressable} from 'react-native';

const CustomerComponent = props => {
  return (
    <View>
      <Pressable
        style={{
          backgroundColor: 'rgb(16, 129, 144)',
          padding: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{color: '#fff', fontWeight: '700'}}>{`Customer First`}</Text>
      </Pressable>
    </View>
  );
};

export default CustomerComponent;
