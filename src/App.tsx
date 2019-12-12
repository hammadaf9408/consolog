import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContainer, RegisterForm, LoginForm } from 'components/auth';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <AuthContainer>
          <Route path="/register" component={RegisterForm} />
          <Route exact path="/" component={LoginForm} />
        </AuthContainer>
      </Switch>
    </Router>
  );
};

export default App;
