import React from 'react';
import {View, Text, Pressable, Platform, TextInput} from 'react-native';
import globalstyle from '../styles/globalStyle';
import style from '../styles/codeverifyStyle';
import Label from '../components/label';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import Button from '../components/button';
import colors from '../theme/colors';
import {useDispatch} from 'react-redux';
import {updateUserObj} from '../stores/reducers/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import OTPInput from '../components/OTPInput';
import {size, weight} from '../theme/fonts';
import {postApi} from '../services/api';
import ApiURL from '../services/apiURL';
import {useToast} from 'react-native-toast-notifications';
import {AlertMsgObj} from '../utils/helper';
import {AlertTypes} from '../utils/constent';
import {SplashLogoImage} from '../theme/Images';
import metrics from '../theme/metrics';
import ScrollViewWrapper from '../components/scrollView';

const CodeVerficationScreen = props => {
  const {email} = props.route.params;
  const toast = useToast();
  const dispatch = useDispatch();
  const tempIntialValue = {code: ''};
  const [loading, setLoading] = React.useState(false);
  const [otpCode, setOTPCode] = React.useState(['', '', '', '']);
  const [isPinReady, setIsPinReady] = React.useState(false);
  const maximumCodeLength = 4;

  const firstInputRef = React.useRef(null);
  const secondInputRef = React.useRef(null);
  const thirdInputRef = React.useRef(null);
  const fourthInputRef = React.useRef(null);

  const tempIntialValueSchema = Yup.object().shape({
    code: Yup.string().required('Code Required.'),
  });

  const OTPChangeHandler = index => {
    return value => {
      if (isNaN(Number(value))) {
        return value;
      }
      const tempOTP = otpCode.concat('');
      tempOTP[index] = value;
      setOTPCode(tempOTP);
      if (value != '') {
        if (index === 0) {
          secondInputRef.current.focus();
        } else if (index === 1) {
          thirdInputRef.current.focus();
        } else if (index === 2) {
          fourthInputRef.current.focus();
        }
      }
    };
  };

  const OTPKeypress = index => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpCode[index] === '') {
        if (index === 1) {
          firstInputRef.current.focus();
        } else if (index === 2) {
          secondInputRef.current.focus();
        } else if (index === 3) {
          thirdInputRef.current.focus();
        }
        if (Platform.OS === 'android' && index > 0) {
          const tmpOTP = otpCode.concat();
          tmpOTP[index - 1] = '';
          setOTPCode(tmpOTP);
        }
      }
    };
  };

  const refCallback = inputref => node => {
    inputref.current = node;
  };

  const saveFormHandler = async () => {
    try {
      setLoading(true);
      const otpstr = otpCode.join('');
      if (otpstr !== '') {
        const tempSave = {email: email.trim(), otp: otpstr};
        //console.log('tempSave >>', tempSave);

        toast.hide();
        const tempRes = await postApi(ApiURL.Login, tempSave);
        //console.log('tempRes >>', tempRes);
        if (tempRes.status === 200) {
          setLoading(false);

          const tempUserObj = {
            userObj: {
              email: email.toLowerCase().trim(),
              otpcode: otpstr,
              token: tempRes.data.data.access_token,
            },
            isLogin: true,
          };
          dispatch(updateUserObj(tempUserObj));
          const tempObj = AlertMsgObj(AlertTypes.success);
          toast.show(tempRes.data.message, tempObj);
        } else {
          setLoading(false);
          const tempObj = AlertMsgObj(AlertTypes.danger);
          toast.show(tempRes.response.data.message, tempObj);
        }
      }
    } catch (err) {
      //console.log('err >>', err);
      setLoading(false);

      const tempObj = AlertMsgObj(AlertTypes.danger);
      toast.show(err.message, tempObj);
    }
  };

  return (
    <View style={style.conatiner}>
      <ScrollViewWrapper>
        <View style={globalstyle.shadow}>
          <View style={{textAlign: 'center', marginBottom: 50, marginTop: 80}}>
            <SplashLogoImage
              style={{width: metrics.width, height: 150}}
              resizeMode={'contain'}
            />
          </View>
          <View style={style.screenTitle}>
            <Icon
              name="lock-outline"
              size={30}
              color={colors.buttonBackgrounColor}
            />
          </View>
          <View style={style.formView}>
            <View style={style.formRow}>
              <Label
                title={'Input the Activation Code'}
                fontsize={size.font19}
              />
            </View>

            <View style={{...style.formRow, paddingHorizontal: 10}}>
              {[
                firstInputRef,
                secondInputRef,
                thirdInputRef,
                fourthInputRef,
              ].map((inputref, index) => {
                return (
                  <TextInput
                    key={index}
                    onChangeText={OTPChangeHandler(index)}
                    onKeyPress={OTPKeypress(index)}
                    //onBlur={handleBlur('code')}
                    value={otpCode[index]}
                    style={{
                      flex: 1,
                      marginRight: 5,
                      width: '100%',
                      height: 60,
                      backgroundColor: colors.backgorundColor,
                      textAlign: 'center',
                      color: colors.black,
                      borderRadius: 10,
                      fontSize: size.font22,
                      fontWeight: weight.semi,
                    }}
                    ref={refCallback(inputref)}
                    keyboardType={'numeric'}
                    maxLength={1}
                    autoFocus={index === 0 ? true : undefined}
                  />
                );
              })}
            </View>
          </View>

          <View style={style.buttonView}>
            <Button
              iconname={'arrow-right'}
              title={'Verify'}
              onPress={saveFormHandler}
              width="50%"
              loading={loading}
            />
          </View>
        </View>
      </ScrollViewWrapper>
    </View>
  );
};

export default CodeVerficationScreen;
