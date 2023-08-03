import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  NativeModules,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import CustomerComponent from './customer';
import RNImageToPdf from 'react-native-image-to-pdf';
import metrics from '../theme/metrics';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import RenderList from './list';
import {types} from '../utils/constent';
import Button from './button';

const ScannerComponent = () => {
  const [loading, setLoading] = React.useState(false);
  const [scannedImage, setScannedImage] = React.useState(null);
  const [scanedText, setScanedText] = React.useState('');
  const [pdfdoc, setPdfdoc] = React.useState(null);
  const scanDocument = async () => {
    try {
      setLoading(true);
      // start the document scanner
      const {scannedImages} = await DocumentScanner.scanDocument();
      // get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        //console.log('scannedImages >>>', scannedImages);
        const result = await TextRecognition.recognize(scannedImages[0]);
        //console.log('Recognized text:', result.text);
        setScanedText(result.text);
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages);
        if (scannedImages.length > 1) {
          myAsyncPDFFunction(scannedImages);
        }

        setLoading(false);

        //console.log('Recognized text:', result.text);
      }
    } catch (err) {
      console.log('err >>');
    }
  };

  const myAsyncPDFFunction = async imagePaths => {
    try {
      // console.log(
      //   'imagePaths >>',
      //   imagePaths.map(item => item.replace('file://', '')),
      // );
      if (imagePaths && imagePaths.length > 0) {
        const options = {
          imagePaths: imagePaths.map(item => item.replace('file://', '')),
          name: 'cbscdocpdf.pdf',
          maxSize: {
            // optional maximum image dimension - larger images will be resized
            width: 900,
            height: Math.round(
              (metrics.screenHeight / metrics.screenWidth) * 900,
            ),
          },
          quality: 0.7, // optional compression paramter
        };
        const pdf = await RNImageToPdf.createPDFbyImages(options);
        //console.log(pdf.filePath);
        setPdfdoc(pdf.filePath);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        style={{
          backgroundColor: 'rgb(16, 129, 144)',
          paddingHorizontal: 25,
          paddingVertical: 10,
          borderRadius: 5,
          marginBottom: 10,
        }}
        onPress={scanDocument}>
        <Text style={{color: '#fff', fontWeight: '700'}}>Scan First</Text>
      </Pressable>
      <CustomerComponent />

      {loading ? (
        <ActivityIndicator color={'black'} size={'large'} />
      ) : (
        <View>
          {scannedImage && (
            <FlatList
              data={scannedImage}
              renderItem={({item}) => (
                <RenderList data={item} type={types.IMAGES} />
              )}
              keyExtractor={item => item.id}
            />
          )}

          {pdfdoc && <RenderList data={pdfdoc} type={types.PDF} />}

          {scanedText && <Text>{scanedText}</Text>}

          {scannedImage && <Button title={`Choose Customer`} />}
        </View>
      )}
    </View>
  );
};

export default ScannerComponent;
