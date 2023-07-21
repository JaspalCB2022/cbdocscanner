import React from 'react';
import AuthStackNavigator from './auth';
import MainBottomTabs from './bottomTab';
import {useSelector} from 'react-redux';
import {selectUserLoginIn} from '../stores/reducers/auth';

const MainAppRouter = props => {
  const userObj = useSelector(selectUserLoginIn);
  console.log('userObj >>', userObj);
  if (userObj.isLoggedIn) {
    return <MainBottomTabs />;
  } else {
    return <AuthStackNavigator />;
  }
};

export default MainAppRouter;
