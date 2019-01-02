import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getRequest = (uid, tabType) => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/${tabType}.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const tabData = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          tabData.push(res.data[key]);
        });
      }
      resolve(tabData);
    })
    .catch((error) => {
      reject(error);
    });
});

const postRequest = (tabItem, tabType) => axios.post(`${firebaseUrl}/${tabType}.json`, tabItem);

export default {
  getRequest,
  postRequest,
};
