const express = require('express');
const multer = require('multer');
const {
  uploadReport,
  getAllReports,
  getReportById
} = require('../controllers/reportController');
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize:5*1024*1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/xml' || file.originalname.endsWith('.xml')) {
      cb(null, true);
    } else {
      cb(new Error('Only XML files are allowed'));
    }
  }
});
router.post('/upload', upload.single('file'), uploadReport);
router.get('/reports', getAllReports);
router.get('/reports/:id', getReportById);

module.exports = router;