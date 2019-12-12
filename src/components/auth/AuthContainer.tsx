import React from 'react';
import { Container } from '@material-ui/core/';
import { WithStyles, withStyles } from '@material-ui/styles';
import styles from 'styles';

type AllProps =
  WithStyles<typeof styles>;

const authContainer: React.FC<AllProps> = props => {
  const { classes } = props;

  return (
      <Container className={classes.mainContainer} >
        {props.children}
      </Container>
  );
};

export const AuthContainer = withStyles(styles)(authContainer);