import React from 'react';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './PodcastItem.scss';

class PodcastItem extends React.Component {
  static propTypes = {
    podcast: tabDataShape,
  }

  render() {
    const { podcast } = this.props;
    return (
      <li className="podcast-item">
        <span>{podcast.name}</span>
        <span><a href={podcast.url}>Link</a></span>
      </li>
    );
  }
}

export default PodcastItem;
