import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/homeScreen';
import ProfileScreen from '../screens/profileScreen';
import CustomersScreen from '../screens/customerScreen';
import CustomerDetailScreen from '../screens/customerdetailScreen';
import HistoryScreen from '../screens/historyScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import {family} from '../theme/fonts';
import CustomerFileView from '../screens/customerFileView';
import OpenFileViewer from '../screens/OpenFileViewer';
import {useSelector} from 'react-redux';
import {selectUserProfile} from '../stores/reducers/auth';

const Stack = createStackNavigator();

function MyHomeStack() {
  const userProfile = useSelector(selectUserProfile);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({route, navigation}) => ({
          headerShown: true,
          headerTitle: `Today's Scan history`,
          headerTitleStyle: {
            fontFamily: family.fontFamily,
          },
          headerRight: () => {
            return (
              <View style={{marginRight: 20}}>
                <Pressable
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
                </Pressable>
              </View>
            );
          },
        })}
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
        name="history"
        component={HistoryScreen}
        options={{
          headerTitle: 'All History',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: family.fontFamily,
          },
        }}
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

export default MyHomeStack;
