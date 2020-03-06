import React from "react";
import { Paper, FormControl, OutlinedInput, WithStyles, withStyles } from "@material-ui/core";
import { INotes } from "components/dashboard/context/notes/INotes";
import { styles } from 'styles';

interface Props {
  defaultValue?: INotes;
  loading: boolean;
  register: any;
}

type NotePartialProps 
  = WithStyles<typeof styles>
  & Props;

const NotePartialView: React.FC<NotePartialProps> = props => {
  const { register, loading, classes, defaultValue } = props;

  return (
    <Paper style={{ height: "100%" }}>
      <FormControl variant="outlined" className={classes.mainField} style={{width: '100%'}}>
        <OutlinedInput
          defaultValue={defaultValue?.note}
          disabled={loading}
          multiline
          fullWidth
          placeholder="Type your note here..."
          type="text"
          name="note"
          inputProps={{
            className: classes.mainFieldInput
          }}
          inputRef={register()}
        />
      </FormControl>
    </Paper>
  );
};

export const NotePartial = withStyles(styles)(NotePartialView)