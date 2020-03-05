import React from "react";
import { Typography, WithStyles, withStyles } from "@material-ui/core";
import { styles } from 'styles';

interface Props {}

type AllProps 
  = WithStyles<typeof styles>
  & Props;

const AboutView: React.FC<AllProps> = props => {
  const { classes } = props;

  return (
    <div className={classes.leftContainer}>
      <div className={classes.leftInner}>
        <Typography variant="h1">CLog</Typography>
        <div className={classes.subTitle}>
          <Typography variant="body1">
            Here are where your notes are comes. Type every single of your
            moment or script so that you get reminder
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const About = withStyles(styles)(AboutView)