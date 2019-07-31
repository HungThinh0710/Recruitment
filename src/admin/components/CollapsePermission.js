import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import $ from 'jquery';
import PaginationComponent from '../components/Pagination.js';
export default class CollapsePermission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      listChecked: []
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  // handleCheck(id) {
  //   var { listChecked } = this.state;
  //   listChecked.push(id);

  //   this.setState({
  //     listChecked: array2
  //   });
  // }

  render() {
    var i = 0;
    const { data } = this.props;
    return (
      <div>
        <Button color="primary" onClick={this.toggle} style={this.props.style}>
          {this.props.name}
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <div className="table-test">
                <table>
                  <thead>
                    <tr style={{ background: '#45b649', color: 'white' }}>
                      <th>#</th>
                      <th>Role</th>
                      <th>Description</th>
                      <th>
                        <input type="checkbox" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(e => {
                      i++;
                      return (
                        <tr key={e.id}>
                          <td>{i}</td>
                          <td>{e.name}</td>
                          <td>{e.description}</td>
                          <td>{e.action}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <br />

              <PaginationComponent
                activePage={this.props.activePage}
                itemsCountPerPage={this.props.itemsCountPerPage}
                totalItemsCount={this.props.totalItemsCount}
                pageRangeDisplayed={this.props.pageRangeDisplayed}
                onChange={this.props.onChange}
              />
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}
