import React from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  Appearance,
  RefreshControl,
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

const CustomersScreen = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const userObj = useSelector(selectUserObject);
  const customers = useSelector(selectCustomerLists);
  const [search, setSearch] = React.useState('');
  const [filteredList, setFilteredList] = React.useState([]);
  const [customerList, setCustomerList] = React.useState([]);
  const isLoading = useSelector(selectLoading);
  const [refreshing, setRefreshing] = React.useState(false);

  //console.log('customerList >>', customerList);

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

  const getCustomersListHandler = () => {
    setRefreshing(true);
    console.log('function Call start');
    const headers = {
      Authorization: 'Bearer ' + userObj.token,
    };
    dispatch(fetchCustomerList(headers));
    setCustomerList(customers);
    setFilteredList(customers);
    setRefreshing(false);
  };

  const detailNavigationHandler = item => {
    navigation.navigate('customerdetail', {customerid: item.customer_id});
  };

  React.useEffect(() => {
    getCustomersListHandler();
  }, []);

  console.log(' Appearance.getColorScheme() >> ', Appearance.getColorScheme());

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
        </View>
      )}
    </View>
  );
};

export default CustomersScreen;
