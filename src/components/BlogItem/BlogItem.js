import React from 'react';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './BlogItem.scss';

class BlogItem extends React.Component {
  static propTypes = {
    blog: tabDataShape,
  }

  render() {
    const { blog } = this.props;
    return (
      <li className="blog-item">
        <span>{blog.name}</span>
        <span><a href={blog.url}>Link</a></span>
      </li>
    );
  }
}

export default BlogItem;
