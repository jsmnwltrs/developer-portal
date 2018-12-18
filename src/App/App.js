import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from '../components/Auth/Auth';
import MyNavbar from '../components/MyNavbar/MyNavbar';
import TabList from '../components/TabList/TabList';
import connection from '../Helpers/data/connection';
import authRequests from '../Helpers/data/authRequests';
import githubApiRequests from '../Helpers/data/githubApiRequests';

class App extends Component {
  state = {
    authed: false,
    github_username: '',
  };

  componentDidMount() {
    connection();

    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
        });
        const githubUser = this.state.github_username;
        githubApiRequests.getGithubProfile(githubUser)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.setState({
          authed: false,
        });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  isAuthenticated = (username) => {
    this.setState({
      authed: true,
      github_username: username,
    });
  }

  render() {
    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false, github_username: '' });
    };

    if (!this.state.authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }
    return (
      <div className="App">
      <MyNavbar isAuthed={this.state.authed} logoutClickEvent={logoutClickEvent}/>
      <p>You logged in</p>
      <TabList />
    </div>
    );
  }
}

export default App;
