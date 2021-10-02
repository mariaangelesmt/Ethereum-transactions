import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Transactions from './components/Transactions';
import Home from './components/Home';
import TransactionDetail from './components/TransactionDetail';


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={ Home } />
          <Route path='/transactions' component={ Transactions } />
          <Route path='/transaction-details' component={ TransactionDetail } />
        </Switch>
      </Router>
    </>
  );
  
}


export default App;


