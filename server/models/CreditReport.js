const mongoose = require('mongoose');

const creditReportSchema = new mongoose.Schema({
  personal: {
    name: {
      type: String,
      required: true
    },
    mobilePhone: {
      type: String,
      required: true
    },
    pan: {
      type: String,
      required: true
    },
    creditScore: {
      type: Number,
      required: true
    }
  },
  summary: {
    totalAccounts: {
      type: Number,
      default: 0
    },
    activeAccounts: {
      type: Number,
      default: 0
    },
    closedAccounts: {
      type: Number,
      default: 0
    },
    currentBalance: {
      type: Number,
      default: 0
    },
    securedAmount: {
      type: Number,
      default: 0
    },
    unsecuredAmount: {
      type: Number,
      default: 0
    },
    last7DaysEnquiries: {
      type: Number,
      default: 0
    }
  },
  accounts: [
    new mongoose.Schema({
      accountType: String,
      bank: String,
      accountNumber: String,
      amountOverdue: Number,
      currentBalance: Number,
      address: String
    }, { _id: false })
  ],
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('CreditReport', creditReportSchema);