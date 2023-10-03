import React, {useEffect} from 'react';
import {View, Text, LogBox} from 'react-native';
import style from '../styles/addCustomerStyle';
import {Formik} from 'formik';
import * as Yup from 'yup';
import ScrollViewWrapper from '../components/scrollView';
import colors from '../theme/colors';
import Label from '../components/label';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../components/Input';
import {useToast} from 'react-native-toast-notifications';
import {AlertMsgObj} from '../utils/helper';
import Button from '../components/button';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCustomerList,
  selectCustomerLists,
  selectUserObject,
} from '../stores/reducers/auth';
import ApiURL from '../services/apiURL';
import {AlertTypes} from '../utils/constent';
import {postApi} from '../services/api';

const AddCustomer = props => {
  //console.log('params>>>', props);
  const {navigation, route} = props;
  //console.log('Route>> ', route.params);
  const dispatch = useDispatch();
  const toast = useToast();
  const userObj = useSelector(selectUserObject);
  const customers = useSelector(selectCustomerLists);

  const [loading, setLoading] = React.useState(false);

  const tempIntialValue = {
    mailboxnumber: '',
    firstname: '',
    lastname: '',
    email: '',
  };

  const tempIntialValueSchema = Yup.object().shape({
    firstname: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid Last Name.')
      .max(50, 'The first name should not exceed 50 characters.')
      .required('First Name Required.'),
    lastname: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid Last Name.')
      .max(50, 'The last name should not exceed 50 characters.')
      .required('Last Name Required.'),
    email: Yup.string()
      .email('Invalid email-Id')
      .required('Email-Id Required.'),
    mailboxnumber: Yup.string()
      .required('Mailbox Number Required.')
      .matches(/^[0-9]+$/, 'Must be only digits.')
      .min(4, 'Must be exactly 4 digits.')
      .max(4, 'The mailbox number should not exceed 4 digits.'),
    // .test(
    //   'is positive?',
    //   'The Mailbox number must be greater than 0!',
    //   value => value >= 0,
    // ),
  });

  const saveFormHandler = async values => {
    try {
      setLoading(true);
      //alert('mjks>>');
      toast.hide();
      const headers = {
        Authorization: 'Bearer ' + userObj.token,
        accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      };

      const formData = new FormData();

      formData.append('first_name', values.firstname);
      formData.append('last_name', values.lastname);
      formData.append('email', values.email.toLowerCase());
      formData.append('mailbox_no', values.mailboxnumber.toString());

      const tempRes = await postApi(ApiURL.createCustomer, formData, headers);
      //console.log('tempRes >', tempRes);
      if (tempRes.status === 200) {
        setLoading(false);
        const tempObj = AlertMsgObj(AlertTypes.success);
        toast.show(tempRes.data.message, tempObj);
        navigation.navigate('customers');
        route.params.getCustomers();
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
  useEffect(() => {
    LogBox.ignoreLogs([
      'Non-serializable values were found in the navigation state',
    ]);
  }, []);

  return (
    <View style={style.container}>
      <ScrollViewWrapper extraScrollHeight={100}>
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
              {/* First Name */}
              <View style={style.viewSpace}>
                <View style={style.formRow}>
                  <Label title={'First Name'} />
                </View>
                <View style={style.formRow}>
                  <Input
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                    style={style.loginInput}
                  />
                </View>
                {errors.firstname && touched.firstname ? (
                  <Label title={errors.firstname} color={colors.error} />
                ) : null}
              </View>
              {/* Last Name */}
              <View style={style.viewSpace}>
                <View style={style.formRow}>
                  <Label title={'Last Name'} />
                </View>
                <View style={style.formRow}>
                  <Input
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                    style={style.loginInput}
                  />
                </View>
                {errors.lastname && touched.lastname ? (
                  <Label title={errors.lastname} color={colors.error} />
                ) : null}
              </View>
              {/* Email Id */}
              <View style={style.viewSpace}>
                <View style={style.formRow}>
                  <Label title={'Email Id'} />
                </View>
                <View style={style.formRow}>
                  <Input
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={style.loginInput}
                  />
                </View>
                {errors.email && touched.email ? (
                  <Label title={errors.email} color={colors.error} />
                ) : null}
              </View>
              {/* Mailbox Number */}
              <View style={style.viewSpace}>
                <View style={style.formRow}>
                  <Label title={'Mailbox Number'} />
                </View>
                <View style={style.formRow}>
                  <Input
                    onChangeText={handleChange('mailboxnumber')}
                    onBlur={handleBlur('mailboxnumber')}
                    value={values.mailboxnumber}
                    style={style.loginInput}
                  />
                </View>
                {errors.mailboxnumber && touched.mailboxnumber ? (
                  <Label
                    title={errors.mailboxnumber}
                    color={colors.error}
                    enablecapitalize
                  />
                ) : null}
              </View>

              <View style={style.loginButton}>
                <Button
                  //iconname={'arrow-right'}
                  title={'Done'}
                  onPress={handleSubmit}
                  loading={loading}
                />
              </View>
              {/* <Button onPress={handleSubmit} title="Submit" /> */}
            </View>
          )}
        </Formik>
      </ScrollViewWrapper>
    </View>
  );
};

export default AddCustomer;
