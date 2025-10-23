import React, { useState } from 'react';
import { uploadFile } from '../services/api';
import '../styles/UploadForm.css';
const UploadForm = ({ onUploadSuccess, onUploadError }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.xml')) {
        setError('Please select an XML file');
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await uploadFile(file);
      setSuccess(`Report uploaded successfully! Report ID: ${response.data.report._id}`);
      setFile(null);
      onUploadSuccess(response.data.report);
      e.target.reset();
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error uploading file';
      setError(errorMessage);
      onUploadError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="upload-form-container">
      <h2>Upload Credit Report XML</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="file-input">Select XML File:</label>
          <input
            id="file-input"
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Upload Report'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </div>
  );
};
export default UploadForm;