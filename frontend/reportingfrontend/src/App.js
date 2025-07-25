import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#e9bdbdff' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/about" style={{ marginRight: '1rem' }}>About</Link>
        <Link to="/dashboard" style={{ marginRight: '1rem' }} >Dashboard</Link>
      </nav>


      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Reporting App</a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" to="/about" href="/about">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" to="/dashboard" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" to="/myform" href="/myform">Form</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Login</a>
            </li>
          </ul>
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </div>
      </div>
    </nav>
      
  
      <Routes>
        <Route path="/" element={<Home authenticated={false}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/myform" element={<Form />} />      
      </Routes>
    </Router>
  );
}

export default App;