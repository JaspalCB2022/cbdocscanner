import React from 'react';

import colors from '../theme/colors';
import {size} from '../theme/fonts';
import CustomCard from './card';
import {View} from 'react-native';

const History = props => {
  const {data, navigation} = props;
  return (
    <View>
      {data.map((item, index) => {
        return (
          <CustomCard
            key={index}
            name={item.name}
            date={item.uploaddate}
            time={item.uploadtime}
            mailboxnumber={item.mailboxnumber}
            mailStatus={item.status}
          />
        );
      })}
    </View>
  );
};

export default History;
