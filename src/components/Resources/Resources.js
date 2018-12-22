import React from 'react';
import './Resources.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import ResourceItem from '../ResourceItem/ResourceItem';

class Resources extends React.Component {
  static propType = {
    resources: PropTypes.arrayOf(tabDataShape),
  }

  render() {
    const { resources } = this.props;
    const resourcesItemComponents = resources.map(resource => (
      <ResourceItem
        resource={resource}
        key={resource.id}
      />
    ));
    return (
      <div className="resources">
        <ul>{resourcesItemComponents}</ul>
      </div>
    );
  }
}

export default Resources;
