import React from 'react';
import DocumentScanner from 'react-native-document-scanner-plugin';
import {CommonActions} from '@react-navigation/native';
import ApiURL from '../services/apiURL';
import {useSelector} from 'react-redux';
import {selectUserObject} from '../stores/reducers/auth';
import {PostApiWithFileProgress, postApi} from '../services/api';
import {
  ActivityIndicator,
  View,
  Text,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import colors from '../theme/colors';

const ScannedDocumentScreen = props => {
  const {navigation, route} = props;
  const userObj = useSelector(selectUserObject);
  console.log('route >>', route);
  const document_id = route?.params?.document_id ? route.params.document_id : 0;
  console.log('document_id >>', document_id);
  const [loading, setLoading] = React.useState(false);
  const [scannedImage, setScannedImage] = React.useState(null);

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

  const scanDocument = async () => {
    try {
      // prompt user to accept camera permission request if they haven't already
      // if (
      //   Platform.OS === 'android' &&
      //   (await PermissionsAndroid.request(
      //     PermissionsAndroid.PERMISSIONS.CAMERA,
      //   )) !== PermissionsAndroid.RESULTS.GRANTED
      // ) {
      //   Alert.alert(
      //     'Error',
      //     'User must grant camera permissions to use Mailbox App .',
      //   );
      //   return;
      // }

      const {scannedImages} = await DocumentScanner.scanDocument({
        maxNumDocuments: 1,
        croppedImageQuality: 100,
      });
      if (scannedImages) {
        setLoading(true);
        console.log('scannedImages >>', scannedImages);
        const headers = {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + userObj.token,
        };
        const formData = new FormData();
        formData.append('imagefile', {
          uri: scannedImages[0],
          type: 'image/jpeg',
          name: `image${new Date()}.jpg`,
        });
        const restempQAImage = await postApi(
          ApiURL.threshouldimage,
          formData,
          headers,
        );
        // console.log('tempRes >>', tempRes);
        // const restempQAImage = await improveQuailtyHandler(scannedImages[0]);
        console.log('restempQAImage >>', restempQAImage);
        if (restempQAImage?.status === 200) {
          setLoading(false);
          const tempIMPImage = [restempQAImage.data.data.thresholded_image_url];

          setScannedImage(scannedImages);
          navigation.navigate('viewdoc', {
            scanedImage: scannedImages,
            document_id: document_id,
            tempIMPImage: tempIMPImage,
          });
        } else {
          console.log('some Error.');
          setLoading(false);
        }
      } else {
        handleNavigateBackToHome();
      }
    } catch (err) {
      console.log(err);
      handleNavigateBackToHome();
    }
  };

  React.useEffect(() => {
    // call scanDocument on load
    scanDocument();
  }, []);

  return (
    <>
      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{'Please wait ....'}</Text>
          <ActivityIndicator size={'large'} color={colors.primary} />
        </View>
      )}
    </>
  );
};

export default ScannedDocumentScreen;
