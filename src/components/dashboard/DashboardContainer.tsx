import React from 'react';
import { Container, Grid } from '@material-ui/core/';
import { useStyle } from 'useStyle';

export const DashboardContainer: React.FC<any> = props => {
  const classes = useStyle();

  return (
    <Container className={classes.mainContainer} >
      <Grid container spacing={0} style={{height: '100%'}}>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          {props.children}
        </Grid>
      </Grid>
    </Container>
  );
};