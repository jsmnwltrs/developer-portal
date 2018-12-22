import axios from 'axios';
import apiKeys from '../apiKeys';

const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getTutorials = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/tutorials.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const tutorials = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          tutorials.push(res.data[key]);
        });
      }
      resolve(tutorials);
    })
    .catch((error) => {
      reject(error);
    });
});

const getResources = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/resources.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const resources = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          resources.push(res.data[key]);
        });
      }
      resolve(resources);
    })
    .catch((error) => {
      reject(error);
    });
});

const getBlogs = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/blogs.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const blogs = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          blogs.push(res.data[key]);
        });
      }
      resolve(blogs);
    })
    .catch((error) => {
      reject(error);
    });
});


const getPodcasts = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/podcasts.json?orderBy="uid"&equalTo="${uid}"`)
    .then((res) => {
      const podcasts = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          podcasts.push(res.data[key]);
        });
      }
      resolve(podcasts);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getBlogs,
  getPodcasts,
  getResources,
  getTutorials,
};
