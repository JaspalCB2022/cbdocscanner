import {Platform, NativeModules, Appearance} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import RNImageToPdf from 'react-native-image-to-pdf';
import metrics from '../theme/metrics';
import {Image} from 'react-native-compressor';
import {processImage} from '@react-native-ml-kit/text-recognition';
import {manipulate} from 'react-native-image-manipulator';
import RNFS from 'react-native-fs';

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
          imageFit: 'contain',
          // optional maximum image dimension - larger images will be resized
          width: 594,
          height: 842,
          backgroundColor: 'white',
        },
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      return {pdfFilePath: pdf.filePath};
    }
  } catch (e) {
    console.log(e);
  }
};

const downloadImages = async imageUrls => {
  const downloadedPaths = [];

  try {
    for (let i = 0; i < imageUrls.length; i++) {
      const imageUrl = imageUrls[i];
      const imageName = `downloaded_image_${i}.jpg`; // You can customize the naming logic

      const downloadDest = `${RNFS.CachesDirectoryPath}/${imageName}`;

      const options = {
        fromUrl: imageUrl,
        toFile: downloadDest,
      };

      const response = await RNFS.downloadFile(options).promise.then(
        response => {
          console.log('File downloaded!', response);
          if (response.statusCode === 200) {
            downloadedPaths.push(downloadDest);
          } else {
            console.error(
              `Image ${i} download failed with status code: `,
              response.statusCode,
            );
            downloadedPaths.push(null);
          }
        },
      );
    }

    return downloadedPaths;
  } catch (error) {
    console.error('Error during image download: ', error);
    return downloadedPaths;
  }
};

const generatePDFFromImprovedImages = async imagePaths => {
  try {
    if (imagePaths && imagePaths.length > 0) {
      const downloadedPaths = await downloadImages(imagePaths);
      console.log('downloadedPaths>>', downloadedPaths);
      //const tempsavefile = imagePaths.map(item =>  downloadFile() item.replace('file://', ''));
      const options = {
        imagePaths: downloadedPaths,
        name: 'cbscdocpdf.pdf',
        maxSize: {
          imageFit: 'contain',
          // optional maximum image dimension - larger images will be resized
          //width: 594,
          //height: 842,
          backgroundColor: 'white',
        },
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      return {pdfFilePath: pdf.filePath};
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

const getStringFormDateHandler = datestring => {
  const moment = require('moment-timezone');
  const parsedTimestamp = moment(new Date(datestring)).format('ll');
  return parsedTimestamp;
};

const getStringFromTimeHandler = timestring => {
  const moment = require('moment-timezone');
  const parsedTimestamp = moment(new Date(timestring)).format('LT');
  return parsedTimestamp;
};

const applyFilter = async sourceUri => {
  try {
    console.log('sourceUri >>', sourceUri);
    const manipResult = await manipulate(sourceUri, [
      {brightness: 0.2}, // Adjust brightness (values between -1 and 1)
      {contrast: 1.5}, // Adjust contrast (values greater than 1)
    ]);
    return manipResult.uri;
  } catch (error) {
    console.error('Error applying filter:', error);
  }
};

export {
  generatePDFFromImprovedImages,
  applyFilter,
  AlertMsgObj,
  getScanDocuemnt,
  generatePDFFromImages,
  compressImage,
  getStringFormDateHandler,
  getStringFromTimeHandler,
};
