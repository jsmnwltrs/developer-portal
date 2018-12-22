import axios from 'axios';

const getGithubProfile = githubUsername => axios.get(`https://api.github.com/users/${githubUsername}`);


export default {
  getGithubProfile,
};
