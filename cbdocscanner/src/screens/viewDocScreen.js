import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import colors from '../theme/colors';
import Label from '../components/label';
import ScrollViewWrapper from '../components/scrollView';
import {size} from '../theme/fonts';
import ImageView from '../components/ImageView';
import metrics from '../theme/metrics';
import Button from '../components/button';
import style from '../styles/globalStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  AlertMsgObj,
  compressImage,
  compressImageHandler,
  generatePDFFromImages,
  getScanDocuemnt,
} from '../utils/helper';
import {postApi} from '../services/api';
import {selectUserObject} from '../stores/reducers/auth';
import {useSelector} from 'react-redux';
import {AlertTypes} from '../utils/constent';
import ApiURL from '../services/apiURL';
import {useToast} from 'react-native-toast-notifications';

const ViewDocumentScreen = props => {
  const toast = useToast();
  const {route, navigation} = props;
  const userObj = useSelector(selectUserObject);
  //console.log('user Object >>', userObj);
  //console.log('router >>', route.params.scanedImage);
  const [scannedImage, setScannedImage] = React.useState([
    ...(route.params.scanedImage.length > 0 ? route.params.scanedImage : []),
  ]);
  const [imageFile, setImageFile] = React.useState(
    route.params.scanedImage.length > 0 ? route.params.scanedImage[0] : null,
  );
  const [loading, setLoading] = React.useState(false);

  const ViewImageHandler = item => {
    setImageFile(item);
  };

  const AddMoreFileButtonHandler = async () => {
    const tempscannedImages = await getScanDocuemnt();
    //console.log('scannedImages >>', scannedImages);
    setScannedImage([...scannedImage, ...tempscannedImages]);
  };

  async function compressAllImages() {
    const tempData = [];
    for (const item of scannedImage) {
      try {
        const res = await compressImage(item);
        //console.log('res >>', res);
        //const tmpState = [...compressImages, res];
        tempData.push(res);
      } catch (error) {
        // Handle errors if needed
      }
    }
    return tempData;
  }

  const UploadScanedDocumentHandler = async () => {
    console.log('scannedImage >>>', scannedImage);
    if (scannedImage.length > 0) {
      setLoading(true);
      const tempdata = await compressAllImages();
      console.log('tempdata >>>', tempdata);
      if (tempdata.length > 0) {
        const tempPDFFilePath = await generatePDFFromImages(tempdata);
        let formData = new FormData();
        formData.append('imagesPdf', {
          uri: `file:///${tempPDFFilePath}`,
          name: 'cbscdocpdf.pdf',
          type: 'application/pdf',
        });
        formData.append('extractedText', '');
        tempdata.forEach((item, index) => {
          formData.append('scanImages', {
            uri: item,
            type: 'image/jpeg',
            name: `image${index}.jpg`,
          });
        });
        const headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userObj.token,
        };
        const tempRes = await postApi(
          ApiURL.SaveimagespdfText,
          formData,
          headers,
        );
        if (tempRes.status === 200) {
          setLoading(false);
          const tempObj = AlertMsgObj(AlertTypes.success);
          toast.show(tempRes.data.message, tempObj);
          navigation.navigate('Home');
          setScannedImage([]);
          setImageFile(null);
        } else {
          setLoading(false);
          const tempObj = AlertMsgObj(AlertTypes.danger);
          toast.show(tempRes.response.data.message, tempObj);
        }
      } else {
        setLoading(false);
      }
      //setLoading(false);
    }

    //setLoading(false);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: colors.white,
      }}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Label title={'Your File'} fontsize={size.font20} />
        <ScrollViewWrapper enableHorizontal={true}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            {scannedImage.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Pressable onPress={() => ViewImageHandler(item)}>
                    <Image
                      source={{uri: item}}
                      style={{width: 80, height: 70, borderRadius: 5}}
                    />
                  </Pressable>
                  {index !== scannedImage.length - 1 && (
                    <Icon
                      name={'plus'}
                      size={size.font26}
                      color={colors.primary}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollViewWrapper>
      </View>

      {imageFile && (
        <View
          style={{
            flex: 3,
          }}>
          <ImageView url={imageFile} imagestyle={{flex: 1}} />
        </View>
      )}
      <View
        style={{
          flex: 1,
          paddingBottom: 40,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Button
            onPress={loading ? () => {} : AddMoreFileButtonHandler}
            title={'Add More Files'}
            iconname={'plus'}
            iconcolor={colors.primary}
            iconsize={20}
            bgColor={colors.white}
            textColor={colors.primary}
            textSize={size.font16}
            customStyle={true}
            customButtonStyle={{
              paddingVertical: 10,
              borderColor: 'transparent',
              ...style.shadow,
              width: '50%',
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Button
            onPress={UploadScanedDocumentHandler}
            title={'Send'}
            iconname={'send'}
            iconcolor={colors.white}
            iconsize={20}
            textColor={colors.white}
            textSize={size.font16}
            customStyle={true}
            customButtonStyle={{paddingVertical: 10, width: '50%'}}
            loading={loading}
          />
        </View>
      </View>
    </View>
  );
};

export default ViewDocumentScreen;
