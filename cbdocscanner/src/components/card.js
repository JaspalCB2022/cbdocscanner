import React from 'react';
import {View, Image} from 'react-native';
import style from '../styles/cardStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import Label from './label';
import Button from './button';
import {size} from '../theme/fonts';
import {
  dbMailStatusEnum,
  dbmailStatusColor,
  mailStatusColor,
  mailStatusEnum,
} from '../utils/constent';
import DateComponent from './dateComponent';
import TimeComponent from './timeComponent';

const CustomCard = props => {
  const {
    imageurl,
    name,
    date,
    uploadtime,
    mailboxnumber,
    mailStatus,
    viewPress,
    scanPress,
  } = props;

  console.log('imageurl >>', imageurl, typeof imageurl);

  return (
    <View style={style.container}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={style.namerow}>
          <View style={style.nameIcon}>
            {imageurl ? (
              <Image
                source={{uri: imageurl}}
                style={{
                  height: 20,
                  width: 20,
                  resizeMode: 'contain',
                  borderRadius: 50,
                }}
              />
            ) : (
              <Icon
                name={'account'}
                size={18}
                color={colors.white}
                style={{backgroundColor: colors.black, borderRadius: 50}}
              />
            )}
          </View>
          <Label title={name} fontsize={size.font14} />
        </View>
        <View style={{...style.namerow, marginTop: 5}}>
          <View style={style.dateRow}>
            <DateComponent
              datestring={date}
              fontsize={size.font12}
              fontcolor={'#6A6C7F'}
            />
          </View>
          <View style={style.timeRow}>
            <TimeComponent
              timestring={uploadtime}
              fontsize={size.font12}
              fontcolor={'#6A6C7F'}
            />
          </View>
        </View>
        <View style={{...style.namerow, marginTop: 5}}>
          {mailboxnumber && (
            <View style={style.mailboxView}>
              <Label title={mailboxnumber} opacity={1} fontsize={size.font12} />
            </View>
          )}

          <View
            style={{
              ...style.mailStatusView,
              backgroundColor: dbmailStatusColor[mailStatus],
            }}>
            <Label
              title={dbMailStatusEnum[mailStatus]} //{mailStatusEnum[mailStatus]}
              opacity={1}
              color={colors.white}
              fontsize={size.font12}
            />
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'column', justifyContent: 'center'}}>
        {/* mailStatus === dbMailStatusEnum[2] */}
        {mailStatus === dbMailStatusEnum[1] && (
          <View style={{marginBottom: 10}}>
            <Button
              title={'Scan'}
              iconname={'line-scan'}
              iconcolor={colors.white}
              iconsize={14}
              textColor={colors.white}
              textSize={size.font12}
              //bgColor={'transparent'}
              customStyle={true}
              onPress={scanPress}
              customButtonStyle={{paddingVertical: 5}}
            />
          </View>
        )}

        <View>
          <Button
            onPress={viewPress}
            title={'View'}
            iconname={'eye'}
            iconcolor={colors.primary}
            iconsize={14}
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
