// src/App.jsx

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'; 
import LeadsList from './components/LeadsList.jsx';
import Statistics from './components/Statistics.jsx';
import { FaLinkedin } from 'react-icons/fa';

function App() {
  const [activeTab, setActiveTab] = useState('statistics');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchLeads = async () => {
    setLoading(true); 
    setError(null); 
    try {
      const response = await fetch(`${API_URL}/api/leads`);
      
      
      if (!response.ok) {
        throw new Error('אירעה שגיאה בטעינת הלידים מהשרת.');
      }
      
      const data = await response.json();
      
      
      if (data.success && Array.isArray(data.leads)) {
        setLeads(data.leads);
      } else {
        throw new Error('מבנה נתונים לא תקין מהשרת.');
      }
    } catch (err) {
      console.error("שגיאה בטעינת לידים:", err);
      setError(err.message); 
    } finally {
      setLoading(false); 
    }
  };

 
  useEffect(() => {
    fetchLeads();
  }, []); 

  // מציג הודעת טעינה
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">טוען...</span>
        </div>
      </div>
    );
  }

  // מציג הודעת שגיאה
  if (error) {
    return (
      <div className="alert alert-danger text-center m-5" role="alert">
        <strong>שגיאה!</strong> {error}
      </div>
    );
  }
  


  return (
    <div className="min-vh-100 bg-light">
     
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <span className="navbar-brand">
            <i className="bi bi-graph-up-arrow me-2"></i>
            מערכת מעקב לידים
          </span>

          <a 
              href="https://www.linkedin.com/in/elimelech-scheinberger-36827b343/ "
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-info me-3 d-flex align-items-center"
            >
              <FaLinkedin className="" /> 
             
            </a>
          <button 
              className="btn btn-warning me-3" 
              onClick={fetchLeads} 
              disabled={loading}
            >
              <i className={`bi bi-arrow-clockwise me-1 ${loading ? 'spin-animation' : ''}`}></i>
             
            </button>
        </div>
      </nav>

    
      <div className="container mt-4">
        <ul className="nav nav-pills nav-fill mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'statistics' ? 'active' : ''}`}
              onClick={() => setActiveTab('statistics')}
            >
              <i className="bi bi-bar-chart-line me-2"></i>
              סטטיסטיקות
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'leads' ? 'active' : ''}`}
              onClick={() => setActiveTab('leads')}
            >
              <i className="bi bi-people me-2"></i>
              רשימת לידים
            </button>
          </li>
        </ul>

       
        {activeTab === 'statistics' && <Statistics leads={leads} />}
        {activeTab === 'leads' && <LeadsList leads={leads} />}
      </div>
    </div>
  );
}

export default App;