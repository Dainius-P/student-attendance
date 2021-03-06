import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      students: [],
      teachers: [],
      studentTitle: "",
      studentSelectedId: "",
      teacherFirstName: "",
      teacherLastName: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.getTeachers = this.getTeachers.bind(this);
    this.handleStudentFirstNameChange = this.handleStudentFirstNameChange.bind(this);
    this.handleStudentLastNameChange = this.handleStudentLastNameChange.bind(this);
    this.handleTeachersChange = this.handleTeachersChange.bind(this);
  }

  studentsList = () => {
    fetch("http://localhost:8000/api/students/", {
      headers:{
       Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Cookies.get('token'),
        },
     })
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          students: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    )
  }

  componentDidMount() {
    this.studentsList();
  }

  handleStudentFirstNameChange(event) {
    this.setState({teacherFirstName: event.target.value});
  }

  handleStudentLastNameChange(event) {
    this.setState({teacherLastName: event.target.value});
  }

  handleTeachersChange(e) {
    let value = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    this.setState({teachersSelected: value});
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('token') 
        },
        body: JSON.stringify({ 
          first_name: this.state.teacherFirstName,
          last_name: this.state.teacherLastName,
          teachers: this.state.teachersSelected
        })
    };
    fetch('http://localhost:8000/api/students/', requestOptions)
        .then(response => {
          if(response.status === 201){
            return response.json();
          } else {
            console.log("could not add");
          }
        })
        .then(data => {
          this.studentsList();
        });

    event.preventDefault();
  }

  deleteStudent(event) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('token') 
        }
    };
    fetch('http://localhost:8000/api/students/' + this.state.studentSelectedId, requestOptions)
        .then(response => {
          if(response.status === 204){
            this.studentsList();
          }
        });

    event.preventDefault();
  }

  getTeachers(event) {
    fetch("http://localhost:8000/api/teachers/", {
      headers:{
       Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + Cookies.get('token'),
        },
     })
    .then(response => response.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          teachers: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    )
  }

  setSelectedStudent(id){
    this.setState({studentSelectedId: id});
  }

  render() {
    const { error, isLoaded, students } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (students.code === "token_not_valid") {
      console.log("invalid token");
    } else {
      return (
        <div>
          <div className="modal fade" id="studentDeleteModal" tabIndex="-1" aria-labelledby="studentDeleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="studentDeleteModalLabel">Delete student</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.deleteStudent}>
                <div className="modal-body">
                  <div className="mb-3">
                    Do you really want to delete this student?
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-danger">Delete</button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>

          <div className="modal fade" id="studentsAddModal" tabIndex="-1" aria-labelledby="studentsAddModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="studentsAddModalLabel">Add student</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                      <label htmlFor="InputFirstname" className="form-label">First Name</label>
                      <input type="text" required className="form-control" value={this.state.studentFirstName} onChange={this.handleStudentFirstNameChange} id="InputFirstname"/>
                      <label htmlFor="InputLastname" className="form-label">Last Name</label>
                      <input type="text" required className="form-control" value={this.state.studentLastName} onChange={this.handleStudentLastNameChange} id="InputLastname"/>                      
                      <label htmlFor="SelectTeacher" className="form-label">Teachers</label>
                      <select class="form-select" size="5" required multiple aria-label="size 5 multiple select" onChange={this.handleTeachersChange}>
                        {this.state.teachers.map(item => (
                          <option key={item.id} value={item.id}>{item.first_name} {item.last_name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" className="btn btn-primary">Create</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Students</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-success" onClick={this.getTeachers} data-bs-toggle="modal" data-bs-target="#studentsAddModal">Add student</button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Teachers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {students.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.teacher_list.map(item => (
                      <div>{item.first_name} {item.last_name}<br></br></div>
                  ))}</td>
                  <td>
                    <div className="row">
                      <div className="col-sm">
                        <button type="button" onClick={() => this.setSelectedStudent(item.id)} data-bs-toggle="modal" data-bs-target="#studentDeleteModal" className="btn btn-danger btn-sm">Delete</button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  }
}

export default Students;
