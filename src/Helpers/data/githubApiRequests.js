import axios from 'axios';
// import apiKeys from '../apiKeys';

// const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getGithubProfile = () => axios.get('https://developer.github.com/v3/users/jsmwltrs');


export default {
  getGithubProfile,
};
