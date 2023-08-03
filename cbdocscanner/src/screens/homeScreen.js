import React from 'react';
import {View, Text} from 'react-native';
import style from '../styles/globalStyle';
import CustomerHistory from '../components/customerHistory';
import ScrollViewWrapper from '../components/scrollView';
import CustomCard from '../components/card';
import Button from '../components/button';
import colors from '../theme/colors';
import {size} from '../theme/fonts';
import History from '../components/history';
import {demoData} from '../utils/history_TempData';

const HomeScreen = props => {
  const {navigation} = props;
  const naviateToAllHistoryHandler = () => {
    navigation.navigate('history');
  };
  return (
    <View style={style.container}>
      <CustomerHistory headerTitle={'Today`s Scan History'} />
      <ScrollViewWrapper style={{marginTop: 20}}>
        <History data={demoData} navigation={navigation} />
        <View style={{paddingHorizontal: 10, marginTop: 20, marginBottom: 20}}>
          <Button
            onPress={naviateToAllHistoryHandler}
            title={'View All History'}
            iconname={'history'}
            iconcolor={colors.primary}
            iconsize={20}
            bgColor={'transparent'}
            textColor={colors.primary}
            textSize={size.font16}
            customStyle={true}
            customButtonStyle={{paddingVertical: 10}}
          />
        </View>
      </ScrollViewWrapper>
    </View>
  );
};

export default HomeScreen;
