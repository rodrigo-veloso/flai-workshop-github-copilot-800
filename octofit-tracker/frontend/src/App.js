import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              🏎️ OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="container page-container">
              <div className="hero-section text-center">
                <h1 className="display-3">�️ Welcome to OctoFit Tracker 🏁</h1>
                <p className="lead">Accelerate your fitness journey • Race towards your goals • Champion performance</p>
                <hr className="my-4 bg-white" />
                <p className="fs-5">⚡ Maximum performance • Precision tracking • Racing spirit ⚡</p>
              </div>
              
              <div className="row g-4">
                <div className="col-md-4">
                  <Link to="/activities" style={{ textDecoration: 'none' }}>
                    <div className="card text-center">
                      <div className="card-body">
                        <div className="display-4 mb-3">🏁</div>
                        <h5 className="card-title">Track Performance</h5>
                        <p className="card-text">Monitor every lap of your fitness journey with championship precision.</p>
                      </div>
                      <div className="card-footer bg-transparent">
                        <span className="btn btn-primary btn-sm">View Activities →</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/leaderboard" style={{ textDecoration: 'none' }}>
                    <div className="card text-center">
                      <div className="card-body">
                        <div className="display-4 mb-3">🏆</div>
                        <h5 className="card-title">Podium Position</h5>
                        <p className="card-text">Race for pole position and claim your spot on the victory podium.</p>
                      </div>
                      <div className="card-footer bg-transparent">
                        <span className="btn btn-primary btn-sm">View Leaderboard →</span>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/workouts" style={{ textDecoration: 'none' }}>
                    <div className="card text-center">
                      <div className="card-body">
                        <div className="display-4 mb-3">⚡</div>
                        <h5 className="card-title">Race Strategy</h5>
                        <p className="card-text">Custom-tuned workout plans engineered for peak performance.</p>
                      </div>
                      <div className="card-footer bg-transparent">
                        <span className="btn btn-primary btn-sm">View Workouts →</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          } />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
