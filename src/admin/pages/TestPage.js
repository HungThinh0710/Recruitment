import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Button } from 'reactstrap';
import Select from 'react-select';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
];
export default class TestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    };
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <Card>
        <CardBody>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
          />
          <div style={{ marginBottom: '100px' }} />
        </CardBody>
      </Card>
    );
  }
}
