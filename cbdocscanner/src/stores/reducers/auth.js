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
      const {response, data} = action.payload;
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
  },
});

export const {updateUserObj} = authSlice.actions;

export const fetchCustomerList = createAsyncThunk(
  'auth/sendOTP',
  async (header, {rejectWithValue}) => {
    //console.log('Headers>  ', header);
    try {
      const response = await getApi(ApiURL.GetCustomerList, header);
      //console.log('response >>>', response);
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

export default authSlice.reducer;
