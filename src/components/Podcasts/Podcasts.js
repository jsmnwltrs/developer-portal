import React from 'react';
import './Podcasts.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import PodcastItem from '../PodcastItem/PodcastItem';

class Podcasts extends React.Component {
  static propType = {
    podcasts: PropTypes.arrayOf(tabDataShape),
  }

  render() {
    const { podcasts } = this.props;
    const podcastsItemComponents = podcasts.map(podcast => (
      <PodcastItem
        podcast={podcast}
        key={podcast.id}
      />
    ));
    return (
      <div className="podcasts">
        <ul>{podcastsItemComponents}</ul>
      </div>
    );
  }
}

export default Podcasts;
