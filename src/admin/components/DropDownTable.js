import React, { Component } from 'react';
import {Dropdown, DropdownItem, DropdownToggle, DropdownMenu,  } from 'reactstrap';

export default class DropDownTable extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            isOpen: false
        }
    }
    
    toggle = () => {
        this.setState({isOpen: !this.state.isOpen})
    }
    
    render(){
        return(
            <Dropdown isOpen={this.state.isOpen} toggle={this.toggle}>
                <DropdownToggle className="menu-button" color="success">
                    <i className="fa fa-ellipsis-h" aria-hidden="true" type="ellipsis" />
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem style={{ fontWeight: 500, color: 'black' }}>Edit</DropdownItem>
                    <DropdownItem style={{ fontWeight: 500, color: 'black' }}>Detail</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem style={{ fontWeight: 500, color: 'red' }}>Delete</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}