import React from 'react';
import {View, Text, RefreshControl, ActivityIndicator} from 'react-native';
import style from '../styles/globalStyle';
import CustomerHistory from '../components/customerHistory';
import ScrollViewWrapper from '../components/scrollView';
import CustomCard from '../components/card';
import Button from '../components/button';
import colors from '../theme/colors';
import {size} from '../theme/fonts';
import History from '../components/history';
import {demoData} from '../utils/history_TempData';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchScanerCustomerList,
  fetchScanerProfile,
  selectCustomerHistory,
  selectLoading,
  selectUserObject,
} from '../stores/reducers/auth';
import Label from '../components/label';

const HomeScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObject);
  const customerHistory = useSelector(selectCustomerHistory);
  const loading = useSelector(selectLoading);
  const [refreshing, setRefreshing] = React.useState(false);

  const naviateToAllHistoryHandler = () => {
    navigation.navigate('history');
  };

  const getCustomerHistoryHandler = async () => {
    setRefreshing(true);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + userObj.token,
    };
    dispatch(fetchScanerCustomerList(headers));
    setRefreshing(false);
  };

  const getScanerProfile = () => {
    const headers = {Authorization: 'Bearer ' + userObj.token};
    dispatch(fetchScanerProfile(headers));
  };

  React.useEffect(() => {
    getCustomerHistoryHandler();
    getScanerProfile();
  }, []);

  return (
    <View style={style.container}>
      {/* <CustomerHistory headerTitle={'Today`s Scan History'} /> */}
      <ScrollViewWrapper
        style={{marginTop: 20, marginBottom: 47}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getCustomerHistoryHandler}
          />
        }>
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : (
          <>
            {customerHistory?.customer_data?.length > 0 ? (
              <>
                <History
                  data={customerHistory.customer_data}
                  navigation={navigation}
                />
              </>
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginVertical: 40,
                }}>
                <Label
                  title={'No History Found.'}
                  color={'#F35B5B'}
                  enablecapitalize={false}
                />
              </View>
            )}
            <View style={{paddingHorizontal: 10, marginTop: 20}}>
              <Button
                onPress={naviateToAllHistoryHandler}
                title={'View All History'}
                iconname={'history'}
                iconcolor={colors.primary}
                iconsize={16}
                bgColor={'transparent'}
                textColor={colors.primary}
                textSize={size.font14}
                customStyle={true}
                customButtonStyle={{paddingVertical: 10}}
              />
            </View>
          </>
        )}
      </ScrollViewWrapper>
    </View>
  );
};

export default HomeScreen;
