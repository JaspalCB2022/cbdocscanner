import React from 'react';
import AuthStackNavigator from './auth';
import {useSelector} from 'react-redux';
import {selectUserLoginIn} from '../stores/reducers/auth';
import MyBottomNavigatior from './bottomTab';

const MainAppRouter = props => {
  const isLogin = useSelector(selectUserLoginIn);
  if (isLogin) {
    return <MyBottomNavigatior />;
  } else {
    return <AuthStackNavigator />;
  }
};

export default MainAppRouter;
