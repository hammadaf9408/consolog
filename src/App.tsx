import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContainer, Register, Login } from 'components/auth';
import { LoadingState } from 'context/loading/LoadingState';

import './App.css';

export const App: React.FC<any> = props => {
  
  return (
    <React.Fragment>
      <LoadingState>
        <Router>
          <Switch>
            <AuthContainer>
              <Route path="/register" component={Register} />
              <Route exact path="/" component={Login} />
            </AuthContainer>
          </Switch>
        </Router>
      </LoadingState>
    </React.Fragment>
  );
};