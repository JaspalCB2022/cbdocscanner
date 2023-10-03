import React from 'react';

import colors from '../theme/colors';
import {size} from '../theme/fonts';
import CustomCard from './card';
import {View, FlatList} from 'react-native';
import {
  getStringFormDateHandler,
  getStringFromTimeHandler,
} from '../utils/helper';

const History = props => {
  const {data, navigation} = props;

  const navigateCustomerDetailHandler = item => {
    try {
      navigation.navigate('customerdetail', {
        customerid: item.customer_id,
        customerDetail: item,
      });
    } catch (err) {
      console.log('err');
    }
  };

  const navigatescanHandler = item => {
    try {
      navigation.navigate('scannedocstack', {
        screen: 'scannedoc',
        params: {document_id: item.document_id},
      });
    } catch (err) {
      console.log('err');
    }
  };

  return (
    <View>
      {data?.length > 0 &&
        data?.map((item, index) => {
          //console.log('item >>', item);
          return (
            <CustomCard
              viewPress={() => navigateCustomerDetailHandler(item)}
              scanPress={() => navigatescanHandler(item)}
              key={index}
              name={item.customer_full_name}
              date={getStringFormDateHandler(item.document_updated_at)}
              uploadtime={getStringFromTimeHandler(item.document_updated_at)}
              mailboxnumber={item.mailbox_number}
              mailStatus={item.status}
              imageurl={item.customer_photo_url}
            />
          );
        })}
    </View>
  );
};

export default History;
