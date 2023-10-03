import React from 'react';

import {
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import style from '../styles/globalStyle';
import History from '../components/history';
import ScrollViewWrapper from '../components/scrollView';
import {
  fetchScanerAllCustomerList,
  fetchScanerCustomerList,
  historyObj,
  selectAllHistory,
  selectCustomerHistory,
  selectLoading,
  selectUserObject,
} from '../stores/reducers/auth';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../components/button';
import {getApi} from '../services/api';
import ApiURL from '../services/apiURL';
import colors from '../theme/colors';
import Label from '../components/label';

const HistoryScreen = props => {
  const dispatch = useDispatch();
  const allHistory = useSelector(selectAllHistory);
  const historyList = useSelector(historyObj);
  const userObj = useSelector(selectUserObject);
  const [refreshing, setRefreshing] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [moreData, setMoreData] = React.useState(false);

  const [history, setHistory] = React.useState({
    customer_data: [],
    totalPage: 0,
    count: 0,
  });

  //console.log('historyList >>', history);

  const getCustomerHistoryHandler = async () => {
    loadData(1);
    //setRefreshing(false);
  };

  const loadData = async pageno => {
    try {
      setRefreshing(true);
      setLoading(true);
      const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userObj.token,
      };
      const response = await getApi(
        ApiURL.getstaffdetailswithcustomerimages +
          '/?all_history=true&page=' +
          pageno,
        headers,
      );
      if (response.status === 200) {
        const updatedHistory = {...history};
        if (response.data.data.customer_data.length > 0) {
          if (pageno === 1) {
            updatedHistory.customer_data = response.data.data.customer_data;
          } else {
            updatedHistory.customer_data = [
              ...updatedHistory.customer_data,
              ...response.data.data.customer_data,
            ];
          }

          updatedHistory.totalPage = response.data.data.total_pages;
          updatedHistory.count = parseInt(response.data.data.total_records);
          setHistory(updatedHistory);
        }
      }
      // if (response.status === 200) {
      //   const temphistory = {...history};
      //   if (response.data.data.customer_data.length > 0) {
      //     if (history.count > history.customer_data.length) {
      //       temphistory.customer_data = [
      //         ...temphistory.customer_data,
      //         ...response.data.data.customer_data,
      //       ];
      //     }

      //     temphistory.totalPage = response.data.data.total_pages;
      //     temphistory.count = parseInt(response.data.data.total_records);
      //     //setMoreData(false);
      //     setLoading(false);

      //     setHistory(temphistory);
      //   } else {
      //     setLoading(false);
      //   }
      // }
    } catch (err) {
      //console.log('err>', err);
      //setHistory({customer_data: []});
      setLoading(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const loadMore = () => {
    if (page < history.totalPage) {
      setPage(page + 1);
    }
  };

  React.useEffect(() => {
    loadData(page);
  }, [page]);

  return (
    <View style={style.container}>
      {history?.customer_data.length == 0 && loading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
      ) : (
        <View style={{marginTop: 5}}>
          <ScrollViewWrapper
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getCustomerHistoryHandler}
              />
            }>
            <>
              {history?.customer_data.length == 0 ? (
                <View
                  style={{
                    //flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 40,
                  }}>
                  <Label
                    title={'No History Found.'}
                    color={'#F35B5B'}
                    enablecapitalize={false}
                  />
                </View>
              ) : (
                <>
                  <History data={history?.customer_data} {...props} />
                  {history.count > history.customer_data.length && (
                    <View
                      style={{justifyContent: 'center', marginHorizontal: 10}}>
                      <Button
                        //iconname={'arrow-right'}
                        title={loading ? 'Loading...' : 'Load More'}
                        onPress={loadMore}
                        loading={loading}
                      />
                    </View>
                  )}
                </>
              )}
            </>
          </ScrollViewWrapper>
        </View>
      )}
    </View>
  );
};

export default HistoryScreen;
