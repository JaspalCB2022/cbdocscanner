import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import colors from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCustomerList,
  selectCustomerLists,
  selectUserObject,
} from '../stores/reducers/auth';
import Label from '../components/label';
import {size} from '../theme/fonts';
import styles from '../styles/customerStyle';
import ApiURL from '../services/apiURL';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../components/button';
import {AlertTypes} from '../utils/constent';
import {
  AlertMsgObj,
  compressImage,
  generatePDFFromImages,
  generatePDFFromImprovedImages,
  removeBackgroundFromImageFile,
} from '../utils/helper';
import {postApi} from '../services/api';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation, CommonActions} from '@react-navigation/native';

const SendToCustomerScreen = props => {
  const {route, navigation} = props;
  const scanedImage = route?.params?.scannedImage;
  const improvedImages = route?.params?.improvedImages;
  const toast = useToast();
  //console.log('scanedImage >>', scanedImage);
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObject);
  //const customers = useSelector(selectCustomerLists);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  //const [filteredList, setFilteredList] = React.useState(customers);
  const [customerList, setCustomerList] = React.useState(customers);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadermsg, setLoadermsg] = React.useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchFilterFunction = text => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = customerList.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const name = `${item.first_name} ${item.last_name}`;
        const itemData = name.toUpperCase() + item.mailbox_no.toString();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredList(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredList(customers);
      setSearch(text);
    }
  };

  // const getCustomersListHandler = () => {
  //   setRefreshing(true);
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + userObj.token,
  //   };
  //   dispatch(fetchCustomerList(headers));
  //   setFilteredList(customers);
  //   setCustomerList(customers);
  //   setRefreshing(false);
  // };
  const getCustomersListHandler = async () => {
    try {
      setRefreshing(true);
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${userObj.token}`,
      };
      const response = await postApi(ApiURL.GetCustomerList, {}, headers);
      //console.log('response get >>>', response);
      if (response.status === 200) {
        setCustomers(response.data.data);
        setFilteredList(response.data.data);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (err) {
      setLoading(false);
      setRefreshing(false);
    }
  };
  async function compressAllImages() {
    const tempData = [];
    for (const item of scanedImage) {
      try {
        //console.log('outputImage >>>', outputImage);
        const res = await compressImage(item);
        //console.log('res >>', res);
        //const tmpState = [...compressImages, res];
        tempData.push(res);
      } catch (error) {
        // Handle errors if needed
        console.log('erorr>>>>', error);
      }
    }
    return tempData;
  }

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

  const UploadScanedDocumentHandler = async item => {
    //console.log('Customer Object >>>', item);
    try {
      if (scanedImage.length > 0) {
        const formData = new FormData();
        setLoading(true);
        const tempdata = improvedImages; //await compressAllImages();
        // console.log('tempdata >>>', tempdata);
        if (tempdata.length > 0) {
          tempdata.forEach((item, index) => {
            //console.log('item >>', item);
            formData.append('scanImages', {
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
          ////file.uri.replace('file://', '')
          const filepath =
            Platform.OS === 'android' ? `file:///${pdfFilePath}` : pdfFilePath;

          formData.append('imagesPdf', {
            uri: filepath,
            type: 'application/pdf',
            name: 'cbscdocpdf.pdf',
          });
          formData.append('extractedText', '');
          formData.append('customer_id', item.customer_id);
          //console.log('formData >iuuuiui>', formData);
          const headers = {
            Authorization: 'Bearer ' + userObj.token,
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          };

          setLoadermsg('Sending...');
          //console.log('  ApiURL.SaveimagespdfText>>', ApiURL.SaveimagespdfText);
          //console.log('  formData>>', formData);
          //console.log('  headers>>', headers);
          const tempRes = await postApi(
            ApiURL.SaveimagespdfText,
            formData,
            headers,
          );
          //console.log('tempRes >>', tempRes);
          if (tempRes?.status === 200) {
            setLoadermsg('');
            const tempmsg = `Sent Successfully to ${item.name}.`;
            setLoading(false);
            const tempObj = AlertMsgObj(AlertTypes.success);
            //toast.show(tempRes.data.message, tempObj);
            toast.show(tempmsg, tempObj);
            //navigation.navigate('homestack', {screen: 'Home'});
            //navigation.dispatch(StackActions.popToTop());
            //navigation.navigate('homestack', {screen: 'Home', params: {}});
            handleNavigateBackToHome();
          } else {
            setLoadermsg('');
            setLoading(false);
            const tempObj = AlertMsgObj(AlertTypes.danger);
            toast.show(tempRes?.response?.data?.message, tempObj);
          }
        } else {
          setLoadermsg('');
          setLoading(false);
        }
        //setLoading(false);
      }
    } catch (err) {
      setLoadermsg('');
      //console.log('err >>', err);
      const tempObj = AlertMsgObj(AlertTypes.danger);
      toast.show(err.message, tempObj);
      setLoading(false);
      handleNavigateBackToHome();
    }
  };

  const ItemView = ({item}) => {
    return (
      <Pressable onPress={() => setSelectedRow(item)}>
        <View
          style={{
            ...styles.sendflexboxs,
            ...(selectedRow == item && styles.sendrowShadow),
          }}>
          <View style={styles.leftbox}>
            <Text style={styles.badge}>{item.mailbox_no}</Text>
            <Text
              style={
                styles.sendnames
              }>{`${item.first_name} ${item.last_name}`}</Text>
          </View>
          <View style={styles.sendrightbox}>
            {selectedRow == item && (
              <Button
                onPress={() => UploadScanedDocumentHandler(item)}
                title={'Send'}
                iconname={'send'}
                iconcolor={colors.white}
                iconsize={15}
                textColor={colors.white}
                textSize={size.font12}
                customStyle={true}
                customButtonStyle={{paddingVertical: 4}}
                loading={loading}
              />
            )}
          </View>
        </View>
      </Pressable>
    );
  };
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  React.useEffect(() => {
    getCustomersListHandler();
  }, []);

  return (
    <View style={styles.sendContainer}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: colors.black}}>{'Please wait ....'}</Text>
          <ActivityIndicator
            color={colors.buttonBackgrounColor}
            size={'large'}
          />
        </View>
      ) : (
        <>
          <View style={{marginTop: 30}}>
            <Label
              title={'Send to'}
              fontsize={size.font16}
              enablecapitalize={false}
            />
          </View>
          <View style={{paddingHorizontal: 10}}>
            <View style={styles.formRow}>
              <TextInput
                style={styles.textInputStyle}
                onChangeText={text => searchFilterFunction(text)}
                value={search}
                underlineColorAndroid="transparent"
                placeholder="Search here..."
              />
              <View style={styles.searchIcon}>
                <Icon name="magnify" size={20} color={colors.primary} />
              </View>
            </View>

            <FlatList
              data={filteredList}
              keyExtractor={(item, index) => index.toString()}
              //ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              style={{marginBottom: 90}}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={getCustomersListHandler}
                />
              }
            />
          </View>
        </>
      )}
    </View>
  );
};

export default SendToCustomerScreen;
