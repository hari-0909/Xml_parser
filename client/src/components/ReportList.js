import React, { useState, useEffect } from 'react';
import { getAllReports } from '../services/api';
import '../styles/ReportList.css';

const ReportList = ({ onSelectReport, refreshTrigger }) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, [refreshTrigger]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllReports();
      setReports(response.data);
    } catch (err) {
      setError('Error fetching reports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading reports...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="report-list-container">
      <h2>Uploaded Reports</h2>
      
      {reports.length === 0 ? (
        <div className="no-reports">No reports uploaded yet</div>
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report._id} className="report-card">
              <div className="report-info">
                <h3>{report.personal.name}</h3>
                <p><strong>PAN:</strong> {report.personal.pan}</p>
                <p><strong>Credit Score:</strong> {report.personal.creditScore}</p>
                <p><strong>Uploaded:</strong> {new Date(report.uploadedAt).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => onSelectReport(report._id)}
                className="view-button"
              >
                View Full Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;