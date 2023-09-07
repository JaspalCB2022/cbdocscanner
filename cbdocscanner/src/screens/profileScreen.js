import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import colors from '../theme/colors';
import Label from '../components/label';
import Button from '../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {getApi, postApi} from '../services/api';
import ApiURL from '../services/apiURL';
import {AlertTypes} from '../utils/constent';
import {AlertMsgObj} from '../utils/helper';
import {
  fetchScanerProfile,
  selectLoading,
  selectUserObject,
  selectUserProfile,
  updateUserObj,
} from '../stores/reducers/auth';
import {useToast} from 'react-native-toast-notifications';
import style from '../styles/globalStyle';
import styles from '../styles/profileStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {size} from '../theme/fonts';

const ProfileScreen = props => {
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObject);
  const toast = useToast();
  const {route, navigation} = props;
  const userProfile = useSelector(selectUserProfile);
  const loading = useSelector(selectLoading);

  //console.log('userProfile >>', userProfile);

  const userLogOutHandler = async () => {
    const headers = {Authorization: 'Bearer ' + userObj.token};
    const tempRes = await postApi(ApiURL.logoutuser, {}, headers);
    console.log('tempRes >>', tempRes);
    if (tempRes.status === 200) {
      const tempUserObj = {
        userObj: {},
        isLogin: false,
      };
      dispatch(updateUserObj(tempUserObj));
      const tempObj = AlertMsgObj(AlertTypes.success);
      toast.show(tempRes.data.message, tempObj);
    } else {
      const tempObj = AlertMsgObj(AlertTypes.danger);
      toast.show(tempRes.response.data.message, tempObj);
    }
  };

  const getScanerProfile = () => {
    const headers = {Authorization: 'Bearer ' + userObj.token};
    dispatch(fetchScanerProfile(headers));
  };

  React.useEffect(() => {
    getScanerProfile();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: 'center',
        //alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
      }}>
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
      ) : (
        <>
          <View style={styles.userViewCard}>
            <View style={styles.userImageView}>
              {userProfile.user_photo ? (
                <Image
                  source={{uri: userProfile.user_photo}}
                  style={{
                    height: 100,
                    width: 100,
                    resizeMode: 'contain',
                    borderRadius: 50,
                  }}
                />
              ) : (
                <Icon name={'account-circle'} size={100} color={colors.black} />
              )}
              {/* <Icon name={'account-circle'} size={70} /> */}
            </View>
            <Label title={userProfile.name} fontsize={size.font23} />
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Label
                title={'Gender'}
                fontsize={size.font17}
                styles={{marginBottom: 10}}
              />
              <Label
                title={userProfile.gender}
                opacity={0.6}
                styles={{
                  marginBottom: 5,
                  backgroundColor: colors.backgorundColor,
                  padding: 10,
                }}
              />
            </View>
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Label
                title={'email'}
                fontsize={size.font17}
                styles={{
                  marginBottom: 10,
                }}
              />
              <Label
                title={userProfile.email}
                opacity={0.6}
                styles={{
                  marginBottom: 20,
                  backgroundColor: colors.backgorundColor,
                  padding: 10,
                }}
              />
            </View>
          </View>

          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              marginTop: 4,
            }}>
            <View style={{flexDirection: 'column'}}>
              <Label
                title={'Date of Birth'}
                fontsize={size.font17}
                styles={{
                  marginBottom: 10,
                }}
                enablecapitalize={false}
              />
              <Label
                title={userProfile.date_of_birth}
                opacity={0.6}
                styles={{
                  marginBottom: 20,
                  backgroundColor: colors.backgorundColor,
                  padding: 10,
                }}
              />
            </View>
          </View>

          <View style={style.row}>
            <Button
              title={'Logout'}
              onPress={userLogOutHandler}
              customStyle={true}
              customButtonStyle={{paddingVertical: 8}}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;
