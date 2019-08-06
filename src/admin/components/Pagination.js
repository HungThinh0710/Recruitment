import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import './Pagination.css';
export default class PaginationComponent extends Component {
  render() {
    const { activePage, itemsCountPerPage, totalItemsCount } = this.props;
    var numberBegin = 0;
    totalItemsCount === 0
      ? (numberBegin = 0)
      : (numberBegin = (activePage - 1) * itemsCountPerPage + 1);
    return (
      <div className="pagination-area">
        {activePage * itemsCountPerPage < totalItemsCount ? (
          <span className="text-total-paginate">
            Showing {numberBegin} to {activePage * itemsCountPerPage} of{' '}
            {this.props.totalItems} entries
          </span>
        ) : (
          <span className="text-total-paginate">
            Showing {numberBegin} to {totalItemsCount} of{' '}
            {this.props.totalItems} entries
          </span>
        )}

        <Pagination
          activePage={this.props.activePage}
          itemsCountPerPage={this.props.itemsCountPerPage}
          totalItemsCount={this.props.totalItemsCount}
          pageRangeDisplayed={this.props.pageRangeDisplayed}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
