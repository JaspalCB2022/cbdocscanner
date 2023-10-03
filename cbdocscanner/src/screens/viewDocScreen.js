import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
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
  generatePDFFromImprovedImages,
  getScanDocuemnt,
} from '../utils/helper';
import {postApi} from '../services/api';
import {selectUserObject} from '../stores/reducers/auth';
import {useSelector} from 'react-redux';
import {AlertTypes} from '../utils/constent';
import ApiURL from '../services/apiURL';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation, CommonActions} from '@react-navigation/native';

const ViewDocumentScreen = props => {
  const toast = useToast();
  const {route, navigation} = props;

  const [filterImage, setFilterImage] = useState('');

  const userObj = useSelector(selectUserObject);
  //console.log('user Object >>', userObj);
  console.log('router >>', route.params.tempIMPImage);

  const [improvedImages, setImprovedImages] = React.useState([
    ...(route?.params?.tempIMPImage?.length > 0
      ? route.params.tempIMPImage
      : []),
  ]);

  const [scannedImage, setScannedImage] = React.useState([
    ...(route?.params?.scanedImage?.length > 0 ? route.params.scanedImage : []),
  ]);
  const [imageFile, setImageFile] = React.useState(
    route?.params?.scanedImage?.length > 0 ? route.params.scanedImage[0] : null,
  );
  const [loading, setLoading] = React.useState(false);

  const ViewImageHandler = item => {
    setImageFile(item);
  };

  const AddMoreFileButtonHandler = async () => {
    const tempscannedImages = await getScanDocuemnt();
    if (tempscannedImages) {
      setLoading(true);
      //console.log('scannedImages >>', scannedImages);
      //console.log('tempFilter >>', tempFilter);

      const filepath =
        Platform.OS === 'ios'
          ? tempscannedImages[0].replace('file://', '')
          : tempscannedImages[0];
      //console.log('filepath >>', filepath);
      const res = await compressImage(filepath);
      const headers = {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + userObj.token,
      };
      const formData = new FormData();
      formData.append('imagefile', {
        uri: res,
        type: 'image/jpeg',
        name: `image${new Date()}.jpg`,
      });
      const restempQAImage = await postApi(
        ApiURL.threshouldimage,
        formData,
        headers,
      );
      if (restempQAImage?.status === 200) {
        setLoading(false);
        const tempIMPImage = [
          ...improvedImages,
          restempQAImage.data.data.thresholded_image_url,
        ];
        setImprovedImages(tempIMPImage);
        setScannedImage([...scannedImage, ...tempscannedImages]);
        setImageFile(tempIMPImage[0]);
      }
    }

    //setImageFile(tempFilter);
  };

  const handleNavigateBackToHome = () => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'homestack', // Replace with the actual name of your Home Screen
        },
      ],
    });

    navigation.dispatch(resetAction);
  };

  const sendtoCustomer = async () => {
    if (route?.params?.document_id > 0) {
      try {
        if (scannedImage.length > 0) {
          const formData = new FormData();
          setLoading(true);
          const tempdata = improvedImages; // await compressAllImages();
          //console.log('tempdata >>>', tempdata);
          if (tempdata.length > 0) {
            tempdata.forEach((item, index) => {
              //console.log('item >>', item);
              formData.append('image_files', {
                uri: item,
                type: 'image/jpeg',
                name: `image${index}.jpg`,
              });
            });
            const {pdfFilePath} = await generatePDFFromImprovedImages(tempdata); //generatePDFFromImages(tempdata);
            // console.log(
            //   'pdfFilePath >>',
            //   pdfFilePath,
            //   //tempExtractObj,
            // );
            const filepath =
              Platform.OS === 'android'
                ? `file:///${pdfFilePath}`
                : pdfFilePath;
            formData.append('new_pdf', {
              uri: filepath,
              type: 'application/pdf',
              name: 'cbscdocpdf.pdf',
            });
            // formData.append('extractedText', '');
            // formData.append('customer_id', item.customer_id);
            //console.log('formData >>', formData);
            const headers = {
              accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + userObj.token,
            };
            const apiurl =
              ApiURL.updateDocuemnt + route?.params?.document_id + '/';
            const tempRes = await postApi(apiurl, formData, headers);
            //console.log('tempRes >>', tempRes);
            if (tempRes?.status === 200) {
              const tempmsg = `Sent Successfully.`; //to ${item.name}
              setLoading(false);
              const tempObj = AlertMsgObj(AlertTypes.success);
              //toast.show(tempRes.data.message, tempObj);
              toast.show(tempmsg, tempObj);
              //navigation.reset({index: 0, routes: [{name: 'setTwoScreens'}]});
              //navigation.navigate('homestack', {screen: 'Home'});
              handleNavigateBackToHome();
            } else {
              setLoading(false);
              const tempObj = AlertMsgObj(AlertTypes.danger);
              toast.show(tempRes?.response?.data?.message, tempObj);
            }
          } else {
            setLoading(false);
          }
          //setLoading(false);
        }
      } catch (err) {
        console.log('err >>', err);
        const tempObj = AlertMsgObj(AlertTypes.danger);
        toast.show(err.message, tempObj);
        setLoading(false);
      }
    } else {
      navigation.navigate('sendtocustomer', {scannedImage, improvedImages});
    }
  };

  async function compressAllImages() {
    const tempData = [];
    for (const item of scannedImage) {
      try {
        //console.log('outputImage >>>', outputImage);
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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: colors.white,
      }}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.black}}>{'Please wait ....'}</Text>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      ) : (
        <>
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
                        //backgroundColor: '#fff',
                      }}>
                      <Pressable onPress={() => ViewImageHandler(item)}>
                        <Image
                          source={{uri: item}}
                          style={{
                            width: 80,
                            height: 70,
                            borderRadius: 5,
                            // You can adjust the intensity of the grayscale accoding. value of 0% will produce a normal images.
                          }}
                          resizeMode={'contain'}
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
                height: 400,
                width: Dimensions.get('screen').width,
                backgroundColor: '#fff',
              }}>
              <Image
                style={{
                  width: Dimensions.get('screen').width,
                  height: 380,
                  justifyContent: 'center',
                  alignItems: 'center',
                  //filter: 'grayscale(100%)',
                }}
                objectFit={'contain'}
                source={{uri: imageFile}}
                resizeMode={'contain'}

                //tintColor={'rgb(236, 240, 241)'}
              />
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
              {scannedImage.length > 0 && (
                <Button
                  onPress={sendtoCustomer}
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
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default ViewDocumentScreen;
