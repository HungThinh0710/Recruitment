import React, { Component } from "react";


import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Card, CardBody, CardHeader , Button} from 'reactstrap';
import ModalRemoveItem from '../components/ModalRemoveItem';
import {Link} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './Roles.css'
import ModalAddRole from '../components/ModalAddRole';
import $ from 'jquery';
const styleFont = {
  fontSize: '200%',
};
const styleCard = {
  background:'#eeeeee',
  width: '80%',
  marginTop: '5%',
  alignSelf: 'center',
  marginBottom: '8%'
};
export default class Roles extends Component {
  constructor(props) {
    super(props);
    //Initial data from API
    this.state = {
      data: [],
      currentPage : 0,
      totalPage: 0
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
    this.setState({
      data: data.data,
      totalPage: Math.ceil(data.total/10)
    })
  }
  edit(index){
    $('.item').removeClass('item-active');
    $('#'+index).addClass('item-active');
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
            data: data.data,
            totalPage: Math.ceil(data.total/10)
          })
      })
    }) 
  }

  addRole(data) {
    this.setState({
      data: data.data,
      totalPage: Math.ceil(data.total/10)
    })
  }

  removeItem(element,id){
      
    let {data,totalPage} = this.state;
    const index = data.indexOf(element);
    var url = 'http://api.enclavei3dev.tk/api/role'; 
    fetch(url, {
     method: 'DELETE', 
     body: JSON.stringify({
       roles: id
     }), 
     headers:{
       'Content-Type': 'application/json',
       'Accept' : 'application/json',
       'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
     }
   }).then(res =>{

    //  data.splice(index,1);
    //  if(data.length%10==0) totalPage=totalPage-1;
    //  else totalPage=totalPage;
    //  this.setState({
    //    data:data,
    //    totalPage: totalPage
    //  })
    if (res.status === 200) {
      res.json().then(data =>{
        fetch('http://api.enclavei3dev.tk/api/role?page=1', {
          headers:{
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
          }
        }).then(res => {
          res.json().then(data => {
             
            data.data.forEach(function(e) {
              delete e.created_at;
              delete e.updated_at;
              // delete e.id;
            })
            if(data.data.length%10==0) totalPage=totalPage-1;
             else totalPage=totalPage;
            this.setState({
              data : data.data,
              totalPage: totalPage
            })
          })
        }) 
      })
    }
   })
  }
  render() {
    const {totalPage} = this.state;
    console.log(totalPage);
    var array=[];
    if(totalPage>1){
      for (var i=2;i<=totalPage;i++) array.push(i);
    }
    
    return (
      <Card  style={styleCard}>
      <CardHeader style={styleFont}>Roles Management</CardHeader>
      <CardBody>
        <ModalAddRole  color='success' buttonLabel='Add New Role' nameButtonAccept='Add' function={this.addRole.bind(this)} />
       
        <Container>
          {this.state.data.map(e=>{
            let url = '/admin/role/'+e.id;
             return (<Row className='row-item' key={e.id}>
              <Col xs="9" style={{display:'flex',flexDirection:'column',justifyContent:'center',fontSize:'150%'}}>{e.name}</Col>
              <Col xs="1" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <Link to={url} >
                <Button  className="button-view">View</Button>
              </Link>
              </Col>
              <Col xs="1" style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
              <ModalRemoveItem  item={e} id={e.id} buttonLabel='Delete' function={()=>this.removeItem(e,e.id)}/>
              </Col>
            </Row>)
          })}
        </Container>
       
        <div style={{marginLeft:'70%'}}>
            <Pagination   size="lg" aria-label="Page navigation example">
            <PaginationItem className='item' style={{background:'white'}} >
              <PaginationLink previous href="#" />
            </PaginationItem>
            <PaginationItem  className='item item-active' style={{background:'white'}} key='1' id='1' >
              <PaginationLink  onClick={()=>this.edit(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            {(totalPage>1)&&array.map(e => {
              return (
                <PaginationItem  className='item' style={{background:'white'}} key={e} id={e} >
              <PaginationLink  onClick={()=>this.edit(e)}>
                {e}
              </PaginationLink>
            </PaginationItem>
              )
            })}
            <PaginationItem className='item' style={{background:'white'}}>
              <PaginationLink next href="#" />
            </PaginationItem>
            </Pagination>
        </div>

        </CardBody>
        </Card> 
    );
  }
}
