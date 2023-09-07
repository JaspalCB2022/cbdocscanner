import React from 'react';
import {Pressable, View, Text} from 'react-native';
import Label from './label';
import {
  getStringFormDateHandler,
  getStringFromTimeHandler,
} from '../utils/helper';
import style from '../styles/fileViewStyle';
import {family, size, weight} from '../theme/fonts';
import DateComponent from './dateComponent';
import TimeComponent from './timeComponent';
import colors from '../theme/colors';
import {
  dbMailStatusEnum,
  dbmailStatusColor,
  fileType,
  threadType,
} from '../utils/constent';

export const MailThreadComponent = props => {
  const {item, custname, type, navigation} = props;
  console.log('item Thrad >>', item);
  const dateString = getStringFormDateHandler(item.created_at);
  const timestring = getStringFromTimeHandler(item.created_at);

  const ViewPDFFileHandler = (fileurl, filetype) => {
    navigation.navigate('openfileview', {fileurl: fileurl, filetype: filetype});
  };

  return (
    <View style={style.pdflist}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: 'rgba(0,0,0,0.5)',
          padding: 10,
          borderBottomWidth: 1,
        }}>
        <Label
          title={
            type == threadType.thread &&
            dbMailStatusEnum.Pending === item.current_status
              ? 'Postal Email'
              : custname
          }
          color={'#0E4179'}
        />
        <View style={{...style.namerow}}>
          <View style={style.dateRow}>
            <DateComponent
              datestring={dateString}
              fontsize={size.font12}
              fontcolor={'#6A6C7F'}
            />
          </View>
          <View style={style.timeRow}>
            <TimeComponent
              timestring={timestring}
              fontsize={size.font12}
              fontcolor={'#6A6C7F'}
            />
          </View>
        </View>
      </View>
      {/* {type == threadType.thread && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 20,
          }}>
          <Label title={`Hi ${custname}`} />
        </View>
      )} */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          marginTop: 10,
        }}>
        {/*  item.message */}
        <Label
          title={
            dbMailStatusEnum.Pending === item.current_status
              ? `This Postal Mail has been sent to '${custname}'.`
              : `'${custname}' responded your email.`
          }
          enablecapitalize={false}
        />
      </View>
      {dbMailStatusEnum.Pending === item.current_status ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            //justifyContent: 'center',
          }}>
          <View
            style={{
              marginTop: 20,
              backgroundColor: dbmailStatusColor[item.current_status],
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}>
            <Label
              title={`${dbMailStatusEnum[item.current_status]}`}
              color={colors.white}
            />
          </View>
          {type == threadType.thread &&
            dbMailStatusEnum.Pending === item.current_status && (
              <Pressable
                style={{
                  marginTop: 20,
                  backgroundColor: colors.primary,
                  padding: 10,
                  borderRadius: 5,
                }}
                //style={style.pdflist}
                onPress={() =>
                  ViewPDFFileHandler(item.document_path, fileType.PDF)
                }>
                <Label title={'Attachment'} color={colors.white} />
              </Pressable>
            )}
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text
            style={{
              color: colors.black,
              //fontFamily: family.fontFamily,
              fontSize: size.font16,
              fontWeight: weight.bold,
            }}>{`Status: `}</Text>
          <View
            style={{
              //marginTop: 20,
              backgroundColor: dbmailStatusColor[item.current_status],
              padding: 10,
              borderRadius: 5,
              marginRight: 10,
            }}>
            <Label
              title={`${dbMailStatusEnum[item.current_status]}`}
              color={colors.white}
            />
          </View>
        </View>
      )}
    </View>
  );
};
