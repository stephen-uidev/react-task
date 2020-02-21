import React from 'react';

import { getAccountDetailsById } from './../services';

class AccountDetailsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            accountDetails: undefined
        }
    }

    componentDidMount() {
        const { accountNo } = this.props.match.params;
        const data = getAccountDetailsById(accountNo);
        this.setState({
            accountDetails: data
        })
    }

    render() {
        const accountDetails = this.state.accountDetails;
        return (
            <div className='body-wrapper' >
                <h3 className='title'> Transactions {accountDetails && accountDetails.account}</h3>

                {accountDetails && accountDetails.account ?
                    <div className='account-details'>
                        <div>
                            <label>Account No.: </label>
                            <span>{accountDetails.account}</span>
                        </div>
                        <div>
                            <label>Account Name:</label>
                            <span>{accountDetails.accountName}</span>
                        </div>
                        <div>
                            <label>Currency Code:</label>
                            <span>{accountDetails.currencyCode}</span>
                        </div>
                        <div>
                            <label>Amount:</label>
                            <span>{accountDetails.amount}</span>
                        </div>
                        <div>
                            <label>Transaction Type:</label>
                            <span>{accountDetails.transactionType}</span>
                        </div>
                    </div>
                    :
                    null
                }

            </div>
        )

    }

}

export default AccountDetailsPage;