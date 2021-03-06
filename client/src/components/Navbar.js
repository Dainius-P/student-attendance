import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: Cookies.get('token')
    }
  }

  signout = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    window.location.reload(false);
  }

  render() {
    return (
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Student Attendance System</a>
        <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <input className="form-control form-control-dark w-100" type="text" placeholder="" aria-label="Search"/>
        <ul className="navbar-nav px-3">
          {this.state.token !== undefined
            ? <li className="nav-item text-nowrap"><a className="nav-link" href="#" onClick={this.signout}>Sign out</a></li>
            : <li className="nav-item text-nowrap"><a className="nav-link" href="#">Sign in</a></li>
          }
        </ul>
      </header>
    );
  }
}

export default Navbar;
