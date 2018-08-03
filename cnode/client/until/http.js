import axios from 'axios';

const baseUrl = process.env.API_BASE || '';
const parseUrl = (url, params) => {
      const param = params || {};
      const str = Object.keys(param).reduce((result, key) => {
      let results = '';
      results += `${key}=${param[key]}&`;
      return results
    }, '');
  return `${baseUrl}/api${url}?${str.substr(0, str.length - 1)}`
};

export const get = (url, params) => (
  new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params))
      .then( (resp) => {
        const { data } = resp;
        if ( data && data.success === true ) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
);
export const post = (url, params, datas) => (
  new Promise((resolve, reject) => {
    axios.post(parseUrl(url, params), datas)
      .then((resp) => {
        const { data } = resp;
        if ( data && data.success === true ) {
          resolve(data)
        } else {
          reject(data)
        }
      }).catch(reject)
  })
);

