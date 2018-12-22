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
import tabDataRequests from '../Helpers/data/tabDataRequests';

class App extends Component {
  state = {
    authed: false,
    github_username: '',
    tutorials: [],
    podcasts: [],
    resources: [],
    blogs: [],
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

        const currentUser = authRequests.getCurrentUid();

        tabDataRequests.getTutorials(currentUser)
          .then((tutorials) => {
            this.setState({ tutorials });
          })
          .catch((error) => {
            console.error('error on getTutorials', error);
          });

        tabDataRequests.getResources(currentUser)
          .then((resources) => {
            this.setState({ resources });
          })
          .catch((error) => {
            console.error('error on getResources', error);
          });

        tabDataRequests.getBlogs(currentUser)
          .then((blogs) => {
            this.setState({ blogs });
          })
          .catch((error) => {
            console.error('error on getBlogs', error);
          });

        tabDataRequests.getPodcasts(currentUser)
          .then((podcasts) => {
            this.setState({ podcasts });
          })
          .catch((error) => {
            console.error('error on getPodcasts', error);
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
    const {
      authed,
      podcasts,
      tutorials,
      blogs,
      resources,
    } = this.state;

    const logoutClickEvent = () => {
      authRequests.logoutUser();
      this.setState({ authed: false, github_username: '' });
    };

    if (!authed) {
      return (
        <div className="App">
          <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
          <Auth isAuthenticated={this.isAuthenticated} />
        </div>
      );
    }
    return (
      <div className="App">
      <MyNavbar isAuthed={authed} logoutClickEvent={logoutClickEvent}/>
      <TabList tutorials={tutorials} podcasts={podcasts} blogs={blogs} resources={resources}/>
    </div>
    );
  }
}

export default App;
