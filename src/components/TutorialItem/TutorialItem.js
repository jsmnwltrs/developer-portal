import React from 'react';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './TutorialItem.scss';

class TutorialItem extends React.Component {
  static propTypes = {
    tutorial: tabDataShape,
  }

  render() {
    const { tutorial } = this.props;
    return (
      <li className="tutorial-item">
        <span>{tutorial.name}</span>
        <span><a href={tutorial.url}>Link</a></span>
      </li>
    );
  }
}

export default TutorialItem;
