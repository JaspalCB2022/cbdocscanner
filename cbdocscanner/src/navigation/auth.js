import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/loginScreen';
import forgetPasswordScreen from '../screens/forgetpasswordScreen';
import React from 'react';
import CodeVerficationScreen from '../screens/codeverifyScreen';
import ForgetPasswordScreen from '../screens/forgetpasswordScreen';

const AuthStack = createStackNavigator();
function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerStyle: {},
      }}>
      <AuthStack.Screen
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="forgetpassward"
        component={ForgetPasswordScreen}
        options={{title: ''}}
      />
      <AuthStack.Screen
        name="codeverify"
        component={CodeVerficationScreen}
        options={{title: ''}}
      />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigator;
