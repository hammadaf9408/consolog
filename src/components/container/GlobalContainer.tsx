import React from 'react'
import { Container, WithStyles, withStyles } from '@material-ui/core';
import { styles } from 'styles';

interface Props {}

type AllProps 
  = WithStyles<typeof styles>
  & Props;

const GlobalContainerView: React.FC<AllProps> = props => {
  const { classes } = props;

  return (
    <Container className={classes.mainContainer} >
      {props.children}
    </Container>
  );
}

export const GlobalContainer = withStyles(styles)(GlobalContainerView)