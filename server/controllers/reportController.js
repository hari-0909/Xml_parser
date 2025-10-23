const CreditReport = require('../models/CreditReport');
const { parseXML } = require('../utils/xmlParser');

const uploadReport = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      });
    }

    if (!req.file.originalname.endsWith('.xml')) {
      return res.status(400).json({
        error: 'File must be XML format'
      });
    }

    const parsedData = await parseXML(req.file.buffer);

    if (!parsedData.personal.name || parsedData.personal.name === 'N/A') {
      return res.status(400).json({
        error: 'Invalid XML: Missing required fields (Name)'
      });
    }
    if (!Array.isArray(parsedData.accounts)) {
      parsedData.accounts = [];
    }

    const report = new CreditReport(parsedData);
    await report.save();

    res.status(201).json({
      message: 'Report uploaded successfully',
      report: report
    });

  } catch (error) {
    console.error('Upload error:', error);
    next(error);
  }
};

const getAllReports = async (req, res, next) => {
  try {
    const reports = await CreditReport.find().select('personal.name personal.pan creditScore uploadedAt _id').sort({ uploadedAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error('Fetch error:', error);
    next(error);
  }
};

const getReportById = async (req, res, next) => {
  try {
    const report = await CreditReport.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({
        error: 'Report not found'
      });
    }

    res.json(report);
  } catch (error) {
    console.error('Fetch error:', error);
    next(error);
  }
};

module.exports = {
  uploadReport,
  getAllReports,
  getReportById
};