import axios from 'axios';
// import apiKeys from '../apiKeys';

// const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getGithubProfile = githubUsername => axios.get(`https://api.github.com/users/${githubUsername}`);


export default {
  getGithubProfile,
};
