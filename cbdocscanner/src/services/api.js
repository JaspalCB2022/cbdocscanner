import axios from 'axios';

export const getApi = (url, headers = null) => {
  const tempheader = headers ? {headers: headers} : null;
  return tempheader
    ? axios
        .get(url, tempheader)
        .then(res => res)
        .catch(err => err)
    : axios
        .get(url)
        .then(res => res)
        .catch(err => err);
};
export const postApi = (url, data, headers = null) => {
  const tempheader = headers ? {headers: headers} : null;
  return tempheader
    ? axios
        .post(url, data, tempheader)
        .then(res => res)
        .catch(err => err)
    : axios
        .post(url, data)
        .then(res => res)
        .catch(err => err);
};

export const PostApiWithFileProgress = (
  url,
  data,
  headers = null,
  onUploadProgress,
) => {
  console.log('with header Post api >>>', headers);
  return axios
    .post(url, data, headers, onUploadProgress)
    .then(res => res)
    .catch(err => err);
};
