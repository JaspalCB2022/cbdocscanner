import DocumentScanner from 'react-native-document-scanner-plugin';
import RNImageToPdf from 'react-native-image-to-pdf';
import metrics from '../theme/metrics';
import {Image} from 'react-native-compressor';

const AlertMsgObj = msgtype => {
  return {
    type: msgtype,
    placement: 'top',
    duration: 1000,
    offset: 30,
    animationType: 'zoom-in',
  };
};

const getScanDocuemnt = async () => {
  const {scannedImages} = await DocumentScanner.scanDocument({
    maxNumDocuments: 1,
  });
  return scannedImages;
};

const generatePDFFromImages = async imagePaths => {
  try {
    if (imagePaths && imagePaths.length > 0) {
      const tempsavefile = imagePaths.map(item => item.replace('file://', ''));
      const options = {
        imagePaths: tempsavefile,
        name: 'cbscdocpdf.pdf',
        maxSize: {
          // optional maximum image dimension - larger images will be resized
          width: 600,
          height: Math.round(
            (metrics.screenHeight / metrics.screenWidth) * 600,
          ),
        },
        quality: 0.6, // optional compression paramter
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      //console.log(pdf.filePath);
      return pdf.filePath;
    }
  } catch (e) {
    console.log(e);
  }
};

async function compressImage(item) {
  try {
    const compressedFileUri = await Image.compress(item, {
      compressionMethod: 'auto',
    });
    return compressedFileUri; // You can return the compressed file URI or any other data you want.
  } catch (error) {
    console.error('Error compressing image:', error);
    return null; // You can return an error value or handle the error as needed.
  }
}

export {AlertMsgObj, getScanDocuemnt, generatePDFFromImages, compressImage};
