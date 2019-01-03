import React from 'react';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './TutorialItem.scss';

class TutorialItem extends React.Component {
  static propTypes = {
    tutorial: tabDataShape,
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteTabItem, tutorial } = this.props;
    deleteTabItem(tutorial.id, 'tutorials');
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passTabItemToEdit, tutorial } = this.props;
    passTabItemToEdit(tutorial.id, 'tutorials');
  }


  render() {
    const { tutorial } = this.props;
    return (
      <div>
        <span>{tutorial.name}</span>
        <span><a href={tutorial.url}>Link</a></span>
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

export default TutorialItem;
