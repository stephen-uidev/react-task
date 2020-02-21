import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import AccountDetailsPage from './components/account-details-components';
import ListAccountData from './components/list-accounts-components';

/**
 * This is start point of application
 */
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/details/:accountNo" component={AccountDetailsPage} />
        <Route path="/" component={ListAccountData} />
      </Switch>
    </Router >
  );
}

export default App;
