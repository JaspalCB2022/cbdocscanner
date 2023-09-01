import React from 'react';

import {View, Text, ActivityIndicator, RefreshControl} from 'react-native';
import style from '../styles/globalStyle';
import CustomerHistory from '../components/customerHistory';
import {demoData} from '../utils/history_TempData';
import History from '../components/history';
import ScrollViewWrapper from '../components/scrollView';
import {
  fetchScanerAllCustomerList,
  fetchScanerCustomerList,
  selectAllHistory,
  selectCustomerHistory,
  selectLoading,
  selectUserObject,
} from '../stores/reducers/auth';
import {useDispatch, useSelector} from 'react-redux';

const HistoryScreen = props => {
  const dispatch = useDispatch();
  const allHistory = useSelector(selectAllHistory);
  const userObj = useSelector(selectUserObject);
  const loading = useSelector(selectLoading);
  const [refreshing, setRefreshing] = React.useState(false);

  const getCustomerHistoryHandler = async () => {
    setRefreshing(true);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userObj.token,
    };
    dispatch(fetchScanerAllCustomerList(headers));
    setRefreshing(false);
  };

  React.useEffect(() => {
    getCustomerHistoryHandler();
  }, []);

  return (
    <View style={style.container}>
      {loading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <View style={{marginTop: 5}}>
          <ScrollViewWrapper
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getCustomerHistoryHandler}
              />
            }>
            <History data={allHistory?.customer_data} {...props} />
          </ScrollViewWrapper>
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;
