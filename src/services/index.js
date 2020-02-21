const data = require('./../mock-data/data');

/**
 * This function returns all account information
 */
export const getAllAccountData = () => {
    return data.transactions;
}

/**
 * This function filter the details by Account No and returns the result
 * @param {Number} accountId 
 */
export const getAccountDetailsById = (accountId) => {
    return data.transactions.find(accountObj => accountObj.account === accountId);
}

/**
 * This function filters the result based on filters selected on Account Name and Transaction type
 * @param {Array} accountNoFilters 
 * @param {Array} transactionTypeFilters 
 */
export const filterAccounts = (accountNoFilters, transactionTypeFilters) => {

    return data.transactions.filter(accountObj => {
        if (accountNoFilters.length && transactionTypeFilters.length) {
            return accountNoFilters.indexOf(accountObj.accountName) > -1 && transactionTypeFilters.indexOf(accountObj.transactionType) > -1
        } else if (accountNoFilters.length) {
            return accountNoFilters.indexOf(accountObj.accountName) > -1
        } else if (transactionTypeFilters.length) {
            return transactionTypeFilters.indexOf(accountObj.transactionType) > -1
        } else {
            return true
        }
    })
}