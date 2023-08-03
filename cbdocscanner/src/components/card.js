import React from 'react';
import {View, Text} from 'react-native';
import style from '../styles/cardStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import Label from './label';
import Button from './button';
import {size} from '../theme/fonts';
import {mailStatusColor, mailStatusEnum} from '../utils/constent';

const CustomCard = props => {
  const {name, date, time, mailboxnumber, mailStatus} = props;
  return (
    <View style={style.container}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={style.namerow}>
          <View style={style.nameIcon}>
            <Icon name={'account'} size={15} color={colors.white} />
          </View>
          <Label title={name} />
        </View>
        <View style={{...style.namerow, marginTop: 5}}>
          <View style={style.dateRow}>
            <Icon
              name={'calendar-month'}
              size={18}
              color={colors.cardIconColor}
              style={{marginRight: 10}}
            />
            <Label title={date} color={'#979BA5'} fontsize={size.font14} />
          </View>
          <View style={style.timeRow}>
            <Icon
              name={'clock-time-five-outline'}
              size={18}
              color={colors.cardIconColor}
              style={{marginRight: 10}}
            />
            <Label title={time} color={'#979BA5'} fontsize={size.font14} />
          </View>
        </View>
        <View style={{...style.namerow, marginTop: 5}}>
          <View style={style.mailboxView}>
            <Label title={mailboxnumber} opacity={0.6} />
          </View>

          <View
            style={{
              ...style.mailStatusView,
              backgroundColor: mailStatusColor[mailStatus],
            }}>
            <Label
              title={mailStatusEnum[mailStatus]}
              opacity={1}
              color={colors.white}
              fontsize={size.font12}
            />
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        {(mailStatus === mailStatusEnum.openandscan ||
          mailStatus === mailStatusEnum.shredded) && (
          <View style={{marginBottom: 10}}>
            <Button
              title={'Scan'}
              iconname={'line-scan'}
              iconcolor={colors.white}
              iconsize={15}
              textColor={colors.white}
              textSize={size.font12}
              //bgColor={'transparent'}
              customStyle={true}
              customButtonStyle={{paddingVertical: 5}}
            />
          </View>
        )}

        <View>
          <Button
            title={'View'}
            iconname={'eye'}
            iconcolor={colors.primary}
            iconsize={15}
            bgColor={'transparent'}
            textColor={colors.primary}
            textSize={size.font12}
            customStyle={true}
            customButtonStyle={{paddingVertical: 5}}
          />
        </View>
      </View>
    </View>
  );
};

export default CustomCard;
