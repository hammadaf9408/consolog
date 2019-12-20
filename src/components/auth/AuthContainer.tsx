import React from 'react';
import { Container, Grid } from '@material-ui/core/';
import { About } from './about/About';
import { useStyle } from 'useStyle';

export const AuthContainer: React.FC<any> = props => {
  const classes = useStyle();

  return (
    <Container className={classes.mainContainer} >
      <Grid container spacing={0} style={{height: '100%'}}>
        <Grid item xs={12} md={7} lg={7} xl={7}>
          <About />
        </Grid>
        <Grid item xs={12} md={5} lg={5} xl={5}>
          <div className={classes.rightContainer}>
            <div className={classes.authField}>
              {props.children}
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};