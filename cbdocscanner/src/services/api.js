import axios from 'axios';

export const getApi = (url, headers = null) => {
  //console.log('headers >>>', headers);
  //console.log('url >>', url);
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
  console.log('headers jhjh >>>', headers);
  console.log('data >>', data);
  console.log('url >>', url);
  const tempheader = headers ? {headers: headers} : null;

  console.log('tempheader >>', tempheader);

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
