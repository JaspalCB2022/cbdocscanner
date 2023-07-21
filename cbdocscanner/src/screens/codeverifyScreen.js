import React from 'react';
import {View, Text, Pressable} from 'react-native';
import globalstyle from '../styles/globalStyle';
import style from '../styles/codeverifyStyle';
import Label from '../components/label';
import {size} from '../theme/fonts';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input';
import Button from '../components/button';
import colors from '../theme/colors';
import {useDispatch} from 'react-redux';
import {updateUserObj} from '../stores/reducers/auth';

const CodeVerficationScreen = props => {
  const dispatch = useDispatch();
  const tempIntialValue = {code: ''};

  const tempIntialValueSchema = Yup.object().shape({
    code: Yup.string().required('Code Required.'),
  });

  const saveFormHandler = values => {
    console.log('saveFormHandler >>', values);
    const tempUserObj = {
      userObj: {},
      isLogin: true,
    };
    dispatch(updateUserObj(tempUserObj));
  };

  return (
    <View style={style.conatiner}>
      <View style={style.screenTitle}>
        <Label
          title={'Enter Verification Code'}
          fontsize={size.font25}
          color={'#2E4053'}
        />
      </View>

      <View style={globalstyle.shadow}>
        <Formik
          initialValues={tempIntialValue}
          validationSchema={tempIntialValueSchema}
          onSubmit={saveFormHandler}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <View style={style.formView}>
                <View style={style.formRow}>
                  <Label title={'Code'} />
                </View>
                <View style={style.formRow}>
                  <Input
                    onChangeText={handleChange('code')}
                    onBlur={handleBlur('code')}
                    value={values.code}
                    style={style.input}
                  />
                </View>
                {errors.code && touched.code ? (
                  <Label title={errors.code} color={colors.error} />
                ) : null}
              </View>
              <Pressable style={style.formRow}>
                <Label title={'Resend Code'} color={'#7FB3D5'} />
              </Pressable>
              <View style={style.buttonView}>
                <Button
                  iconname={'arrow-right'}
                  title={'Verify'}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default CodeVerficationScreen;
