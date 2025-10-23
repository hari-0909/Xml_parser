import React, { useState } from 'react';
import UploadForm from './components/UploadForm';
import ReportList from './components/ReportList';
import ReportDetail from './components/ReportDetail';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('list');
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    // Refresh the list after upload
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSelectReport = (reportId) => {
    setSelectedReportId(reportId);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedReportId(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Credit Report Analyzer</h1>
        <p>Upload and analyze Experian credit pull reports</p>
      </header>

      <main className="app-main">
        {/* Upload Form - Always visible */}
        <UploadForm 
          onUploadSuccess={handleUploadSuccess}
          onUploadError={(error) => console.error(error)}
        />

        {/* Main Content Area */}
        <div className="content-area">
          {currentView === 'list' ? (
            <ReportList 
              onSelectReport={handleSelectReport}
              refreshTrigger={refreshTrigger}
            />
          ) : (
            <ReportDetail 
              reportId={selectedReportId}
              onBack={handleBackToList}
            />
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Credit Report Analyzer. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;