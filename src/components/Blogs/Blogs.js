import React from 'react';
import './Blogs.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import BlogItem from '../BlogItem/BlogItem';

class Blogs extends React.Component {
  static propType = {
    blogs: PropTypes.arrayOf(tabDataShape),
  }

  render() {
    const { blogs } = this.props;
    const blogsItemComponents = blogs.map(blog => (
      <BlogItem
        blog={blog}
        key={blog.id}
      />
    ));
    return (
      <div className="blogs">
        <ul>{blogsItemComponents}</ul>
      </div>
    );
  }
}

export default Blogs;
