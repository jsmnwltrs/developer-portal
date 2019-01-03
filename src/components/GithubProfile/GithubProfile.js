import React from 'react';
import PropTypes from 'prop-types';

class GithubProfile extends React.Component {
  static propType = {
    githubCommits: PropTypes.string,
    githubProfileLink: PropTypes.string,
    githubProfilePic: PropTypes.string,
    githubUsername: PropTypes.string,
  }

  render() {
    const {
      githubCommits,
      githubProfileLink,
      githubProfilePic,
      githubUsername,
    } = this.props;
    return (
      <div>
        <img src={githubProfilePic} alt="github profile pic"/>
        <h4>{githubUsername}</h4>
        <p>{githubProfileLink}</p>
        <p>{githubCommits}</p>
      </div>
    );
  }
}

export default GithubProfile;
