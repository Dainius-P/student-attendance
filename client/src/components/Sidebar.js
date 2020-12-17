import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get('token')
    }
  }

  render() {
    return (
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="#">
              <span data-feather="home"></span>
              Faculties
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file"></span>
              Courses
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="shopping-cart"></span>
              Teachers
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
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
    );
  }
}

export default Sidebar;
