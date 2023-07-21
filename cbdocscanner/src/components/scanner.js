import React from 'react';
import {View, Text} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const ScannerComponent = () => {
  const [scannedImage, setScannedImage] = React.useState(null);
  const scanDocument = async () => {
    try {
      // start the document scanner
      const {scannedImages} = await DocumentScanner.scanDocument();
      // get back an array with scanned image file paths
      if (scannedImages.length > 0) {
        // set the img src, so we can view the first scanned image
        setScannedImage(scannedImages[0]);
      }
    } catch (err) {
      console.log('err >>');
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Pressable
        style={{
          backgroundColor: 'rgb(16, 129, 144)',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={scanDocument}>
        <Text style={{color: '#fff', fontWeight: '700'}}>Scan Document</Text>
      </Pressable>

      {scannedImage ? (
        <Image
          resizeMode="contain"
          style={{height: 450, width: 450, marginTop: 40}}
          source={{uri: scannedImage}}
        />
      ) : (
        ''
      )}
    </View>
  );
};

export default ScannerComponent;
