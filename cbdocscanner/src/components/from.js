import React from 'react';
import {Button, TextInput, View} from 'react-native';
import {Formik} from 'formik';

export const Form = props => {
  const {} = props;
  return (
    <Formik
      initialValues={{email: ''}}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <View>
          <TextInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};
