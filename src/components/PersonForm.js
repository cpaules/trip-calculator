import React, {Component} from 'react';
import { calculateTotal, createCreditorDebtorArrays, outputTripCalculations } from '../helper/helper';

export default class PersonForm extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      students: [{ 
        name: "",
        paid: "",
        owes: 0
       }],
       outputArr: []
    }
  }

  handleStudentNameChange = idx => e => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, name: e.target.value };
    });
    this.setState({ students: newStudents });
  };

  handleStudentPaidChange = idx => e => {
    const newStudents = this.state.students.map((student, sidx) => {
      if (idx !== sidx) return student;
      return { ...student, paid: e.target.value };
    });
    this.setState({ students: newStudents });
  };

  handleAddStudent = () => {
    this.setState({
      students: this.state.students.concat(
        [{ name: "",
          paid: "",
          owes: 0
        }])
    });
  };

  onSubmit(e) {
    e.preventDefault();
    let total = calculateTotal(this.state)
    const equalShare = total / this.state.students.length;
    // creditorsArr is an array of students who have paid more than their equal share
    // debtorsArr is an array of students who have paid less than their equal share
    let { creditorsArr, debtorsArr } = createCreditorDebtorArrays(this.state, equalShare);
    let outputArr = outputTripCalculations(creditorsArr, debtorsArr);
    this.setState({ outputArr: outputArr })
  }

  render() {
    return (
      <div>
        <h3>Trip Calculator</h3>
        <form onSubmit={this.onSubmit}>
          {this.state.students.map((student, idx) => (
            <div className="form-row student" key={idx + 1}>
              <div className="form-group col-md-3" >
                <input
                  type="text"
                  placeholder={`Student #${idx + 1} name`}
                  id={`student${idx + 1}Name`}
                  className="form-control"
                  value={student.name}
                  onChange={this.handleStudentNameChange(idx)}
                />
              </div>
              <div className="form-group col-md-2" >
                <input
                  type="text"
                  placeholder={`Student #${idx + 1} paid`}
                  id={`student${idx + 1}Paid`}
                  className="form-control"
                  value={student.paid}
                  onChange={this.handleStudentPaidChange(idx)}
                />     
              </div>         
            </div>
          ))}
          <div className="form-group">
            <input type="button" value="Add Student" onClick={this.handleAddStudent} className="btn btn-primary addStudent" /> 
          </div>
          <div className="form-group">
            <input type="submit" value="Calculate Trip" className="btn btn-secondary" />
          </div>         
        </form>
        {this.state.outputArr.map((el, id) => (
          <p key={id}>{el}</p>
        ))}
      </div>
    )
  }
}