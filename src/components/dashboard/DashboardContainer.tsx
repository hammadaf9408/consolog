import React from 'react';
import { Container, Grid, WithStyles, withStyles } from '@material-ui/core/';
import { styles } from 'styles';

interface Props {}

type AllProps 
  = WithStyles<typeof styles>
  & Props;

const DashboardContainerView: React.FC<AllProps> = props => {
  const { classes } = props;

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

export const DashboardContainer = withStyles(styles)(DashboardContainerView)