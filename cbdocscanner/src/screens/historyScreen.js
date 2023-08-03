import React from 'react';

import {View, Text} from 'react-native';
import style from '../styles/globalStyle';
import CustomerHistory from '../components/customerHistory';
import {demoData} from '../utils/history_TempData';
import History from '../components/history';
import ScrollViewWrapper from '../components/scrollView';

const HistoryScreen = () => {
  return (
    <View style={style.container}>
      <CustomerHistory headerTitle={'All History'} />
      <View style={{marginTop: 20}}>
        <ScrollViewWrapper>
          <History data={demoData} />
        </ScrollViewWrapper>
      </View>
    </View>
  );
};

export default HistoryScreen;
