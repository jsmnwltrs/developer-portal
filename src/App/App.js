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
    isEditing: false,
    editId: '-1',
    tabType: '',
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

  deleteTabItem = (tabId, tabType) => {
    const uid = authRequests.getCurrentUid();
    tabDataRequests.deleteRequest(tabId, tabType)
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
  }

  formSubmitEvent = (newTabItem, tabType) => {
    const uid = authRequests.getCurrentUid();
    const { isEditing, editId } = this.state;
    if (isEditing && tabType !== '') {
      tabDataRequests.putRequest(editId, tabType, newTabItem)
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
    } else if (tabType !== '') {
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

  passTabItemToEdit = (tabId, tabType) => {
    this.setState({ isEditing: true, editId: tabId, tabType });
  }

  render() {
    const {
      authed,
      podcasts,
      tutorials,
      blogs,
      resources,
      editId,
      isEditing,
      tabType,
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
      <TabForm
        onSubmit={this.formSubmitEvent}
        isEditing={isEditing}
        editId={editId}
        tabType={tabType}
      />
      <TabList
        tutorials={tutorials}
        podcasts={podcasts}
        blogs={blogs}
        resources={resources}
        deleteTabItem={this.deleteTabItem}
        passTabItemToEdit={this.passTabItemToEdit}
      />
    </div>
    );
  }
}

export default App;
