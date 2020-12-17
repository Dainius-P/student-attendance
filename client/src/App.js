import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Login from './components/Login';
import Faculties from './components/Faculties';
import Courses from './components/Courses';
import Teachers from './components/Teachers';
import Sidebar from './components/Sidebar';
import Students from './components/Students';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
  }

  changeContent(contentName) {
    if(contentName === "courses"){
      this.setState({
        content: <Courses />,
      });
    } else if(contentName === "faculties") {
      this.setState({
        content: <Faculties />,
      });
    } else if(contentName === "teachers") {
      this.setState({
        content: <Teachers />,
      });
    } else if(contentName === "students") {
      this.setState({
        content: <Students />,
      });
    }
  }

  render() {
    var token = Cookies.get('token');
    
    if(token === undefined){
      this.state.content = <Login />;
    } else if(this.state.content === null) {
      this.state.content = <Faculties />;
    }
    return (
      <div class="row">
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#" onClick={() => this.changeContent("faculties")}>
                  <span data-feather="home"></span>
                  Faculties
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.changeContent("courses")}>
                  <span data-feather="file"></span>
                  Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.changeContent("teachers")}>
                  <span data-feather="shopping-cart"></span>
                  Teachers
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={() => this.changeContent("students")}>
                  <span data-feather="users"></span>
                  Students
                </a>
              </li>
            </ul>

            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
              <span>Code</span>
              <a className="link-secondary" href="#">
                <span data-feather="plus-circle"></span>
              </a>
            </h6>
            <ul className="nav flex-column mb-2">
              <li className="nav-item">
                <a className="nav-link" target="_none" href="https://github.com/Dainius-P/student-attendance">
                  <span data-feather="file-text"></span>
                  Github
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {this.state.content}
        </main>
      </div>
    );
  }
}

export default App;
