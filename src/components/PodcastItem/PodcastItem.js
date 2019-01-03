import React from 'react';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './PodcastItem.scss';

class PodcastItem extends React.Component {
  static propTypes = {
    podcast: tabDataShape,
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteTabItem, podcast } = this.props;
    deleteTabItem(podcast.id, 'podcasts');
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passTabItemToEdit, podcast } = this.props;
    passTabItemToEdit(podcast.id, 'podcasts');
  }


  render() {
    const { podcast } = this.props;
    return (
      <div>
        <span>{podcast.name}</span>
        <span><a href={podcast.url}>Link</a></span>
        <span className="col">
          <button className="btn btn-dark" onClick={this.editEvent}><i className="far fa-edit"/></button>
        </span>
        <span className="col">
          <button className="btn btn-dark" onClick={this.deleteEvent}><i className="far fa-trash-alt"/></button>
        </span>
      </div>
    );
  }
}

export default PodcastItem;
