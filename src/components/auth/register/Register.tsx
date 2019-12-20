import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
    <div>
      <Typography>
        Have account ? <Link to="/">Login</Link>
      </Typography>
    </div>
  );
};
