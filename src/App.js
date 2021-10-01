import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';

function App() {

  const initialState = {
    account: '',
    blocks: []
  }

  const [state, setState] = useState(initialState)

  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

  const getTransactionsByAccount = async (myaccount, startBlocknumber, endBlocknumber) => {
    if(endBlocknumber == null) {
      endBlocknumber = await web3.eth.getBlockNumber();
    }
    if(startBlocknumber == null) {
      startBlocknumber = endBlocknumber - 1000;
    }

    const numberBlocks = []; 

    for (var i = startBlocknumber; i <= endBlocknumber; i++) {

      var block = await web3.eth.getBlock(i, true);
      console.log(block);
      numberBlocks.push(block);
    }

    setState({...state, blocks: numberBlocks })
    console.log(numberBlocks.length)
  }

  useEffect(() => {
    getTransactionsByAccount(0x98341B10CAfd8d6658Fd4239469E1e713CBC2320, 13331647, 13331650);
  }, [])


  return (
    <div>
      <h1>hola</h1>
      <p>Your account: {  } </p>
      <p>Blocks</p>
      {
        state.blocks.map(block => {
          return (
            <>
              <p>{block.number}</p>
              <p>{block.transactions.length} txns</p>
            </>         
          )
        })
      }
    </div> 
  );
}

export default App;


