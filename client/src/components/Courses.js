import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      courses: [],
      faculties: [],
      courseTitle: "",
      courseSelectedId: "",
      facultySelected: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.getFaculties = this.getFaculties.bind(this);
    this.handleCourseTitleChange = this.handleCourseTitleChange.bind(this);
    this.handleFacultyChange = this.handleFacultyChange.bind(this);
  }

  coursesList = () => {
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
  }

  componentDidMount() {
    this.coursesList();
  }

  handleCourseTitleChange(event) {
    this.setState({courseTitle: event.target.value});
  }

  handleFacultyChange(event) {
    this.setState({facultySelected: event.target.value});
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('token') 
        },
        body: JSON.stringify({ 
          title: this.state.courseTitle,
          faculty: this.state.facultySelected,
        })
    };
    fetch('http://localhost:8000/api/courses/', requestOptions)
        .then(response => {
          if(response.status === 201){
            return response.json();
          } else {
            console.log("could not add");
          }
        })
        .then(data => {
          this.coursesList();
        });

    event.preventDefault();
  }

  deleteCourse(event) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('token') 
        }
    };
    fetch('http://localhost:8000/api/courses/' + this.state.courseSelectedId, requestOptions)
        .then(response => {
          if(response.status === 204){
            this.coursesList();
          }
        });

    event.preventDefault();
  }

  getFaculties(event) {
    fetch("http://localhost:8000/api/faculties/", {
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
          faculties: result
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

  setSelectedCourse(id){
    this.setState({courseSelectedId: id});
  }

  render() {
    const { error, isLoaded, courses } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (courses.code === "token_not_valid") {
      console.log("invalid token");
    } else {
      return (
        <div>
          <div className="modal fade" id="courseDeleteModal" tabIndex="-1" aria-labelledby="courseDeleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="courseDeleteModalLabel">Delete course</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.deleteCourse}>
                <div className="modal-body">
                  <div className="mb-3">
                    Do you really want to delete this course?
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

          <div className="modal fade" id="coursesAddModal" tabIndex="-1" aria-labelledby="coursesAddModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="coursesAddModalLabel">Add course</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                      <label htmlFor="InputTitle" className="form-label">Course title</label>
                      <input type="text" required className="form-control" value={this.state.courseTitle} onChange={this.handleCourseTitleChange} id="InputTitle"/>
                      <label htmlFor="SelectFaculty" className="form-label">Select faculty</label>
                      <select class="form-select" required id="SelectFaculty" onChange={this.handleFacultyChange} value={this.state.facultySelected}>
                        <option value="">Select faculty</option>                        
                        {this.state.faculties.map(item => (
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
            <h1 className="h2">Courses</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-success" onClick={this.getFaculties} data-bs-toggle="modal" data-bs-target="#coursesAddModal">Add course</button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Faculty</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {courses.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.faculty_title}</td>
                  <td>
                    <div className="row">
                      <div className="col-sm">
                        <button type="button" onClick={() => this.setSelectedCourse(item.id)} data-bs-toggle="modal" data-bs-target="#courseDeleteModal" className="btn btn-danger btn-sm">Delete</button>
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

export default Courses;
