import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import classnames from 'classnames';
import './TabList.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import Podcasts from '../Podcasts/Podcasts';
import Tutorials from '../Tutorials/Tutorials';
import Blogs from '../Blogs/Blogs';
import Resources from '../Resources/Resources';

class TabList extends Component {
  static propType = {
    tutorials: PropTypes.arrayOf(tabDataShape),
    resources: PropTypes.arrayOf(tabDataShape),
    blogs: PropTypes.arrayOf(tabDataShape),
    podcasts: PropTypes.arrayOf(tabDataShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      tutorials,
      podcasts,
      blogs,
      resources,
      deleteTabItem,
      passTabItemToEdit,
    } = this.props;
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Tutorials
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Resources
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Blogs
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('4'); }}
            >
              Podcasts
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <h2>Tutorials</h2>
            <Tutorials
              tutorials={tutorials}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
            />
          </TabPane>
          <TabPane tabId="2">
          <h2>Resources</h2>
            <Resources
              resources={resources}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
            />
          </TabPane>
          <TabPane tabId="3">
          <h2>Blogs</h2>
            <Blogs
              blogs={blogs}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
            />
          </TabPane>
          <TabPane tabId="4">
          <h2>Podcasts</h2>
            <Podcasts
              podcasts={podcasts}
              deleteTabItem={deleteTabItem}
              passTabItemToEdit={passTabItemToEdit}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default TabList;
