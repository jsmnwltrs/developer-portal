import React from 'react';
import logo from '../../Helpers/styling/logo.png';
import './Auth.scss';
import authRequests from '../../Helpers/data/authRequests';

class Auth extends React.Component {
  authenticateUser = (e) => {
    e.preventDefault();
    authRequests.authenticate().then((result) => {
      const user = result.additionalUserInfo.username;
      this.props.isAuthenticated(user);
    }).catch(error => console.error('error with auth', error));
  }

  render() {
    return (
      <div className="Auth mt-4">
        <button className="btn btn-light" onClick={this.authenticateUser}>Login with Github  <img className="githubLogo" alt="logo" src={logo}/></button>
      </div>
    );
  }
}

export default Auth;
