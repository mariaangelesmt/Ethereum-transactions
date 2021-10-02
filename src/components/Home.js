import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './home.css';


function Home(props) {

  const initialState = {
    account: '',
    startBlock: '',
    endBlock: '',
    blocks: [],
    blockError: ''
  }

  const [state, setState] = useState(initialState)

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");


    const handleChange = (e) => {
        setState({
          ...state, 
          [e.target.name] : e.target.value 
        });
    }

  const getTransactionsByAccount = async (account, startBlocknumber, endBlocknumber) => {
    if(endBlocknumber == null) {
      endBlocknumber = await web3.eth.getBlockNumber();
    }
    if(startBlocknumber == null) {
      startBlocknumber = endBlocknumber - 1000;
    }

    const numberBlocks = []; 

    for (let i = startBlocknumber; i <= endBlocknumber; i++) {

      let block = await web3.eth.getBlock(i, true);
      if(block.transactions.length > 0) {
        for(let t = 0; t < block.transactions.length; t++) {
          if(account === block.transactions[t].from || account === block.transactions[t].to) {
            numberBlocks.push(block);
          }
        }
      }
    }
    if(numberBlocks.length > 0) {
      setState({...state, blocks: numberBlocks })
    } else {
      setState({...state, blockError: 'No Blocks found' })
    }
  }

  const handleSubmit = (e) => {
    getTransactionsByAccount(state.account, state.startBlock, state.endBlock);
    e.preventDefault();
}

  const showTransactionsFromBlock = (transactions) => {
    return props.history.push('/transactions', {transactions: transactions})
  }


  return (
    <div className="container-home">
        <div className="title-home">
            <h1>The Ethereum Transactions</h1>
            <input className="input-account" type="text" placeholder="enter your account" name="account" value={state.account} onChange={handleChange} />
            <input className="input-block" type="text" placeholder="enter start block" name="startBlock" value={state.startBlock} onChange={handleChange} />
            <input className="input-block" type="text" placeholder="enter end block" name="endBlock" value={state.endBlock} onChange={handleChange} />
            <button onClick={handleSubmit}>Search</button>
        </div>
        <div className="content-container">
          {
            state.blocks.length > 0 ? (
              <>
                <p class="your-account">Your account: {state.account} </p>
                <div className="blocks-container">
                    <p className="title-blocks-container">Blocks</p>
                    {
                        state.blocks.map(block => {
                        return (
                            <div className="block-container">
                                <p>{block.number}</p>   
                                <button className="btn-transactions" onClick={ () => showTransactionsFromBlock(block.transactions) }>
                                    {block.transactions.length} txns
                                </button>       
                            </div>         
                        )
                        })
                    }
                </div>
              </>
            ) : <p>{state.blockError}</p>
          }
            
            
        </div> 
    </div> 
  );
}


export default Home;


