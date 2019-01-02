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
import TabForm from '../components/Form/Form';

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
          .then(() => {
          })
          .catch((error) => {
            console.error(error);
          });

        const currentUser = authRequests.getCurrentUid();

        tabDataRequests.getRequest(currentUser, 'tutorials')
          .then((tutorials) => {
            this.setState({ tutorials });
          });

        tabDataRequests.getRequest(currentUser, 'podcasts')
          .then((podcasts) => {
            this.setState({ podcasts });
          });

        tabDataRequests.getRequest(currentUser, 'blogs')
          .then((blogs) => {
            this.setState({ blogs });
          });

        tabDataRequests.getRequest(currentUser, 'resources')
          .then((resources) => {
            this.setState({ resources });
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

  formSubmitEvent = (newTabItem, tabType) => {
    if (tabType !== '') {
      const uid = authRequests.getCurrentUid();
      tabDataRequests.postRequest(newTabItem, tabType)
        .then(() => {
          tabDataRequests.getRequest(uid, tabType)
            .then((tabItems) => {
              if (tabType === 'tutorials') {
                this.setState({ tutorials: tabItems });
              } else if (tabType === 'podcasts') {
                this.setState({ podcasts: tabItems });
              } else if (tabType === 'blogs') {
                this.setState({ blogs: tabItems });
              } else if (tabType === 'resources') {
                this.setState({ resources: tabItems });
              }
            });
        })
        .catch((error) => {
          console.error('error on formSubmitEvent', error);
        });
    } else {
      alert('no tab type has been selected');
    }
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
      <TabForm onSubmit={this.formSubmitEvent} />
      <TabList tutorials={tutorials} podcasts={podcasts} blogs={blogs} resources={resources}/>
    </div>
    );
  }
}

export default App;
