import React from 'react';
import './Blogs.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import BlogItem from '../BlogItem/BlogItem';

class Blogs extends React.Component {
  static propType = {
    blogs: PropTypes.arrayOf(tabDataShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  render() {
    const {
      blogs,
      deleteTabItem,
      passTabItemToEdit,
      updateSingleIsCompleted,
    } = this.props;
    const blogsItemComponents = blogs.map(blog => (
      <BlogItem
        blog={blog}
        key={blog.id}
        deleteTabItem={deleteTabItem}
        passTabItemToEdit={passTabItemToEdit}
        updateSingleIsCompleted={updateSingleIsCompleted}
      />
    ));
    return (
      <div className="blogs mt-4">
        <ul>{blogsItemComponents}</ul>
      </div>
    );
  }
}

export default Blogs;
