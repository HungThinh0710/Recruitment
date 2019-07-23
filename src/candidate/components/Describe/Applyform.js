import React, { Component } from "react";
import { ModalBody, Form} from 'react-bootstrap';
import './applyform.css';
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Applyform extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fullName: null,
      address: null,
      email: null,
      phone: null,
      file: null,
      visible: true,
      modalisOpen: false,
      description: null,
      technical: null,
      Nodejs: false,
      dotnet: false,
      java: false,
      Reactjs: false,
      
      formErrors: {
        fullName: "",
        address: "",
        email: "",
        phone: "",
        file: "",
        description: "",
        technical: "",
        Nodejs: "",

      }
    };
  }
  
  handleSubmit = e => {
    e.preventDefault();
   

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Full Name: ${this.state.fullName}
        Address: ${this.state.address}
        Email: ${this.state.email}
        Phone: ${this.state.phone}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    
    const { name } = e.target;
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    let formErrors = { ...this.state.formErrors };
    
    switch (name) {
      case "fullName":
        formErrors.fullName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "address":
        formErrors.address =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "phone":
        formErrors.phone =
          value.length < 10 ? "minimum 10 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  

  render() {
    const { formErrors } = this.state;

    return (
      
     
        <div>
          <ModalBody>
          <Form  onSubmit={this.handleSubmit} noValidate>
            <Form.Group>
              <div className="fullName">
              <label class="col-form-label">Full Name</label>
              <input class="form-control"
                className={formErrors.fullName.length > 0 ? "error" : null}
                placeholder="Full Name"
                type="text"
                name="fullName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.fullName.length > 0 && (
                <span className="errorMessage">{formErrors.fullName}</span>
              )}
              </div>
            </Form.Group>
            
            <Form.Group>
              <div className="email">
              <label class="col-form-label">Email</label>
              <input class="form-control"
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
              </div>
            </Form.Group>
            <Form.Group>
              <div className="phone">
              <label class="col-form-label" className="phone">Phone</label>
              <input class="form-control"
                className={formErrors.phone.length > 0 ? "error" : null}
                placeholder="Phone"
                type="text"
                name="phone"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.phone.length > 0 && (
                <span className="errorMessage">{formErrors.phone}</span>
              )}
              </div>
            </Form.Group>
            <Form.Group>
              <div className="address">
              <label class="col-form-label">Address
              </label>
              <input class="form-control"
                className={formErrors.address.length > 0 ? "error" : null}
                placeholder="Address"
                type="text"
                name="address"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.address.length > 0 && (
                <span className="errorMessage">{formErrors.address}</span>
              )}
              </div>
            </Form.Group>
            <Form.Group>
            <div className="file">
              <label class="col-form-label">Resume/CV</label>
              <input type="file" class="form-control"
                className={formErrors.file.length > 0 ? "error" : null}
                placeholder="Choose your CV"
                name="file"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.file.length > 0 && (
                <span className="errorMessage">{formErrors.file}</span>
              )}
            </div>
            </Form.Group>
            <Form.Group>
              <div className="description">
              <label class="col-form-label">Description</label>
              <textarea class="form-control"
                className={formErrors.description.length > 0 ? "error" : null}
                placeholder="Describe by yourself"
                type="text"
                name="description"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.description.length > 0 && (
                <span className="errorMessage">{formErrors.description}</span>
              )}
              </div>
            </Form.Group>
            <Form.Group>
            <label class="col-form-label">Technical skill</label>
              <select class="form-control"
                className={formErrors.technical.length > 0 ? "error" : null}
                placeholder="Write your technical skill here"
                type="text"
                name="technical"
                noValidate
                onChange={this.handleChange}
              >
                 <option>Java</option>
                  <option>.NET</option>
                  <option>Python</option>
                  <option>Ruby</option>
                  <option>C++</option>
              </select>
              {formErrors.technical.length > 0 && (
                <span className="errorMessage">{formErrors.technical}</span>
              )}
            </Form.Group>
            
          </Form>
          </ModalBody>
          
          </div>
      
    );
  }
}

export default Applyform;
