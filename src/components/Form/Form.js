import React from 'react';
import './Form.scss';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import authRequests from '../../Helpers/data/authRequests';

const defaultTabItem = {
  name: '',
  url: '',
  uid: '',
};

class TabForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  }

  state = {
    newTabItem: defaultTabItem,
    tabType: '',
  }

  formFieldStringState = (name, e) => {
    e.preventDefault();
    const tempTabItem = { ...this.state.newTabItem };
    tempTabItem[name] = e.target.value;
    this.setState({ newTabItem: tempTabItem });
  }

  setTabTypeState = (e) => {
    e.preventDefault();
    const newTabType = e.target.value;
    this.setState({ tabType: newTabType });
  };

  tabTypeChange = e => this.setTabTypeState(e)

  nameChange = e => this.formFieldStringState('name', e)

  linkChange = e => this.formFieldStringState('url', e)

  formSubmit = (e) => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const { tabType } = this.state;
    const myTabItem = { ...this.state.newTabItem };
    myTabItem.uid = authRequests.getCurrentUid();
    onSubmit(myTabItem, tabType);
    this.setState({ newTabItem: defaultTabItem, tabType: '' });
  }

  render() {
    const { newTabItem } = this.state;
    return (
      <div className="form">
      <Form onSubmit={this.formSubmit}>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="form-name"
            id="name"
            placeholder="add name"
            value={newTabItem.name}
            onChange= {this.nameChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="link">Link:</Label>
          <Input
            type="text"
            name="form-link"
            id="link"
            placeholder="add url link"
            value={newTabItem.url}
            onChange= {this.linkChange}
          />
        </FormGroup>
        <FormGroup tag="fieldset">
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="tutorials"
                value="tutorials"
                onChange={ this.tabTypeChange }
              />{' '}
              Tutorial
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="resources"
                value="resources"
                onClick={ this.tabTypeChange }
              />{' '}
              Resource
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="blogs"
                value="blogs"
                onClick={ this.tabTypeChange }
              />{' '}
              Blog
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="radio"
                name="podcasts"
                value="podcasts"
                onClick={ this.tabTypeChange }
              />{' '}
              Podcast
            </Label>
          </FormGroup>
        </FormGroup>
        <Button>Save</Button>
      </Form>
      </div>
    );
  }
}

export default TabForm;
