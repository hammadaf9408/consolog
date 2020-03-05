import React from 'react'
import { ListItem, ListItemText, Divider, WithStyles, withStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { styles } from 'styles';

interface Props {}

type AllProps 
  = WithStyles<typeof styles>
  & Props;

const SkeletonLoadView: React.FC<AllProps> = props => {
  const { classes } = props;
  const render = [];

  for (let i = 0; i < 9; i++) {
    render.push(
      <React.Fragment key={i}>
        <ListItem>
          <ListItemText 
            primary={<Skeleton className={classes.skeleton} variant="text" width={`${Math.floor((Math.random() * 40) + 40)}%`} />}
            secondary={<Skeleton className={classes.skeleton} width={'30%'} />}
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {render}
    </React.Fragment>
  );
}

export const SkeletonLoad = withStyles(styles)(SkeletonLoadView)