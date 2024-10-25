import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AdminLogin from './components/AdminLogin';
import Invoice from './components/Invoice';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/invoice/:ownerId" element={<Invoice />} />
      </Routes>
    </Router>
  );
}

export default App;
