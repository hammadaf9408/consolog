import React from 'react'
import { useStyle } from 'useStyle';
import { Container } from '@material-ui/core';

export const GlobalContainer: React.FC<any> = props => {
  const classes = useStyle();

  return (
    <Container className={classes.mainContainer} >
      {props.children}
    </Container>
  );
}
