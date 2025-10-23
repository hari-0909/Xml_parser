import React, { useState, useEffect } from 'react';
import { getReportById } from '../services/api';
import '../styles/ReportDetail.css';

const ReportDetail = ({ reportId, onBack }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, [reportId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getReportById(reportId);
      setReport(response.data);
    } catch (err) {
      setError('Error fetching report details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading report...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!report) return <div className="error">Report not found</div>;

  return (
    <div className="report-detail-container">
      <button onClick={onBack} className="back-button">← Back to Reports</button>
      <section className="report-section">
        <h2>Basic Details</h2>
        <div className="section-content">
          <div className="detail-row">
            <label>Name:</label>
            <span>{report.personal.name}</span>
          </div>
          <div className="detail-row">
            <label>Mobile Phone:</label>
            <span>{report.personal.mobilePhone}</span>
          </div>
          <div className="detail-row">
            <label>PAN:</label>
            <span>{report.personal.pan}</span>
          </div>
          <div className="detail-row">
            <label>Credit Score:</label>
            <span className="credit-score">{report.personal.creditScore}</span>
          </div>
        </div>
      </section>
      <section className="report-section">
        <h2>Report Summary</h2>
        <div className="section-content">
          <div className="summary-grid">
            <div className="summary-item">
              <label>Total Accounts</label>
              <span>{report.summary.totalAccounts}</span>
            </div>
            <div className="summary-item">
              <label>Active Accounts</label>
              <span>{report.summary.activeAccounts}</span>
            </div>
            <div className="summary-item">
              <label>Closed Accounts</label>
              <span>{report.summary.closedAccounts}</span>
            </div>
            <div className="summary-item">
              <label>Current Balance</label>
              <span>₹{report.summary.currentBalance.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <label>Secured Amount</label>
              <span>₹{report.summary.securedAmount.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <label>Unsecured Amount</label>
              <span>₹{report.summary.unsecuredAmount.toLocaleString()}</span>
            </div>
            <div className="summary-item">
              <label>Last 7 Days Enquiries</label>
              <span>{report.summary.last7DaysEnquiries}</span>
            </div>
          </div>
        </div>
      </section>
      <section className="report-section">
        <h2>Credit Accounts Information</h2>
        <div className="section-content">
          {report.accounts.length === 0 ? (
            <p>No accounts found</p>
          ) : (
            <div className="accounts-table-wrapper">
              <table className="accounts-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Bank</th>
                    <th>Account Number</th>
                    <th>Current Balance</th>
                    <th>Amount Overdue</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {report.accounts.map((account, index) => (
                    <tr key={index}>
                      <td>{account.accountType}</td>
                      <td>{account.bank}</td>
                      <td className="account-number">{account.accountNumber}</td>
                      <td>₹{account.currentBalance.toLocaleString()}</td>
                      <td className={account.amountOverdue > 0 ? 'overdue' : ''}>
                        ₹{account.amountOverdue.toLocaleString()}
                      </td>
                      <td className="address">{account.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <div className="report-footer">
        <p>Report Generated: {new Date(report.uploadedAt).toLocaleString()}</p>
      </div>
    </div>
  );
};
export default ReportDetail;