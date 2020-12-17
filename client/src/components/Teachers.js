import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Teachers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      teachers: [],
      courses: [],
      coursesSelected: [],
      teacherFirstName: "",
      teacherLastName: "",
      teacherselectedId: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteteacher = this.deleteteacher.bind(this);
    this.handleTeacherFirstNameChange = this.handleTeacherFirstNameChange.bind(this);
    this.handleTeacherLastNameChange = this.handleTeacherLastNameChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }

  teachersList = () => {
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

  handleCourseChange(e) {
    let value = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    this.setState({coursesSelected: value});
  }

  componentDidMount() {
    this.teachersList();
  }

  handleTeacherFirstNameChange(event) {
    this.setState({teacherFirstName: event.target.value});
  }

  handleTeacherLastNameChange(event) {
    this.setState({teacherLastName: event.target.value});
  }

  getCourses(event) {
    fetch("http://localhost:8000/api/courses/", {
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
          courses: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        });
      }
    )

    event.preventDefault();
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
          courses: this.state.coursesSelected
        })
    };
    fetch('http://localhost:8000/api/teachers/', requestOptions)
        .then(response => {
          console.log(this.state.coursesSelected);
          if(response.status === 201){
            return response.json();
          } else {
            console.log("could not add");
          }
        })
        .then(data => {
          this.teachersList();
        });

    event.preventDefault();
  }

  deleteteacher(event) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('token') 
        }
    };
    fetch('http://localhost:8000/api/teachers/' + this.state.teacherselectedId, requestOptions)
        .then(response => {
          if(response.status === 204){
            this.teachersList();
          }
        });

    event.preventDefault();
  }

  setSelectedteacher(id){
    this.setState({teacherselectedId: id});
  }

  render() {
    const { error, isLoaded, teachers } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (teachers.code === "token_not_valid") {
      console.log("invalid token");
    } else {
      return (
        <div>
          <div className="modal fade" id="teacherDeleteModal" tabIndex="-1" aria-labelledby="teacherDeleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="teacherDeleteModalLabel">Delete teacher</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.deleteteacher}>
                <div className="modal-body">
                  <div className="mb-3">
                    Do you really want to delete this teacher?
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

          <div className="modal fade" id="teachersAddModal" tabIndex="-1" aria-labelledby="teachersAddModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="teachersAddModalLabel">Add teacher</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                      <label htmlFor="InputFirstname" className="form-label">First Name</label>
                      <input type="text" required className="form-control" value={this.state.teacherFirstName} onChange={this.handleTeacherFirstNameChange} id="InputFirstname"/>
                      <label htmlFor="InputLastname" className="form-label">Last Name</label>
                      <input type="text" required className="form-control" value={this.state.teacherLastName} onChange={this.handleTeacherLastNameChange} id="InputLastname"/>
                      <label htmlFor="InputCourses" className="form-label">Courses</label>
                      <select class="form-select" size="5" required multiple aria-label="size 5 multiple select" onChange={this.handleCourseChange}>
                        {this.state.courses.map(item => (
                          <option key={item.id} value={item.id}>{item.title}</option>
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
            <h1 className="h2">Teachers</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-success" onClick={this.getCourses} data-bs-toggle="modal" data-bs-target="#teachersAddModal">Add teacher</button>
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
                  <th>Courses</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {teachers.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.course_list.map(item => (
                      <div>{item.title}<br></br></div>
                  ))}</td>
                  <td>
                    <div className="row">
                      <div className="col-sm">
                        <button type="button" onClick={() => this.setSelectedteacher(item.id)} data-bs-toggle="modal" data-bs-target="#teacherDeleteModal" className="btn btn-danger btn-sm">Delete</button>
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

export default Teachers;
