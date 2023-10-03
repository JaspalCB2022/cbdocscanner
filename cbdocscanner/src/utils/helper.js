import {
  Platform,
  NativeModules,
  Appearance,
  Image as RNImage,
} from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import metrics from '../theme/metrics';
import {Image} from 'react-native-compressor';
import {manipulate} from 'react-native-image-manipulator';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {createPdf} from 'react-native-images-to-pdf';

const AlertMsgObj = msgtype => {
  return {
    type: msgtype,
    placement: 'bottom',
    duration: 2000,
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

      const downloadDest = `${RNFS.DocumentDirectoryPath}/${imageName}`;

      const options = {
        fromUrl: imageUrl,
        toFile: downloadDest,
      };

      const response = await RNFS.downloadFile(options).promise.then(
        response => {
          //console.log('File downloaded!', response);
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

// const generatePDFFromImprovedImages = async imagePaths => {
//   try {
//     if (imagePaths && imagePaths.length > 0) {
//       const downloadedPaths = await downloadImages(imagePaths);
//       console.log('downloadedPaths>>', downloadedPaths);
//       //const tempsavefile = imagePaths.map(item =>  downloadFile() item.replace('file://', ''));
//       const options = {
//         imagePaths: downloadedPaths,
//         name: 'cbscdocpdf.pdf',
//         maxSize: {
//           imageFit: 'contain',
//           // optional maximum image dimension - larger images will be resized
//           //width: 594,
//           //height: 842,
//           backgroundColor: 'white',
//         },
//       };
//       const pdf = await RNImageToPdf.createPDFbyImages(options);
//       return {pdfFilePath: pdf.filePath};
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };

// const generatePDFFromImprovedImages__OLD = async imagePaths => {
//   // const images = [
//   //   'path/to/image1.jpg',
//   //   'path/to/image2.jpg',
//   //   'path/to/image3.jpg',
//   // ];
//   console.log('imagePaths >>', imagePaths);

//   if (imagePaths && imagePaths.length > 0) {
//     //const downloadedPaths = await downloadImages(imagePaths);
//     //console.log('downloadedPaths >> ', downloadedPaths);
//     const filePath = RNFS.DocumentDirectoryPath + '/cbscdocpdf.pdf';

//     const pdfOptions = {
//       html: `<html>
//       <body>${imagePaths
//         .map((url, index) => `<img src="${url}" alt="Image ${index + 1}/>`)
//         .join('')}</body></html>`,
//       fileName: 'cbscdocpdf',
//       directory: 'Documents',
//     };

//     try {
//       const pdf = await RNHTMLtoPDF.convert(pdfOptions);
//       console.log('PDF generated', pdf);
//       //return { pdfFilePath: pdf.filePath };
//       return {pdfFilePath: filePath};
//     } catch (error) {
//       console.error('Error generating PDF', error);
//     }
//   }
// };
const generatePDFFromImprovedImages = async imagePaths => {
  if (imagePaths && imagePaths.length > 0) {
    if (Platform.OS === 'android') {
      //const downloadedPaths = await downloadImages(imagePaths);
      //console.log('downloadedPaths >> ', downloadedPaths);
      const pdfOptions = {
        html: `<html>
      <body>
        ${imagePaths
          .map(
            (image, index) => `
          <img src="${image}" alt="Image ${
              index + 1
            }" style="max-width: 100%; height: 100%;" />
        `,
          )
          .join('')}
      </body>
    </html>`,
        fileName: 'cbscdocpdf',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(pdfOptions);
      //console.log('PDF generated', pdf);
      return {pdfFilePath: pdf.filePath};
    } else {
      const filePath = RNFS.DocumentDirectoryPath + '/cbscdocpdf.pdf';
      const pages = [];
      for (let imagepath of imagePaths) {
        pages.push({
          imagePath: imagepath,
          imageFit: 'contain',
        });
      }

      try {
        //console.log('filePath>>', filePath);
        const uri = await createPdf({
          outputPath: `file://${filePath}`,
          pages,
        });
        return {pdfFilePath: uri};
      } catch (error) {
        console.error('Error generating PDF', error);
      }
    }
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

export {
  generatePDFFromImprovedImages,
  AlertMsgObj,
  getScanDocuemnt,
  generatePDFFromImages,
  compressImage,
  getStringFormDateHandler,
  getStringFromTimeHandler,
};
