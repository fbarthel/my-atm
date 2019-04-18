import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from 'react-router-dom';
import './App.css';
import OverviewPage from './components/OverviewPage';
import WithdrawPage from './components/WithdrawPage';
import RestockPage from './components/RestockPage';
import {DataProvider} from './Store'

class App extends Component {
  render() {
    return (
      <Router>
        <DataProvider>
         <ul>
         <li>
           <Link to="/overview">Overview</Link>
         </li>
         <li>
           <Link to="/withdraw">Withdraw</Link>
         </li>
         <li>
           <Link to="/restock">Restock</Link>
         </li>
       </ul>
       <hr />
       <Route exact path="/overview" component={OverviewPage} />
       <Route path="/withdraw" component={WithdrawPage} />
       <Route path="/restock" component={RestockPage} />
        </DataProvider>
    </Router>
    );
  }
}

export default App;