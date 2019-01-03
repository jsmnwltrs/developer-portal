import React from 'react';
import './Tutorials.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import TutorialItem from '../TutorialItem/TutorialItem';

class Turtorials extends React.Component {
  static propType = {
    tutorials: PropTypes.arrayOf(tabDataShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
  }

  render() {
    const { tutorials, deleteTabItem, passTabItemToEdit } = this.props;
    const tutorialsItemComponents = tutorials.map(tutorial => (
      <TutorialItem
        tutorial={tutorial}
        key={tutorial.id}
        deleteTabItem={deleteTabItem}
        passTabItemToEdit={passTabItemToEdit}
      />
    ));
    return (
      <div className="tutorials">
        <ul>{tutorialsItemComponents}</ul>
      </div>
    );
  }
}

export default Turtorials;
