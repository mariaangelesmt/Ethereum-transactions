import React, { useState, useEffect } from 'react';
import './transactionDetail.css';
import Web3 from 'web3';


const TransactionDetail = (props) => {

    const {transaction} = props.location.state;
    // console.log(transaction);

    const initialState = {}

    const [state, setState] = useState(initialState);

    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

    const getTransactionReceipt = async (hash) => {
        const receipt = await web3.eth.getTransactionReceipt(hash);
        setState(receipt);
    }
    // console.log({state});

    useEffect(() => {
        getTransactionReceipt(transaction.hash);
    }, [])


    return (
        <div className="container">
            <a href="/">Home</a>
            <h2>Transaction details</h2>
            <div className="transaction-detail-container">
                <div className="detail-container">
                    <p>Transaction Hash:</p>
                    <p>{transaction.hash}</p>
                </div>
                <div className="detail-container">
                    <p>Status:</p>
                        {
                            state.status ?  <p>Success</p> : <p>Fail</p>
                        }
                </div>
                <div className="detail-container">
                    <p>Block:</p>
                    <p>{transaction.blockNumber}</p>
                </div>
                <div className="detail-container">
                    <p>From:</p>
                    <p>{transaction.from}</p>
                </div>
                <div className="detail-container">
                    <p>Interacted With (To):</p>
                    <p>{transaction.to}</p> 
                </div>
                <div className="detail-container">
                    <p>Gas Price:</p>
                    <p>{transaction.gasPrice}</p>
                </div>
                <div className="detail-container">
                    <p>Tnx Type:</p>
                    <p>{transaction.type}</p>
                </div>
            </div>
        </div> 
    )
}

export default TransactionDetail
