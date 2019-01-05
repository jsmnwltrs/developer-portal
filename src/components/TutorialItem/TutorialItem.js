import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './TutorialItem.scss';

class TutorialItem extends React.Component {
  static propTypes = {
    tutorial: tabDataShape,
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
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

  updateIsCompleted = (e) => {
    const { tutorial, updateSingleIsCompleted } = this.props;
    const isCompleted = e.target.checked;
    updateSingleIsCompleted(tutorial.id, isCompleted, 'tutorials');
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
        <span className="col">
        <FormGroup check>
                <Label check>
                  <Input type="checkbox" checked={tutorial.isCompleted} onChange={this.updateIsCompleted}/>{' '}
                Done
                </Label>
          </FormGroup>
        </span>
      </div>
    );
  }
}

export default TutorialItem;
