import React from 'react';
import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect } from 'react-router-dom';
import { Register, Login } from 'components/auth';
import { LoadingState } from 'context/loading/LoadingState';
import { ErrorState } from 'context/error/ErrorState';
import { Cookies } from 'middleware';
import { LOCALNAME } from 'utils/Constant';
import { Home } from 'components/dashboard/home/Home';
import './App.css';
import { GlobalContainer } from 'components/container/GlobalContainer';

interface IPrivateRoute extends RouteProps {
  component: any;
}

const PrivateRoute = (props: IPrivateRoute) => {
  const { component: Component, location, ...rest } = props;

  return (
    <Route
        {...rest}
        render = {(routeProps: any) =>
            Cookies.get(LOCALNAME.TOKEN) ?
            <Component {...routeProps} />
            :
            <Redirect to='/login'/>
        }
    />
  )
}

export const App: React.FC<any> = props => {
  
  return (
    <React.Fragment>
      <LoadingState>
        <ErrorState>
          <Router>
            <Switch>
              <GlobalContainer>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <PrivateRoute path="/" component={Home} />
              </GlobalContainer>
            </Switch>
          </Router>
        </ErrorState>
      </LoadingState>
    </React.Fragment>
  );
};