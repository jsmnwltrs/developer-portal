import React from 'react';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './BlogItem.scss';

class BlogItem extends React.Component {
  static propTypes = {
    blog: tabDataShape,
    deleteTabItem: PropTypes.func,
  }

  deleteEvent = (e) => {
    e.preventDefault();
    const { deleteTabItem, blog } = this.props;
    deleteTabItem(blog.id, 'blogs');
  }

  render() {
    const { blog } = this.props;
    return (
      <div>
        <span>{blog.name}</span>
        <span><a href={blog.url}>Link</a></span>
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

export default BlogItem;
