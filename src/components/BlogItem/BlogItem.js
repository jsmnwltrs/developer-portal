import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './BlogItem.scss';

class BlogItem extends React.Component {
  static propTypes = {
    blog: tabDataShape,
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteTabItem, blog } = this.props;
    deleteTabItem(blog.id, 'blogs');
  }

  editEvent = (e) => {
    e.preventDefault();
    const { passTabItemToEdit, blog } = this.props;
    passTabItemToEdit(blog.id, 'blogs');
  }

  updateIsCompleted = (e) => {
    const { blog, updateSingleIsCompleted } = this.props;
    const isCompleted = e.target.checked;
    updateSingleIsCompleted(blog.id, isCompleted, 'blogs');
  }

  render() {
    const { blog } = this.props;
    return (
      <div className="blog-item">
        <span>{blog.name}</span>
        <span><a href={blog.url}>Link</a></span>
        <span className="col">
          <button className="btn btn-dark" onClick={this.editEvent}><i className="far fa-edit"/></button>
        </span>
        <span className="col">
          <button className="btn btn-dark" onClick={this.deleteEvent}><i className="far fa-trash-alt"/></button>
        </span>
        <span className="col">
          <FormGroup check>
                <Label check>
                  <Input type="checkbox" checked={blog.isCompleted} onChange={this.updateIsCompleted}/>{' '}
                Done
                </Label>
          </FormGroup>
        </span>
      </div>
    );
  }
}

export default BlogItem;
