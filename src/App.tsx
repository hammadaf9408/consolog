import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContainer, Register, Login } from 'components/auth';

import './App.css';

export const App: React.FC<any> = props => {
  
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <AuthContainer>
            <Route path="/register" component={Register} />
            <Route exact path="/" component={Login} />
          </AuthContainer>
        </Switch>
      </Router>
    </React.Fragment>
  );
};