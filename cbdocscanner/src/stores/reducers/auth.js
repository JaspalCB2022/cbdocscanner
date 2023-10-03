import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getApi, postApi} from '../../services/api';
import ApiURL from '../../services/apiURL';
import moment from 'moment';
import {stat} from 'react-native-fs';

const initialState = {
  isLoggedIn: false,
  loading: false,
  isSuccess: false,
  errorMessage: '',
  userObj: {},
  customers: [],
  customerHistory: [],
  userProfile: {},
  customerDetail: {},
  threadObject: {},
  token: true,
  allHistory: [],
  historyObj: {customer_data: [], page: 0, count: 0, totalPage: 0},
};

const authSlice = createSlice({
  name: 'userAuthReducer',
  initialState,
  reducers: {
    updateUserObj: (state, action) => {
      //console.log('updateUserObj >>', action.payload);
      const {userObj, isLogin} = action.payload;
      state.userObj = userObj;
      state.isLoggedIn = isLogin;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCustomerList.pending, state => {
      state.loading = true;
      state.customers = [];
    });
    builder.addCase(fetchCustomerList.fulfilled, (state, action) => {
      //console.log('action.payload>>', action.payload);
      state.loading = false;

      const {response} = action.payload;
      //console.log('response.data.data >>', response.data.data);
      if (response.status === 200) {
        state.customers = response.data.data;
      }
      state.isSuccess = true;
    });
    builder.addCase(fetchCustomerList.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });
    // fetchScanerProfile
    builder.addCase(fetchScanerProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchScanerProfile.fulfilled, (state, action) => {
      //console.log('action.payload>>', action.payload);
      const {response} = action.payload;
      //console.log('response.data.data >>', response.data.data);
      if (response.status === 200) {
        state.loading = false;
        const dateUSFormt = moment(response.data.data.date_of_birth).format(
          'DD-MMM-YYYY',
        );
        const tempObj = {...response.data.data, date_of_birth: dateUSFormt};
        state.userProfile = {...tempObj};
      }
      state.isSuccess = true;
    });
    builder.addCase(fetchScanerProfile.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });
    // fetchScanerProfile
    // Get Scaned Customer List
    builder.addCase(fetchScanerCustomerList.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchScanerCustomerList.fulfilled, (state, action) => {
      const {response} = action.payload;
      //console.log('action.payload>>', response.message);
      //console.log('response.data.data >>', response.data.data);
      if (response.status === 200) {
        state.loading = false;
        state.customerHistory = response.data.data;
      }
      state.isSuccess = true;
    });
    builder.addCase(fetchScanerCustomerList.rejected, (state, action) => {
      //console.log('Rejected ::', state, action);
      state.loading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });
    // Get Scaned Customer List

    // Start Customer Detail
    builder.addCase(fetchCustomerDetail.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerDetail.fulfilled, (state, action) => {
      //console.log('action.payload>>', action.payload);
      const {response} = action.payload;
      //console.log('response.data.data  fetchCustomerDetail  >>', response);
      if (response.status === 200) {
        state.loading = false;
        state.customerDetail = response.data.data;
      }
      state.isSuccess = true;
    });
    builder.addCase(fetchCustomerDetail.rejected, (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });
    //End Customer Detail

    // Start Email Thread Detail
    builder.addCase(fetchCustomerEmailThreadDetail.pending, state => {
      state.loading = true;
    });
    builder.addCase(
      fetchCustomerEmailThreadDetail.fulfilled,
      (state, action) => {
        //console.log('action.payload>>', action.payload);
        const {response} = action.payload;
        //console.log('response.data.data  fetchCustomerDetail  >>', response);
        if (response.status === 200) {
          state.loading = false;
          state.threadObject = response.data.data;
        }
        state.isSuccess = true;
      },
    );
    builder.addCase(
      fetchCustomerEmailThreadDetail.rejected,
      (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      },
    );
    //End Customer Detail

    // Get Scaned Customer List
    builder.addCase(fetchScanerAllCustomerList.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchScanerAllCustomerList.fulfilled, (state, action) => {
      const {response, query} = action.payload;
      if (response.status === 200) {
        state.loading = false;
        state.historyObj.customer_data.push(
          ...response.data.data.customer_data,
        );
        state.historyObj.totalPage = response.data.data.total_pages;
        state.historyObj.page = parseInt(query) + 1;
        state.historyObj.count = parseInt(response.data.data.total_records);
      }
      state.isSuccess = true;
    });
    builder.addCase(fetchScanerAllCustomerList.rejected, (state, action) => {
      //console.log('Rejected ::', state, action);
      state.loading = false;
      state.isSuccess = false;
      state.errorMessage = action.payload;
    });
    // Get Scaned Customer List
  },
});

export const {updateUserObj} = authSlice.actions;
export const fetchCustomerList = createAsyncThunk(
  'auth/fetchCustomerList',
  async (header, {rejectWithValue}) => {
    //console.log('Headers ioo>  ', header);
    try {
      const response = await postApi(ApiURL.GetCustomerList, {}, header);
      //console.log('response get >>>', response);
      return {response};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchScanerProfile = createAsyncThunk(
  'auth/fetchScanerProfile',
  async (header, {rejectWithValue}) => {
    //console.log(' call api Headers>  ', header);
    try {
      const response = await postApi(ApiURL.getuserdetails, {}, header);
      //console.log('response Scanner Profile >>>', response);
      return {response};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchScanerCustomerList = createAsyncThunk(
  'auth/fetchScanerCustomerList',
  async (header, {rejectWithValue}) => {
    //console.log(' call api Headers For History>  ', header);
    try {
      const page = 1;
      const response = await getApi(
        ApiURL.getstaffdetailswithcustomerimages +
          '/?all_history=false&page=' +
          page,
        header,
      );
      //console.log('response Scanner Profile >>>', response);
      return {response};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchScanerAllCustomerList = createAsyncThunk(
  'auth/fetchScanerAllCustomerList',
  async (data, {rejectWithValue}) => {
    //console.log(' call api Headers For History>  ', header);
    try {
      const page = data.page;
      const response = await getApi(
        ApiURL.getstaffdetailswithcustomerimages +
          '/?all_history=true&page=' +
          page,
        data.headers,
      );
      //console.log('response Scanner Profile >>>', response);
      return {response, query: data.page};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchCustomerDetail = createAsyncThunk(
  'auth/fetchCustomerDetail',
  async (tempObj, {rejectWithValue}) => {
    const {data, headers} = tempObj;
    //console.log(' call api Headers For History>  ', data, headers);
    try {
      const response = await postApi(
        ApiURL.getcustomerimagespdf,
        data,
        headers,
      );
      //console.log('response Scanner Profile >>>', response);
      return {response};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchCustomerEmailThreadDetail = createAsyncThunk(
  'auth/fetchCustomerEmailThreadDetail',
  async (tempObj, {rejectWithValue}) => {
    const {data, headers} = tempObj;
    //console.log(' call api Headers For History>  ', data, headers);
    try {
      const response = await postApi(ApiURL.emailthred, data, headers);
      //console.log('response Scanner Profile >>>', response);
      return {response};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const historyObj = state => state.userAuthReducer.historyObj;
export const selectUserLoginIn = state => state.userAuthReducer.isLoggedIn;
export const selectLoading = state => state.userAuthReducer.loading;
export const selectUserObject = state => state.userAuthReducer.userObj;
export const selectCustomerLists = state => state.userAuthReducer.customers;
export const selectUserProfile = state => state.userAuthReducer.userProfile;
export const selectAllHistory = state => state.userAuthReducer.allHistory;
export const selectCustomerMailThread = state =>
  state.userAuthReducer.threadObject;
export const selectCustomerDetail = state =>
  state.userAuthReducer.customerDetail;
export const selectCustomerHistory = state =>
  state.userAuthReducer.customerHistory;

export default authSlice.reducer;
