import {API_LOCALBASEURL} from '@env';
//const API_LOCALBASEURL_New = 'http://192.168.29.170:7000/api/'; //local server;
const API_LOCALBASEURL_New = 'http://3.22.65.185:8090/api/'; // Production Server
const ApiURL = {
  GenerateOTP: API_LOCALBASEURL_New + 'generateotp',
  Login: API_LOCALBASEURL_New + 'login',
  GetCustomerList: API_LOCALBASEURL_New + 'getcustomerslist',
  SaveimagespdfText: API_LOCALBASEURL_New + 'SaveimagespdfText/',
  getuserdetails: API_LOCALBASEURL_New + 'getuserdetails',
  logoutuser: API_LOCALBASEURL_New + 'logoutuser',
  getstaffdetailswithcustomerimages:
    API_LOCALBASEURL_New + 'getstaffdetailswithcustomerimages',
  getcustomerimagespdf: API_LOCALBASEURL_New + `getcustomerimagespdf`,
  updateDocuemnt: API_LOCALBASEURL_New + 'updatedocument/',
  emailthred: API_LOCALBASEURL_New + 'emailthred/',
  threshouldimage: API_LOCALBASEURL_New + 'threshouldimage',
  createCustomer: API_LOCALBASEURL_New + 'staff/create_customer/',
};

export default ApiURL;
