import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getApi, postApi} from '../../services/api';
import ApiURL from '../../services/apiURL';

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
};

const authSlice = createSlice({
  name: 'userAuthReducer',
  initialState,
  reducers: {
    updateUserObj: (state, action) => {
      console.log('updateUserObj >>', action.payload);
      const {userObj, isLogin} = action.payload;
      state.userObj = userObj;
      state.isLoggedIn = isLogin;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCustomerList.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCustomerList.fulfilled, (state, action) => {
      //console.log('action.payload>>', action.payload);
      const {response} = action.payload;
      //console.log('response.data.data >>', response.data.data);
      if (response.status === 200) {
        state.loading = false;
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
      console.log('response.data.data >>', response.data.data);
      if (response.status === 200) {
        state.loading = false;
        state.userProfile = response.data.data;
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
      console.log('action.payload>>', response.message);

      //console.log('response.data.data >>', response.data.data);
      if (response.status === 200) {
        state.loading = false;
        state.customerHistory = response.data.data;
      }
      state.isSuccess = true;
    });
    builder.addCase(fetchScanerCustomerList.rejected, (state, action) => {
      console.log('Rejected ::', state, action);

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
      const {response} = action.payload;
      console.log('action.payload>>', response.message);

      //console.log('response.data.data >>', response.data.data);
      if (response.status === 200) {
        state.loading = false;
        state.allHistory = response.data.data;
      }
      state.isSuccess = true;
    });
    builder.addCase(fetchScanerAllCustomerList.rejected, (state, action) => {
      console.log('Rejected ::', state, action);

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
    console.log(' call api Headers For History>  ', header);
    try {
      const response = await getApi(
        ApiURL.getstaffdetailswithcustomerimages + '/?all_history=false',
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
  async (header, {rejectWithValue}) => {
    console.log(' call api Headers For History>  ', header);
    try {
      const response = await getApi(
        ApiURL.getstaffdetailswithcustomerimages + '/?all_history=true',
        header,
      );
      //console.log('response Scanner Profile >>>', response);
      return {response};
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
      console.log('response Scanner Profile >>>', response);
      return {response};
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

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
