const xml2js = require('xml2js');
const parseXML = async (xmlBuffer) => {
  try {
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlBuffer);
    const root = result.INProfileResponse;
    if (!root) {
      throw new Error('Invalid XML structure: INProfileResponse not found');
    }
    const caisAccountDetails = root?.CAIS_Account?.[0]?.CAIS_Account_DETAILS?.[0] || {};
    const holderDetails = caisAccountDetails?.CAIS_Holder_Details?.[0] || {};
    const holderPhone = caisAccountDetails?.CAIS_Holder_Phone_Details?.[0] || {};
    const currentAppDetails = root?.Current_Application?.[0]?.Current_Application_Details?.[0]?.Current_Applicant_Details?.[0] || {};

    const firstName = extractValue(holderDetails, 'First_Name_Non_Normalized') || extractValue(currentAppDetails, 'First_Name') || '';
    const lastName = extractValue(holderDetails, 'Surname_Non_Normalized') || extractValue(currentAppDetails, 'Last_Name') || '';
    const fullName = `${firstName} ${lastName}`.trim() || 'N/A';
    
    const mobilePhone = extractValue(holderPhone, 'Telephone_Number') || extractValue(currentAppDetails, 'MobilePhoneNumber') || 'N/A';
    const pan = extractValue(holderDetails, 'Income_TAX_PAN') || 'N/A';
    const creditScore = parseInt(root?.SCORE?.[0]?.BureauScore?.[0] || 0) || 0;
    
    const caisSummary = root?.CAIS_Account?.[0]?.CAIS_Summary?.[0] || {};
    const creditAccount = caisSummary?.Credit_Account?.[0] || {};
    const totalBalance = caisSummary?.Total_Outstanding_Balance?.[0] || {};
    
    const totalAccounts = parseInt(creditAccount?.CreditAccountTotal?.[0] || 0) || 0;
    const activeAccounts = parseInt(creditAccount?.CreditAccountActive?.[0] || 0) || 0;
    const closedAccounts = parseInt(creditAccount?.CreditAccountClosed?.[0] || 0) || 0;
    const currentBalance = parseFloat(totalBalance?.Outstanding_Balance_All?.[0] || 0) || 0;
    const securedAmount = parseFloat(totalBalance?.Outstanding_Balance_Secured?.[0] || 0) || 0;
    const unsecuredAmount = parseFloat(totalBalance?.Outstanding_Balance_UnSecured?.[0] || 0) || 0;
    const last7DaysEnquiries = parseInt(root?.TotalCAPS_Summary?.[0]?.TotalCAPSLast7Days?.[0] || 0) || 0;
    
    const accountsArray = root?.CAIS_Account?.[0]?.CAIS_Account_DETAILS || [];
    const accounts = extractAccounts(accountsArray);
    
    const data = {
      personal: {
        name: fullName,
        mobilePhone: mobilePhone,
        pan: pan,
        creditScore: creditScore
      },
      summary: {
        totalAccounts: totalAccounts,
        activeAccounts: activeAccounts,
        closedAccounts: closedAccounts,
        currentBalance: currentBalance,
        securedAmount: securedAmount,
        unsecuredAmount: unsecuredAmount,
        last7DaysEnquiries: last7DaysEnquiries
      },
      accounts: accounts
    };

    console.log('Parsed data accounts:', JSON.stringify(accounts, null, 2));
    return data;
  } catch (error) {
    throw new Error(`XML parsing error: ${error.message}`);
  }
};

const extractValue = (obj, path) => {
  try {
    const value = obj?.[path]?.[0] || '';
    return String(value).trim();
  } catch {
    return '';
  }
};

const extractAccounts = (accountsArray = []) => {
  try {
    if (!Array.isArray(accountsArray)) {
      console.log('accountsArray is not an array:', typeof accountsArray);
      return [];
    }

    const result = accountsArray.map((account, index) => {
      const bank = extractValue(account, 'Subscriber_Name') || 'N/A';
      const accountNumber = extractValue(account, 'Account_Number') || 'N/A';
      const amountOverdue = parseFloat(extractValue(account, 'Amount_Past_Due')) || 0;
      const currentBalance = parseFloat(extractValue(account, 'Current_Balance')) || 0;
      const addressDetails = account?.CAIS_Holder_Address_Details?.[0] || {};
      const addressParts = [
        extractValue(addressDetails, 'First_Line_Of_Address_non_normalized'),
        extractValue(addressDetails, 'Second_Line_Of_Address_non_normalized'),
        extractValue(addressDetails, 'City_non_normalized'),
        extractValue(addressDetails, 'ZIP_Postal_Code_non_normalized')
      ].filter(x => x && x !== '');
      const address = addressParts.length > 0 ? addressParts.join(', ') : 'N/A';
      const accountTypeCode = extractValue(account, 'Account_Type');
      let type = 'Credit Card';
      if (['51', '52'].includes(accountTypeCode)) {
        type = 'Loan';
      } else if (['71'].includes(accountTypeCode)) {
        type = 'Bank Account';
      }

      return {
        accountType: type,
        bank: bank,
        accountNumber: accountNumber,
        amountOverdue: amountOverdue,
        currentBalance: currentBalance,
        address: address
      };
    });

    return result;
  } catch (error) {
    console.error('Error extracting accounts:', error);
    return [];
  }
};

module.exports = { parseXML };