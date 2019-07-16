import React, { Component } from 'react'
import Pagination from "react-js-pagination";
import './Pagination.css';
export default class PaginationComponent extends Component {
  render() {
    return (
      <Pagination
          activePage={this.props.activePage}
          itemsCountPerPage={this.props.itemCountPerPage}
          totalItemsCount={this.props.totalItemsCount}
          pageRangeDisplayed={this.props.pageRangeDisplayed}
          onChange={this.props.onChange}
        />
    )
  }
}
