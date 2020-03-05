import React from 'react';
import { Grid, WithStyles, withStyles } from '@material-ui/core/';
import { About } from './about/About';
import { styles } from 'styles';

interface Props {}

type AllProps 
  = WithStyles<typeof styles>
  & Props;


const AuthContainerView: React.FC<AllProps> = props => {
  const { classes } = props;

  return (
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
  );
};

export const AuthContainer = withStyles(styles)(AuthContainerView)