import React from 'react';
import tabDataShape from '../../Helpers/props/tabDataShape';
import './ResourceItem.scss';

class ResourceItem extends React.Component {
  static propTypes = {
    resource: tabDataShape,
  }

  render() {
    const { resource } = this.props;
    return (
      <li className="resource-item">
        <span>{resource.name}</span>
        <span><a href={resource.url}>Link</a></span>
      </li>
    );
  }
}

export default ResourceItem;
