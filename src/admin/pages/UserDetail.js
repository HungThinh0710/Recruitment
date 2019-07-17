
import React, { Component } from 'react'
import { Card,CardBody,
  CardTitle,CardSubtitle,CardImg,Button,CardText, Row,Col,Container } from 'reactstrap';
  import {  NumberWidget } from '../components/Widget';
import './UserDetail.css';
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        fullName: '',
        email: '' ,
        phone: '' ,
        address: '',
        image: ''
      }
  }
  async componentWillMount(){
    const {id} = this.props.match.params;
    var url = 'http://api.enclavei3dev.tk/api/user/'+id;
    const data = await fetch(url, {
      headers:{
        'Content-Type': 'application/json',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + localStorage.getItem('access_token'),
      }
    }).then(res => res.json())  
    this.setState({
      name : data.name,
      fullName: data.fullname,
      email: data.email,
      phone: data.phone,
      address: data.address,
      image: data.image
    })       
  }

  render() {
    const {name,fullName,email,phone,address} = this.state;
    return (
        <div className="profile-card">
        <Card className="card-detail">
            <Card className="information-form">
              <CardBody>
                <Container>
                  <Row>
                    <Col>
                    <span style={{fontSize:'150%'}}>User</span>
                    <hr />
                    <div>
                        <Row >
                          <Col xs="4">
                          <span>Name:</span>
                          </Col>
                          <Col>
                          <span>{name}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="4">
                          <span>Fullname:</span>
                          </Col>
                          <Col>
                          <span>{fullName}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="4">
                          <span>Email:</span>
                          </Col>
                          <Col>
                          <span>{email}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                        <Col xs="4">
                          <span>Phone:</span>
                          </Col>
                          <Col>
                          <span>{phone}</span>
                          </Col>
                        </Row>
                        <br />
                        <Row>
                          <Col xs="4">
                          <span>Address:</span>
                          </Col>
                          <Col>
                          <span>{address}</span>
                          </Col>
                        </Row>
                        <br />
                    </div>
                    </Col>
                    <Col style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <img  className='profile-avatar' src='/static/media/100_10.56d054ff.jpg' />
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>   
        </Card>
        <Card>
          <CardBody>
              <Row>
                <Col>
                <NumberWidget
                title="Total Articles"
                subtitle="This month"
                number="500"
                color="success"
                progress={{
                  value: 50,
                  label: 'Last month',
                }}        
                />
                </Col>
                <Col>
                <NumberWidget
                title="Total Interviews"
                subtitle="This month"
                number="3000"
                color="danger"
                progress={{
                  value: 65,
                  label: 'Last month',
                }}        
                />
                </Col>
                <Col>
                <NumberWidget
                title="Total Candidate"
                subtitle="This month"
                number="5000"
                color="warning"
                progress={{
                  value: 80,
                  label: 'Last month',
                }}        
                />
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                <span style={{fontSize:'150%',color:'green'}}>Articles</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                <Card>
                  <CardImg top width="100%" src="https://loremflickr.com/320/240" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  </CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                  <CardImg top width="100%" src="https://loremflickr.com/320/240/paris" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  </CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                  <CardImg top width="100%" src="https://loremflickr.com/320/240/brazil" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  </CardBody>
                </Card>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                <span style={{fontSize:'150%',color:'red'}}>Interviews</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                <Card>
                  <CardImg top width="100%" src="https://loremflickr.com/320/240" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  </CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                  <CardImg top width="100%" src="https://loremflickr.com/320/240/paris" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  </CardBody>
                </Card>
                </Col>
                <Col>
                <Card>
                  <CardImg top width="100%" src="https://loremflickr.com/320/240/brazil" alt="Card image cap" />
                  <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                  </CardBody>
                </Card>
                </Col>
              </Row>
          </CardBody>
        </Card>
        </div>
      
    )
  }
}
