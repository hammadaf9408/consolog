import React from "react";
import { useStyle } from "useStyle";
import { Paper, TextField } from "@material-ui/core";
import { FieldTypes } from "../types";

interface Props {
  value: string;
  handleOnChange: (type: FieldTypes, value: string) => void;
}

type NotePartialProps = Props;

export const NotePartial: React.FC<NotePartialProps> = props => {
  const classes = useStyle();
  const { value, handleOnChange } = props;

  return (
    <Paper style={{ height: "100%" }}>
      <TextField
        fullWidth
        multiline
        margin="normal"
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleOnChange(FieldTypes.Note, event.target.value)
        }
        placeholder="Type your note here..."
        variant="outlined"
        className={classes.mainField}
        inputProps={{
          className: classes.mainFieldInput
        }}
      />
    </Paper>
  );
};
