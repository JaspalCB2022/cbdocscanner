import React, {useState} from 'react';
import {View, Text, TextInput, Pressable, Alert} from 'react-native';
import loginstyle from '../styles/loginStyles';
import globalstyle from '../styles/globalStyle';
import Input from '../components/Input';
import {Formik} from 'formik';
import Button from '../components/button';
import Label from '../components/label';
import * as Yup from 'yup';
import colors from '../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {postApi} from '../services/api';
import ApiURL from '../services/apiURL';
import {useToast} from 'react-native-toast-notifications';
import {AlertTypes} from '../utils/constent';
import {AlertMsgObj} from '../utils/helper';
import {SplashLogoImage} from '../theme/Images';
import metrics from '../theme/metrics';

const LoginScreen = props => {
  const toast = useToast();
  const {route, navigation} = props;

  const [loading, setLoading] = useState(false);

  const tempIntialValue = {email: ''};

  const tempIntialValueSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email-Id')
      .required('Email-Id Required.'),
  });

  const loginButtonHandler = values => {
    navigation.navigate('codeverify', {...values});
  };

  const saveFormHandler = async values => {
    try {
      setLoading(true);
      //alert('mjks>>');
      toast.hide();

      const tempRes = await postApi(
        ApiURL.GenerateOTP,
        {
          email: values.email.toLowerCase(),
        },
        // headers,
      );
      console.log('tempRes >', tempRes);
      if (tempRes.status === 200) {
        setLoading(false);
        //console.log('tempRes.response >>', tempRes);
        loginButtonHandler(values);
        const tempObj = AlertMsgObj(AlertTypes.success);
        toast.show(tempRes.data.message, tempObj);
      } else {
        setLoading(false);
        const tempObj = AlertMsgObj(AlertTypes.danger);
        toast.show(tempRes.response.data.message, tempObj);
      }
    } catch (err) {
      setLoading(false);
      //console.log('err >>', err);
      const tempObj = AlertMsgObj(AlertTypes.danger);
      toast.show(err.message, tempObj);
    }
  };

  return (
    <View style={loginstyle.container}>
      <View style={globalstyle.shadow}>
        <View style={loginstyle.cardStyle}>
          <View style={loginstyle.cardTitle}>
            <SplashLogoImage
              style={{width: metrics.width, height: 100}}
              resizeMode={'contain'}
            />
          </View>
          {/* <Text style={loginstyle.cardTitle}>{'Login'}</Text> */}
          <Formik
            initialValues={tempIntialValue}
            validationSchema={tempIntialValueSchema}
            onSubmit={values => saveFormHandler(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View>
                <View>
                  <View style={loginstyle.formRow}>
                    <Label title={'Email Id'} />
                  </View>
                  <View style={loginstyle.formRow}>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={loginstyle.loginInput}
                    />
                    <View style={loginstyle.emailIcon}>
                      <Icon
                        name="email-newsletter"
                        size={20}
                        color={colors.black}
                      />
                    </View>
                  </View>
                  {errors.email && touched.email ? (
                    <Label title={errors.email} color={colors.error} />
                  ) : null}
                </View>

                <View style={loginstyle.loginButton}>
                  <Button
                    iconname={'arrow-right'}
                    title={'Login'}
                    onPress={handleSubmit}
                    loading={loading}
                  />
                </View>
                {/* <Button onPress={handleSubmit} title="Submit" /> */}
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
