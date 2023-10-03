import React from 'react';
import {View, Pressable, Image, TouchableOpacity} from 'react-native';
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
import {useSelector} from 'react-redux';
import {selectUserProfile} from '../stores/reducers/auth';
import AddCustomer from '../screens/addCustomerScreen';

const Stack = createStackNavigator();

function MyCustomerStack() {
  const userProfile = useSelector(selectUserProfile);

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
          headerRight: () => {
            return (
              <View style={{marginRight: 20}}>
                <TouchableOpacity
                  onPress={
                    getFocusedRouteNameFromRoute(route) !== 'profile'
                      ? () => navigation.navigate('profile')
                      : () => {}
                  }>
                  {userProfile?.user_photo ? (
                    <Image
                      source={{uri: userProfile?.user_photo}}
                      style={{
                        height: 30,
                        width: 30,
                        resizeMode: 'contain',
                        borderRadius: 50,
                      }}
                    />
                  ) : (
                    <Icon
                      name={'account-circle'}
                      size={30}
                      color={colors.black}
                    />
                  )}
                </TouchableOpacity>
              </View>
            );
          },
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
      <Stack.Screen
        name="addcustomer"
        component={AddCustomer}
        options={{
          headerTitle: 'Add Customer',
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
