import React from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import loginstyle from '../styles/loginStyles';
import globalstyle from '../styles/globalStyle';
import {Form} from '../components/from';
import Input from '../components/Input';
import {Formik} from 'formik';
import Button from '../components/button';
import Label from '../components/label';
import * as Yup from 'yup';
import colors from '../theme/colors';

const LoginScreen = props => {
  const {route, navigation} = props;
  const tempIntialValue = {email: '', password: ''};

  const tempIntialValueSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email-Id')
      .required('Email-Id Required.'),
    password: Yup.string().required('Password Required'),
  });

  const forgetPasswordHandler = () => {
    navigation.navigate('forgetpassward');
  };

  const loginButtonHandler = () => {
    navigation.navigate('codeverify');
  };

  const saveFormHandler = values => {
    console.log('values >>', values);
    loginButtonHandler();
  };

  return (
    <View style={loginstyle.container}>
      <View style={globalstyle.shadow}>
        <View style={loginstyle.cardStyle}>
          <Text style={loginstyle.cardTitle}>{'Login'}</Text>

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
                <View>
                  <View style={loginstyle.formRow}>
                    <Label title={'Email-Id'} />
                  </View>
                  <View style={loginstyle.formRow}>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      style={loginstyle.loginInput}
                    />
                  </View>
                  {errors.email && touched.email ? (
                    <Label title={errors.email} color={colors.error} />
                  ) : null}
                </View>
                <View>
                  <View style={loginstyle.formRow}>
                    <Label title={'Password'} />
                  </View>
                  <View style={loginstyle.formRow}>
                    <TextInput
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      style={loginstyle.loginInput}
                      secureTextEntry={true}
                    />
                  </View>
                  {errors.password && touched.password ? (
                    <Label title={errors.password} color={colors.error} />
                  ) : null}
                </View>
                <Pressable
                  style={loginstyle.forgetpassword}
                  onPress={forgetPasswordHandler}>
                  <Label title={'Forget Password?'} />
                </Pressable>
                <Button
                  iconname={'arrow-right'}
                  title={'Login'}
                  onPress={handleSubmit}
                />
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
