import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  Appearance,
  RefreshControl,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import colors from '../theme/colors';
import Label from '../components/label';
import {size} from '../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchCustomerList,
  selectCustomerLists,
  selectLoading,
  selectUserObject,
} from '../stores/reducers/auth';
import styles from '../styles/customerStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {postApi} from '../services/api';
import ApiURL from '../services/apiURL';

const CustomersScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObject);
  //const customers = useSelector(selectCustomerLists);
  //const isLoading = useSelector(selectLoading);

  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [reloadComp, setReloadComp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchFilterFunction = text => {
    const newData = customers.filter(item => {
      const name = `${item.first_name} ${item.last_name}`;
      const itemData = `${name.toUpperCase()}${item.mailbox_no.toString()}`;
      const textData = text.toUpperCase();
      return itemData.includes(textData);
    });
    setFilteredList(text ? newData : customers);
    setSearch(text);
  };

  const getCustomersListHandler = async () => {
    try {
      setRefreshing(true);
      setIsLoading(true);
      const headers = {
        Authorization: `Bearer ${userObj.token}`,
      };
      const response = await postApi(ApiURL.GetCustomerList, {}, headers);
      //console.log('response get >>>', response);
      if (response.status === 200) {
        setCustomers(response.data.data);
        setFilteredList(response.data.data);
      }
      setIsLoading(false);
      setRefreshing(false);
    } catch (err) {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const detailNavigationHandler = item => {
    navigation.navigate('customerdetail', {
      customerid: item.customer_id,
    });
  };

  const addCustomerNavigation = () => {
    navigation.navigate('addcustomer', {
      getCustomers: getCustomersListHandler,
    });
  };

  useEffect(() => {
    getCustomersListHandler();
  }, []);

  // useEffect(() => {
  //   LogBox.ignoreLogs(['Ignoring non-serializable logs']);
  // }, []);

  const ItemView = ({item}) => {
    return (
      <>
        <View style={styles.flexboxs}>
          <View style={styles.leftbox}>
            <Text style={styles.badge}>{item.mailbox_no}</Text>
            <Text
              style={{
                ...styles.names,
              }}>{`${item.first_name} ${item.last_name}`}</Text>
          </View>
          <View style={styles.rightbox}>
            <View style={styles.mailbox}>
              <View style={styles.flexs}>
                <Icon name="email" size={18} color={colors.primary} />
                <Text style={styles.mailtxt}>{item.email}</Text>
              </View>
              {item.second_email && (
                <View style={styles.flexs}>
                  <Icon name="email" size={18} color={colors.primary} />
                  <Text style={styles.mailtxt}>{item.second_email}</Text>
                </View>
              )}
            </View>
            <View style={styles.iconarow}>
              <Pressable onPress={() => detailNavigationHandler(item)}>
                <Icon name="arrow-right" size={18} color={colors.primary} />
              </Pressable>
            </View>
          </View>
        </View>
      </>
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
  return (
    <View
      style={{
        flex: 1,
        //justifyContent: 'center',
        //alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        paddingHorizontal: 10,
      }}>
      {isLoading ? (
        <ActivityIndicator size={'large'} color={colors.primary} />
      ) : (
        <>
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
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              style={{marginBottom: 40}}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={getCustomersListHandler}
                />
              }
            />
            <View
              style={{
                position: 'absolute',
                bottom: 50,
                right: 20,
                backgroundColor: colors.primary,
                borderRadius: 50,
                padding: 10,
              }}>
              <TouchableOpacity onPress={addCustomerNavigation}>
                <Icon name="plus" size={40} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default CustomersScreen;
