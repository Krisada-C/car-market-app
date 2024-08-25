import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import HighlightedCars from './pages/HighlightedCars';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/highlighted-cars">Highlighted Cars</Link>
            </li>
          </ul>
        </nav>

        {/* Routes Setup */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/highlighted-cars" element={<HighlightedCars />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
