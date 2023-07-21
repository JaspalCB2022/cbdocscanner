import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loading: false,
  userObj: {},
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
  //   extraReducers: builder => {
  //     builder.addCase(fetchUserCoin.pending, state => {
  //       state.loading = true;
  //     });
  //     builder.addCase(fetchUserCoin.fulfilled, (state, action) => {
  //       const {totalCoins, activitiesList} = action.payload;
  //       state.activitiesList = activitiesList;
  //       state.totalCoins = totalCoins;
  //       state.loading = false;
  //     });
  //     builder.addCase(fetchUserCoin.rejected, state => {
  //       state.loading = false;
  //     });

  //     builder.addCase(fetchLoginUser.pending, state => {
  //       state.loading = true;
  //     });
  //     builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
  //       // const { totalCoins, activitiesList } = action.payload;
  //       // state.activitiesList = activitiesList;
  //       // state.totalCoins = totalCoins;
  //       // state.loading = false;
  //     });
  //     builder.addCase(fetchLoginUser.rejected, state => {
  //       state.loading = false;
  //     });
  //   },
});

export const {updateUserObj} = authSlice.actions;

// export const fetchLoginUser = createAsyncThunk(
//   'userAuthReducer/fetchLoginUser',
//   async userId => {
//     // const response = await getCalculateCoinsByUserId(userId);
//     // const tmpObj = await getActivitiesDocuments();
//     // const activities = tmpObj.sort((a, b) => a.name.localeCompare(b.name));
//     // return { totalCoins: response, activitiesList: activities };
//     ///return (await response.json()).data;
//   },
// );

export const selectUserLoginIn = state => state.userAuthReducer.isLoggedIn;
export const selectLoading = state => state.userAuthReducer.loading;

export default authSlice.reducer;
