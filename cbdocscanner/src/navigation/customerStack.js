import React from 'react';
import {View, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/profileScreen';
import CustomersScreen from '../screens/customerScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import CustomerDetailScreen from '../screens/customerdetailScreen';
import {family} from '../theme/fonts';
import CustomerFileView from '../screens/customerFileView';
import OpenFileViewer from '../screens/OpenFileViewer';

const Stack = createStackNavigator();

function MyCustomerStack() {
  return (
    <Stack.Navigator initialRouteName="customers">
      <Stack.Screen
        name="customers"
        component={CustomersScreen}
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: 'Customers',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: family.fontFamily,
          },
          headerRight: () => (
            <View style={{marginRight: 20}}>
              <Pressable
                onPress={
                  getFocusedRouteNameFromRoute(route) !== 'profile'
                    ? () => navigation.navigate('profile')
                    : () => {}
                }>
                <Icon name={'account-circle'} size={30} color={colors.black} />
              </Pressable>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profile',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: family.fontFamily,
          },
        }}
      />
      {/* <Stack.Screen
        name="sendtocustomer"
        component={SendToCustomerScreen}
        options={{headerTitle: ''}}
      /> */}
      <Stack.Screen
        name="customerdetail"
        component={CustomerDetailScreen}
        options={{
          headerTitle: 'Customer Details',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: family.fontFamily,
          },
        }}
      />
      <Stack.Screen
        name="fileview"
        component={CustomerFileView}
        options={{
          headerTitle: 'File View',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: family.fontFamily,
          },
        }}
      />
      <Stack.Screen
        name="openfileview"
        component={OpenFileViewer}
        options={{
          headerTitle: '',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: family.fontFamily,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default MyCustomerStack;
