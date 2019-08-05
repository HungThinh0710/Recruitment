import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Label,
  Input,
  Col,
  Row
} from 'reactstrap';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Select from 'react-select';
const optionTechnicalSkill = [
  { value: 'C/C++', label: 'C/C++' },
  { value: 'Java', label: 'Java' },
  { value: 'PHP', label: 'PHP' },
  { value: 'NodeJS', label: 'NodeJS' },
  { value: '.NET', label: '.NET' },
  { value: 'C#', label: 'C#' },
  { value: 'Kotlin', label: 'Kotlin' },
  { value: 'Ruby', label: 'Ruby' },
  { value: 'ReactJS', label: 'ReactJS' },
  { value: 'React Native', label: 'React Native' },
  { value: 'Angular', label: 'Angular' },
  { value: 'VueJS', label: 'VueJS' },
  { value: 'Swift', label: 'Swift' },
  { value: 'Object C', label: 'Object C' },
  { value: 'Python', label: 'Python' },
  { value: 'Unity', label: 'Unity' }
];
const optionYear = [
  { value: '1 year', label: '1 year' },
  { value: '2 years', label: '2 years' },
  { value: '3 years', label: '3 years' },
  { value: '4 years', label: '4 years' },
  { value: '5 years', label: '5 years' },
  { value: '6 years', label: '6 years' },
  { value: '7 years', label: '7 years' },
  { value: '8 years', label: '8 years' },
  { value: '9 years', label: '9 years' },
  { value: '10 years', label: '10 years' }
];
export default class TechnicalSkill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalError: false,
      selectedTechnicalSkillOption: null,
      selectedYearOption: null
    };
    this.toggleModalError = this.toggleModalError.bind(this);
  }
  componentDidMount() {
    const { data } = this.props;
    var year = '';

    if (data) {
      data.year === 1
        ? (year = data.year + ' year')
        : (year = data.year + ' years');
      this.setState({
        selectedTechnicalSkillOption: { value: data.name, label: data.name },
        selectedYearOption: { value: year, label: year }
      });
    }
  }
  handleSelectTechnicalSkillChange = selectedTechnicalSkillOption => {
    this.setState({ selectedTechnicalSkillOption });
    const { selectedYearOption } = this.state;
    if (selectedYearOption) {
      var year = '';
      var index = selectedYearOption.value.indexOf('y');
      var year = selectedYearOption.value.slice(0, index - 1);
      this.props.function(selectedTechnicalSkillOption, year, this.props.id);
    }
  };

  handleSelectYearChange = selectedYearOption => {
    this.setState({ selectedYearOption });
    var year = '';
    var index = selectedYearOption.value.indexOf('y');
    var year = selectedYearOption.value.slice(0, index - 1);
    this.props.function(
      this.state.selectedTechnicalSkillOption,
      year,
      this.props.id
    );
  };

  sendElementToFather = () => {
    const { id } = this.props;
    var element = document.getElementById('' + id);
    this.props.functionGetElement(element, id);
  };

  toggleModalError() {
    this.setState(prevState => ({
      modalError: !prevState.modalError
    }));
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}
        id={this.props.id}
      >
        {/*--------Modal-Error-----*/}
        <Modal
          isOpen={this.state.modalError}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggleModalError}>
            <span className="dashboard-modal-header">Notification</span>
          </ModalHeader>
          <ModalBody>
            <span style={{ color: 'red' }}>
              {' '}
              Technical skill is required. You can't delete it.
            </span>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModalError}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/*--------Modal-Error-----*/}
        <Select
          className="technical-skill-input"
          value={this.state.selectedTechnicalSkillOption}
          onChange={this.handleSelectTechnicalSkillChange.bind(this)}
          options={optionTechnicalSkill}
        />
        <Select
          className="technical-year-input"
          value={this.state.selectedYearOption}
          onChange={this.handleSelectYearChange.bind(this)}
          options={optionYear}
        />
        {this.props.isDeleted ? (
          <Button color="danger" onClick={() => this.sendElementToFather()}>
            <MdDelete />
          </Button>
        ) : (
          <Button color="danger" onClick={() => this.toggleModalError()}>
            <MdDelete />
          </Button>
        )}
      </div>
    );
  }
}
