import React from 'react';
import { Link } from "react-router-dom";

import Checkbox from './common-components/checkbox-components';
import { getAllAccountData, filterAccounts } from './../services'
import { accountName, transactionType, header } from './../constant';

/**
 * This page will display all the accounts information with filters
 */
class ListAccountData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountsData: undefined
        }
    }

    componentWillMount = () => {
        this.selectedAccountCheckboxes = new Set();
        this.selectedTransactionCheckboxes = new Set();
        const data = getAllAccountData();
        this.setState({
            accountsData: data
        })
    }

    /**
     * This function runs on Account filters checked or unchecked event
     */
    toggleAccountCheckbox = label => {
        if (this.selectedAccountCheckboxes.has(label)) {
            this.selectedAccountCheckboxes.delete(label);
        } else {
            this.selectedAccountCheckboxes.add(label);
        }
        this.filterData();
    }


    /**
     * This function runs on Transaction filters checked or unchecked event
     */
    toggleTransactionCheckbox = label => {
        if (this.selectedTransactionCheckboxes.has(label)) {
            this.selectedTransactionCheckboxes.delete(label);
        } else {
            this.selectedTransactionCheckboxes.add(label);
        }
        this.filterData();
    }

    /**
     * This funtion filters the result
     */
    filterData = () => {
        let accountFilter = Array.from(this.selectedAccountCheckboxes);
        let transactionFilter = Array.from(this.selectedTransactionCheckboxes);
        const data = filterAccounts(accountFilter, transactionFilter);

        this.setState({
            accountsData: data
        })
    }

    /**
     * Render account checkbox filters
     */
    createAccountCheckbox = label => (
        <Checkbox
            label={label}
            handleCheckboxChange={this.toggleAccountCheckbox}
            key={label}
        />
    )

    /**
     * Render transaction checkbox filters
     */
    createTransactionCheckbox = label => (
        <Checkbox
            label={label}
            handleCheckboxChange={this.toggleTransactionCheckbox}
            key={label}
        />
    )

    /**
     * Render table header
     */
    renderTableHeader() {
        return header.map((key, index) => {
            return <th key={index}>{key}</th>
        })
    }

    /**
     * render table body data
     */
    renderTableData() {
        return this.state.accountsData.map((accountObj, index) => {
            const { account, accountName, currencyCode, amount, transactionType } = accountObj //destructuring
            const link = `/details/${account}`;
            return (
                <tr key={index}>
                    <td>
                        <Link to={link} >{account}</Link>
                    </td>
                    <td>{accountName}</td>
                    <td>{currencyCode}</td>
                    <td>{amount}</td>
                    <td>{transactionType}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className='body-wrapper'>
                <h3 className='title'>My Transactions </h3>
                <div className='filter-wrapper'>
                    <p className='subtitle' > Filters </p>
                    <div className='filters'>
                        <p className='subtitle' > Account Name </p>
                        {
                            accountName.map(this.createAccountCheckbox)
                        }
                    </div>
                    <div className='filters'>
                        <p className='subtitle' > Transaction Type</p>
                        {
                            transactionType.map(this.createTransactionCheckbox)
                        }
                    </div>
                </div>
                <div className='table-wrapper'>

                    <table id='list-table'>
                        <tbody>
                            <tr>{this.renderTableHeader()}</tr>
                            {
                                this.state.accountsData && this.state.accountsData.length ?
                                    this.renderTableData()
                                    :
                                    null
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        )
    };

}

export default ListAccountData;