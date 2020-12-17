import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Faculties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      faculties: [],
      facultyTitle: "",
      facultySelectedId: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteFaculty = this.deleteFaculty.bind(this);
    this.handleFacultyTitleChange = this.handleFacultyTitleChange.bind(this);
  }

  facultiesList = () => {
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

  componentDidMount() {
    this.facultiesList();
  }

  handleFacultyTitleChange(event) {
    this.setState({facultyTitle: event.target.value});
  }

  handleSubmit(event) {
    const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('token') 
        },
        body: JSON.stringify({ 
          title: this.state.facultyTitle
        })
    };
    fetch('http://localhost:8000/api/faculties/', requestOptions)
        .then(response => {
          if(response.status === 201){
            return response.json();
          } else {
            console.log("could not add");
          }
        })
        .then(data => {
          this.facultiesList();
        });

    event.preventDefault();
  }

  deleteFaculty(event) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + Cookies.get('token') 
        }
    };
    fetch('http://localhost:8000/api/faculties/' + this.state.facultySelectedId, requestOptions)
        .then(response => {
          if(response.status === 204){
            this.facultiesList();
          }
        });

    event.preventDefault();
  }

  setSelectedFaculty(id){
    this.setState({facultySelectedId: id});
  }


  render() {
    const { error, isLoaded, faculties } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (faculties.code === "token_not_valid") {
      console.log("invalid token");
    } else {
      return (
        <div>
          <div className="modal fade" id="facultyDeleteModal" tabIndex="-1" aria-labelledby="facultyDeleteModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="facultyDeleteModalLabel">Delete faculty</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.deleteFaculty}>
                <div className="modal-body">
                  <div className="mb-3">
                    Do you really want to delete this faculty?
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

          <div className="modal fade" id="facultiesAddModal" tabIndex="-1" aria-labelledby="facultiesAddModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="facultiesAddModalLabel">Add faculty</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form onSubmit={this.handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                      <label htmlFor="InputTitle" className="form-label">Faculty title</label>
                      <input type="text" required className="form-control" value={this.state.facultyTitle} onChange={this.handleFacultyTitleChange} id="InputTitle"/>
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
            <h1 className="h2">Faculties</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
              <div className="btn-group me-2">
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#facultiesAddModal">Add faculty</button>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
              {faculties.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>
                    <div className="row">
                      <div className="col-sm">
                        <button type="button" onClick={() => this.setSelectedFaculty(item.id)} data-bs-toggle="modal" data-bs-target="#facultyDeleteModal" className="btn btn-danger btn-sm">Delete</button>
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

export default Faculties;
