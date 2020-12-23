import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Courses extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {username: '', password: '', loggingIn: false};
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    this.setState((currentState) => ({loggingIn: true}));
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: this.state.username,
          password: this.state.password 
        })
    };
    fetch('http://localhost:8000/api/login/', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if(data.access === undefined){
            console.log("error");
          } else {
            Cookies.set('token', data.access);
            window.location.reload(false);
          }
          this.setState((currentState) => ({loggingIn: false}));
        });

    event.preventDefault();
  }

  render() {
    return (
      Cookies.get('token') ? (
        <div></div>
      ) : (
        <main className="form-signin">
          <form onSubmit={this.handleSubmit}>
          <center>
            <img className="mb-4" src={process.env.PUBLIC_URL + '/logo.svg'} alt="" width="150" height="150" />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            <label htmlFor="inputUsername" className="visually-hidden">Username</label>
            <input type="text" id="inputUsername" value={this.state.username} onChange={this.handleUsernameChange} className="form-control" placeholder="Username" required autoFocus="" />
            <label htmlFor="inputPassword" className="visually-hidden">Password</label>
            <input type="password" id="inputPassword" value={this.state.password} onChange={this.handlePasswordChange} className="form-control" placeholder="Password" required />
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            {this.state.loggingIn && <div className="spinner-border" role="status"><span className="sr-only"></span></div>}
            <p className="mt-5 mb-3 text-muted">© KTU 2020</p>
            </center>
          </form>
        </main>
      )
    );
  }
}

export default Courses;
