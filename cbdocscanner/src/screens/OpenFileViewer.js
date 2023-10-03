import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {fileType} from '../utils/constent';
import colors from '../theme/colors';

const OpenFileViewer = props => {
  const {route} = props;
  const {fileurl, filetype} = route.params;

  //console.log('fileurl >>', fileurl, filetype);

  return (
    <View style={styles.container}>
      {filetype === fileType.PDF && (
        <Pdf
          trustAllCerts={false}
          source={{uri: fileurl, cache: true}}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          enableAntialiasing={true}
          renderActivityIndicator={() => (
            <ActivityIndicator size={'large'} color={colors.primary} />
          )}
          style={styles.pdf}
        />
      )}
      {filetype === fileType.Image && (
        <Image source={{uri: fileurl}} style={styles.pdf} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,

    //marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default OpenFileViewer;
