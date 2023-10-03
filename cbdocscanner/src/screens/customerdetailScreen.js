import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Image,
} from 'react-native';
import style from '../styles/globalStyle';
import Label from '../components/label';
import {size} from '../theme/fonts';
import styles from '../styles/customerDetailStyle';
import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateComponent from '../components/dateComponent';
import TimeComponent from '../components/timeComponent';
import globalStyle from '../styles/globalStyle';
import Button from '../components/button';
import {
  dbMailStatusEnum,
  dbmailStatusColor,
  mailStatusColor,
  mailStatusEnum,
} from '../utils/constent';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCustomerDetail,
  selectCustomerDetail,
  selectLoading,
  selectUserObject,
} from '../stores/reducers/auth';
import {
  getStringFormDateHandler,
  getStringFromTimeHandler,
} from '../utils/helper';
import ScrollViewWrapper from '../components/scrollView';

const CustomerDetailScreen = props => {
  const {route, navigation} = props;
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObject);
  const customerDetail = useSelector(selectCustomerDetail);
  const loading = useSelector(selectLoading);
  const [refreshing, setRefreshing] = React.useState(false);

  const customerid = route?.params?.customerid;
  //console.log('customerDetail >>', customerDetail);
  const getCustomerDetailHandler = () => {
    setRefreshing(true);
    //console.log('function Call start');
    const headers = {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userObj.token,
    };
    let formData = new FormData();
    formData.append('customer_id', customerid);
    const tempObj = {data: formData, headers: headers};
    dispatch(fetchCustomerDetail(tempObj));
    setRefreshing(false);
  };

  const navigateFileViewScreen = item => {
    navigation.navigate('fileview', {mailobj: item});
  };

  React.useEffect(() => {
    getCustomerDetailHandler();
  }, []);

  const ItemView = ({item, index}) => {
    //console.log('item >>', item);
    const datestr = getStringFormDateHandler(item.pdf_updated_at);
    const timestr = getStringFromTimeHandler(item.pdf_updated_at);
    return (
      <View key={index} style={{marginTop: 12, marginBottom: 15}}>
        <View
          style={{
            ...globalStyle.shadow,
            backgroundColor: colors.white,
            padding: 10,
            marginHorizontal: 20,
            borderRadius: 5,
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <DateComponent
                datestring={datestr}
                fontcolor={'#7E7F86'}
                fontsize={size.font12}
              />
              <View style={{marginLeft: 20}}>
                <TimeComponent
                  timestring={timestr}
                  fontcolor={'#7E7F86'}
                  fontsize={size.font12}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: dbmailStatusColor[item.status],
                  paddingHorizontal: 15,
                  paddingVertical: 9,
                  borderRadius: 5,
                }}>
                <Label
                  title={dbMailStatusEnum[item.status]}
                  color={colors.white}
                  fontsize={size.font12}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  marginLeft: 0,
                }}>
                <Button
                  onPress={() => navigateFileViewScreen(item)}
                  title={'View'}
                  iconname={'eye'}
                  customStyle={true}
                  textSize={size.font13}
                  iconsize={16}
                  textColor={colors.primary}
                  iconcolor={colors.primary}
                  bgColor={'transparent'}
                  customButtonStyle={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const mailBoxEmptyView = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Label title={'No Mail found.'} color={'#F35B5B'} />
      </View>
    );
  };

  return (
    <View style={style.container}>
      {loading ? (
        <ActivityIndicator color={colors.primary} size={'large'} />
      ) : (
        <>
          <View style={styles.userCardView}>
            <View style={styles.userImageView}>
              {customerDetail?.customer_data?.customer_photo_url ? (
                <Image
                  source={{
                    uri: customerDetail?.customer_data?.customer_photo_url,
                  }}
                  style={{
                    height: 90,
                    width: 90,
                    resizeMode: 'contain',
                    borderRadius: 50,
                  }}
                />
              ) : (
                <Icon
                  name={'account'}
                  size={80}
                  color={colors.gray}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 50,
                    padding: 5,
                  }}
                />
              )}
            </View>
            <View style={{marginTop: 20}}>
              <Label
                title={customerDetail?.customer_data?.customer_name}
                fontsize={size.font20}
                color={colors.primary}
              />
            </View>

            <View
              style={{
                ...style.row,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                //flexWrap: 'wrap',
              }}>
              {customerDetail?.customer_data?.customer_email_1 && (
                <View
                  style={{
                    width: customerDetail?.customer_data?.customer_email_2
                      ? '50%'
                      : '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      ...style.row,
                      alignItems: 'center',
                      backgroundColor: colors.white,
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Icon
                      name={'email'}
                      size={16}
                      color={colors.primary}
                      style={{marginRight: 5}}
                    />
                    <Label
                      title={customerDetail?.customer_data?.customer_email_1}
                      fontsize={size.font13}
                      enablecapitalize={false}
                    />
                  </View>
                </View>
              )}
              {customerDetail?.customer_data?.customer_email_2 && (
                <View
                  style={{
                    width: customerDetail?.customer_data?.customer_email_1
                      ? '50%'
                      : '100%',
                    flexDirection: 'column',
                    marginLeft: 10,
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      ...style.row,
                      alignItems: 'center',
                      backgroundColor: colors.white,
                      padding: 10,
                      borderRadius: 5,
                    }}>
                    <Icon
                      name={'email'}
                      size={14}
                      color={colors.primary}
                      style={{marginRight: 5}}
                    />
                    <Label
                      title={customerDetail?.customer_data?.customer_email_2}
                      fontsize={size.font13}
                      enablecapitalize={false}
                    />
                  </View>
                </View>
              )}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 20,
              marginTop: 20,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '50%',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Label title={`Mail History `} fontsize={size.font18} />
            </View>
            <View style={{width: '50%', flexDirection: 'column'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '',
                }}>
                <Icon
                  name={'mailbox'}
                  size={20}
                  color={'#A3A5AE'}
                  style={{marginRight: 5}}
                />
                <Label
                  title={`MailBox No.`}
                  fontsize={size.font14}
                  color={'#A3A5AE'}
                />
                <View style={{marginLeft: 10}}>
                  <Label
                    title={`${
                      customerDetail?.customer_data?.mail_box_number
                        ? customerDetail?.customer_data?.mail_box_number
                        : 0
                    } `}
                    fontsize={size.font16}
                    color={colors.black}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* Mail History */}

          <FlatList
            data={customerDetail.Mail_history}
            keyExtractor={(item, index) => index.toString()}
            //ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
            style={{marginBottom: 40}}
            ListEmptyComponent={mailBoxEmptyView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={getCustomerDetailHandler}
              />
            }
          />
        </>
      )}
    </View>
  );
};

export default CustomerDetailScreen;
