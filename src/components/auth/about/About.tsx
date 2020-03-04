import React from "react";
import { Typography } from "@material-ui/core";
import { useStyle } from "useStyle";

export const About: React.FC<any> = props => {
  const classes = useStyle();

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