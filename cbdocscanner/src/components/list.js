import React from 'react';
import {View, Text, Image} from 'react-native';
import style from '../styles/globalStyle';
import {types} from '../utils/constent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RenderList = props => {
  const {data, type} = props;
  return (
    <View style={style.listItem}>
      <View
        style={{
          ...style.row,
          paddingHorizontal: 15,
          flexWrap: 'wrap',
        }}>
        <View style={{width: '20%'}}>
          {type === types.PDF && (
            <Icon name="file-pdf-box" size={60} color={'red'} />
          )}
          {type === types.IMAGES && (
            <Image source={{uri: data}} style={{width: 50, height: 50}} />
          )}
        </View>

        <View style={{width: '80%'}}>
          <Text>{data}</Text>
        </View>
      </View>
    </View>
  );
};

export default RenderList;
