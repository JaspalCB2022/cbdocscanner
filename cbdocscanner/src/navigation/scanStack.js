import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import CustomersScreen from '../screens/customerScreen';
import CustomerDetailScreen from '../screens/customerdetailScreen';
import HistoryScreen from '../screens/historyScreen';
import ScannedDocumentScreen from '../screens/scaneDocScreen';
import ViewDocumentScreen from '../screens/viewDocScreen';
import SendToCustomerScreen from '../screens/sendToCustomerScreen';

const Stack = createStackNavigator();

function MyScanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="scannedoc"
        component={ScannedDocumentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="viewdoc"
        component={ViewDocumentScreen}
        options={{headerTitle: ''}}
      />
      <Stack.Screen
        name="sendtocustomer"
        component={SendToCustomerScreen}
        options={{headerTitle: ''}}
      />
    </Stack.Navigator>
  );
}

export default MyScanStack;
