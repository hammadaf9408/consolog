import React, { useMemo } from 'react';
import { BrowserRouter as Router, Switch, Route, RouteProps, Redirect } from 'react-router-dom';
import { Register, Login } from 'components/auth';
import { LoadingState } from 'context/loading/LoadingState';
import { ErrorState } from 'context/error/ErrorState';
import { Cookies } from 'middleware';
import { LOCALNAME } from 'utils/Constant';
import { Home } from 'components/dashboard/home/Home';
import { GlobalContainer } from 'components/container/GlobalContainer';
import './App.css';
import { ThemeProvider, createMuiTheme, useMediaQuery } from '@material-ui/core';
import { NotesState } from 'components/dashboard/context/notes/NotesState';
import { AlertState } from 'context/alert/AlertState';

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
            <Redirect to='/'/>
        }
    />
  )
}

export const App: React.FC<any> = props => {
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          // type: prefersDarkMode ? 'dark' : 'light',
          type: 'light'
        },
      }),
    // eslint-disable-next-line
    [prefersDarkMode],
  );

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>        
        <LoadingState>
          <ErrorState>
            <AlertState>
              <Router>
                <Switch>
                  <GlobalContainer>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <NotesState>
                        <PrivateRoute path="/home" component={Home} />
                    </NotesState>
                  </GlobalContainer>
                </Switch>
              </Router>
            </AlertState>
          </ErrorState>
        </LoadingState>
      </ThemeProvider>
    </React.Fragment>
  );
};