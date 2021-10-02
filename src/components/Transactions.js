import React from 'react';
import './transactions.css';

const Transactions = (props) => {

    const {transactions} = props.location.state;

    const showTransactionsFromBlock = (transaction) => {
        return props.history.push('/transaction-details', {transaction: transaction})
      }

    return (
        <div className="transactions-container">
            <a href="/">Home</a>
            <div className="title">
                <h2>Transactions</h2>
                <p>A total of {transactions.length} transactions found</p>
            </div>
            <div className="title-transactions-container">
                <p>Txn Hash</p>
                <p>Block</p>
            </div>
            <div className="transaction-container">
                {
                    transactions.map(transaction => {
                        return (
                            <div className="transaction-details">
                                <button className="btn-transaction" onClick={ () => showTransactionsFromBlock(transaction) }>
                                    {transaction.hash}
                                </button>    
                                <p>{transaction.blockNumber}</p>
                            </div>
                        )
                    })
                }
            </div>   
        </div>
    )
}

export default Transactions
