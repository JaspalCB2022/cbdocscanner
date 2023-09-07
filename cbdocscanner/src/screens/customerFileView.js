import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import style from '../styles/fileViewStyle';
import Label from '../components/label';
import {
  dbMailStatusEnum,
  dbmailStatusColor,
  fileType,
  threadType,
} from '../utils/constent';
import colors from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCustomerEmailThreadDetail,
  selectCustomerMailThread,
  selectLoading,
  selectUserObject,
} from '../stores/reducers/auth';
import {MailThreadComponent} from '../components/Thread';
import ScrollViewWrapper from '../components/scrollView';

const CustomerFileView = props => {
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObject);
  const loading = useSelector(selectLoading);
  const emailThreadObj = useSelector(selectCustomerMailThread);
  const [refreshing, setRefreshing] = React.useState(false);
  const {route, navigation} = props;
  const mailObject = route.params.mailobj;
  //console.log('emailThreadObj >>', emailThreadObj);

  const ViewPDFFileHandler = (fileurl, filetype) => {
    navigation.navigate('openfileview', {fileurl: fileurl, filetype: filetype});
  };

  const getMailThreadHandler = () => {
    setRefreshing(true);
    const headers = {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + userObj.token,
    };
    let formData = new FormData();
    formData.append('document_id', mailObject.document_id);
    const tempObj = {data: formData, headers: headers};
    dispatch(fetchCustomerEmailThreadDetail(tempObj));
    setRefreshing(false);
  };

  React.useEffect(() => {
    getMailThreadHandler();
  }, []);

  return (
    <View style={style.mainView}>
      <ScrollViewWrapper
        style={{marginTop: 20}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getMailThreadHandler}
          />
        }>
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.primary} />
        ) : (
          <>
            {Object.keys(emailThreadObj).length > 0 &&
            emailThreadObj?.threads.length > 0 ? (
              <>
                {/* <MailThreadComponent
                  item={{
                    ...emailThreadObj?.document,
                    message:
                      emailThreadObj?.document?.current_status ===
                      dbMailStatusEnum.Pending
                        ? `Postal email sent to ${emailThreadObj?.customer_full_name} by the MailBox, waiting for response.`
                        : `${emailThreadObj?.customer_full_name} status has been submitted to staff`,
                  }}
                  custname={emailThreadObj?.customer_full_name}
                  type={threadType.document}
                  {...props}
                /> */}

                {emailThreadObj?.threads?.map((item, index) => {
                  //console.log('item >>>', item);
                  return (
                    <MailThreadComponent
                      key={index}
                      type={threadType?.thread}
                      item={item}
                      custname={emailThreadObj?.customer_full_name}
                      {...props}
                    />
                  );
                })}
              </>
            ) : (
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Label title={'No MailBox Thread Found.'} />
              </View>
            )}
          </>
        )}
      </ScrollViewWrapper>
    </View>
  );
};

export default CustomerFileView;
