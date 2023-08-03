import React from 'react';
import {View, Text} from 'react-native';
import style from '../styles/globalStyle';
import DocumentScanner from 'react-native-document-scanner-plugin';
import RNImageToPdf from 'react-native-image-to-pdf';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {generatePDFFromImages, getScanDocuemnt} from '../utils/helper';

const ScannedDocumentScreen = props => {
  const {navigation} = props;
  const [loading, setLoading] = React.useState(false);
  const [scannedImage, setScannedImage] = React.useState(null);
  const [scanedText, setScanedText] = React.useState('');
  const [pdfdoc, setPdfdoc] = React.useState(null);

  const scanDocument = async () => {
    try {
      setLoading(true);
      // start the document scanner
      const scannedImages = await getScanDocuemnt();
      navigation.navigate('viewdoc', {scanedImage: scannedImages});
      // get back an array with scanned image file paths
      //if (scannedImages.length > 0) {
      //console.log('scannedImages >>>', scannedImages);
      // const result = await TextRecognition.recognize(scannedImages[0]);
      // //console.log('Recognized text:', result.text);
      // setScanedText(result.text);
      // // set the img src, so we can view the first scanned image
      // setScannedImage(scannedImages);
      // if (scannedImages.length > 1) {
      //   myAsyncPDFFunction(scannedImages);
      // }
      setLoading(false);
      //console.log('Recognized text:', result.text);
      //}
    } catch (err) {
      console.log('err >>');
    }
  };
  React.useEffect(() => {
    scanDocument();
  }, []);

  const ScanDocUploadHandler = async () => {
    // const tempSaveObj = {
    //   scanImages: [], // array of Image like  [image1, image2, image 3, image 4, ]
    //   imagesPdf: File, // Pdf File
    //   extractedText: [
    //     {
    //       text: ' text',
    //       refImage: 'refer Image or Image URL',
    //     },
    //   ],
    // };
    //console.log('tempSaveObj')
  };

  return (
    <View style={style.container}>
      <Text>{'Scanned Docuemnt'}</Text>
      {/* <ScannerComponent /> */}
    </View>
  );
};

export default ScannedDocumentScreen;
