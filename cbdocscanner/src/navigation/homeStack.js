import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import CustomersScreen from '../screens/customerScreen';
import CustomerDetailScreen from '../screens/customerdetailScreen';
import HistoryScreen from '../screens/historyScreen';

const Stack = createStackNavigator();

function MyHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="customerdetail" component={CustomerDetailScreen} />
      <Stack.Screen
        name="history"
        component={HistoryScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
}

export default MyHomeStack;
