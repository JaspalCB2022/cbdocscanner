import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/profileScreen';
import ScannedDocumentScreen from '../screens/scaneDocScreen';
import Icons from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import Label from '../components/label';
import style from '../styles/globalStyle';
import MyHomeStack from './homeStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import MyScanStack from './scanStack';

const Tab = createBottomTabNavigator();

function MyBottomNavigatior() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          ...style.shadow,
          //borderTopWidth: 1,
          //elevation: 0,
          padding: 7,
          showLabel: false,
          height: 55,
          borderTopWidth: 0,
          elevation: 20,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={MyHomeStack}
        options={({route}) => ({
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icons name="home" color={color} size={size} />
          ),
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            console.log(routeName);
            if (routeName === 'history') {
              return {display: 'none'};
            }
            return;
          })(route),
        })}
      />
      <Tab.Screen
        name="scannedoc"
        component={MyScanStack}
        options={({route}) => ({
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <View
              style={{
                position: 'absolute',
                bottom: 0, // space from bottombar
                height: 80,
                width: 80,
                borderRadius: 68,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.buttonBackgrounColor,
                borderRadius: 50,
              }}>
              <MaterialCommunityIcons
                name="line-scan"
                color={colors.white}
                size={25}
                style={{marginBottom: 10}}
              />
              <Label title="SCAN" color={colors.white} fontsize={12} />
            </View>
          ),
          tabBarStyle: (route => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
            console.log(routeName);
            if (routeName === 'viewdoc' || routeName === 'sendtocustomer') {
              return {display: 'none'};
            }
            return;
          })(route),
        })}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icons name="users" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MyBottomNavigatior;
