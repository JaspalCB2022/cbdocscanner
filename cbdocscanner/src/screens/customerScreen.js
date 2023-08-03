import React from 'react';
import {View, Text} from 'react-native';

const tempObj = [
  {id: 1, name: 'Jack', email: 'jack123@gmail.com'},
  {id: 2, name: 'Anjali', email: 'anjali123@chai.com'},
  {id: 3, name: 'Mohan Rao', email: 'mohalrao123@chai.com'},
  {id: 4, name: 'Kaljaon', email: 'kaljaon123@gmail.com'},
];

const CustomersScreen = () => {
  return (
    <View>
      {tempObj.map(item => {
        return (
          <View>
            <Text>{1}</Text>
            <Text>{1}</Text>
            <Text>{1}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default CustomersScreen;
