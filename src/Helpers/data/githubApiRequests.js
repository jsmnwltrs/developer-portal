import axios from 'axios';
import apiKeys from '../apiKeys';

const clientId = apiKeys.githubApi.client_id;
const clientSecret = apiKeys.githubApi.client_secret;

const getGithubProfile = githubUsername => new Promise((resolve, reject) => {
  axios.get(`https://api.github.com/users/${githubUsername}?client_id=${clientId}&client_secret=${clientSecret}`)
    .then((result) => {
      console.log(result.data);
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getGithubProfile,
};
