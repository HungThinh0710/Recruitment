import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {Link} from 'react-router-dom';
import './TestPage.css'
class TestPage extends Component {
  constructor(props) {
    super(props);
    //Initial data from API
    this.state = {
      data: [],
      currentPage : 0,
      totalPage: 0,
    };
  }

  async componentWillMount(){
    var url = 'http://api.enclavei3dev.tk/api/role?page=1';
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json()) 
    console.log(data)
    this.setState({
      data: data.data,
      totalPage: Math.ceil(data.total/5),
    })
  }
  edit(index){
    
    var url = 'http://api.enclavei3dev.tk/api/role?page='+index;
    fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => {
      res.json().then(data =>{
          this.setState({
            data: data.data
          })
      })
    }) 
  }
  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "right",
          backgroundColor: 'red'
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Name",
        accessor: "name",
        sortable: false,
        filterable: false
      }
    ];
    const {totalPage} = this.state;
    var array=[];
    for (var i=2;i<=totalPage;i++) array.push(i);
    return (
      <div>

      <ReactTable
        columns={columns}
        data={this.state.data}
        // pages={this.state.pages}
        // loading={this.state.loading}
        // onPageChange={pageIndex => {
        //   let pagesize = 5;
        //   var url ='http://api.enclavei3dev.tk/api/role?page='+pageIndex;
        //   fetch(url, {
        //     headers:{
        //       'Content-Type': 'application/json',
        //       'Accept' : 'application/json',
        //       'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
        //     }
        //   }).then(res => {
        //     // Update react-table
        //     // this.setState({
        //     //   posts: res.data,
        //     //   data: res.data.slice(low, high),
        //     //   pages: res.data.pages,
        //     //   loading: false
        //     // });
        //     res.json().then(data => {
        //         // this.setState({
        //         //   data: data.data
        //         // })
        //         console.log(data)
        //     })
        //   });
        // }}
        showPagination ={false}
        defaultPageSize={5}
        manual // informs React Table that you'll be handling sorting and pagination server-side
      />
        <Pagination aria-label="Page navigation example">
        <PaginationItem>
          <PaginationLink first href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous href="#" />
        </PaginationItem>
        <PaginationItem key='1' >
          <PaginationLink  onClick={()=>this.edit(1)}>
            1
          </PaginationLink>
        </PaginationItem>
        {array.map(e => {
          return (
            <PaginationItem key={e}>
          <PaginationLink  onClick={()=>this.edit(e)}>
            {e}
          </PaginationLink>
        </PaginationItem>
          )
        })}
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last href="#" />
        </PaginationItem>
      </Pagination>
      </div>
    );
  }
}

export default TestPage;
