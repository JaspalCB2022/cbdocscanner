import {API_LOCALBASEURL} from '@env';
const API_LOCALBASEURL_New = 'http://192.168.29.170:7000/api/';
const ApiURL = {
  GenerateOTP: API_LOCALBASEURL_New + 'generateotp',
  Login: API_LOCALBASEURL_New + 'login',
  GetCustomerList: API_LOCALBASEURL_New + 'getcustomerslist',
  SaveimagespdfText: API_LOCALBASEURL_New + `SaveimagespdfText`,
};

export default ApiURL;
