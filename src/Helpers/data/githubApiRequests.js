import axios from 'axios';
// import apiKeys from '../apiKeys';

// const firebaseUrl = apiKeys.firebaseConfig.databaseURL;

const getGithubProfile = () => axios.get('https://api.github.com/users/jsmnwltrs');


export default {
  getGithubProfile,
};
