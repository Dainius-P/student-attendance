import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

ReactDOM.render(     
  <Navbar />,
  document.getElementById('navbar')        
);


ReactDOM.render(
  <App />,
  document.getElementById('content')        
);
