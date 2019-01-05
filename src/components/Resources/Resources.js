import React from 'react';
import './Resources.scss';
import PropTypes from 'prop-types';
import tabDataShape from '../../Helpers/props/tabDataShape';
import ResourceItem from '../ResourceItem/ResourceItem';

class Resources extends React.Component {
  static propType = {
    resources: PropTypes.arrayOf(tabDataShape),
    deleteTabItem: PropTypes.func,
    passTabItemToEdit: PropTypes.func,
    updateSingleIsCompleted: PropTypes.func,
  }

  render() {
    const {
      resources,
      deleteTabItem,
      passTabItemToEdit,
      updateSingleIsCompleted,
    } = this.props;
    const resourcesItemComponents = resources.map(resource => (
      <ResourceItem
        resource={resource}
        key={resource.id}
        deleteTabItem={deleteTabItem}
        passTabItemToEdit={passTabItemToEdit}
        updateSingleIsCompleted={updateSingleIsCompleted}
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
