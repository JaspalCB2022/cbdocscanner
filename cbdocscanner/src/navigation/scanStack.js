import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ScannedDocumentScreen from '../screens/scaneDocScreen';
import ViewDocumentScreen from '../screens/viewDocScreen';
import SendToCustomerScreen from '../screens/sendToCustomerScreen';
const Stack = createStackNavigator();
function MyScanStack() {
  return (
    <Stack.Navigator initialRouteName="scannedoc">
      <Stack.Screen
        name="scannedoc"
        component={ScannedDocumentScreen}
        options={{headerShown: false}}
        initialParams={{document_id: 0}}
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
