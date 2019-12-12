import React from 'react';
import { Paper } from '@material-ui/core/';
import { WithStyles, withStyles } from '@material-ui/styles';
import styles from 'styles';

type AllProps =
  WithStyles<typeof styles>;

const loginForm: React.FC<AllProps> = props => {
  // const { classes } = props;

  return (
    <div>
      <Paper>
        WOOO
      </Paper>
    </div>
  );
};

export const LoginForm = withStyles(styles)(loginForm);