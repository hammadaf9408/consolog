import React from "react";
import { useStyle } from "useStyle";
import { Paper, FormControl, OutlinedInput } from "@material-ui/core";
import { INotes } from "components/dashboard/context/notes/INotes";

interface Props {
  defaultValue?: INotes;
  loading: boolean;
  register: any;
}

type NotePartialProps = Props;

export const NotePartial: React.FC<NotePartialProps> = props => {
  const classes = useStyle();
  const { register, loading } = props;

  return (
    <Paper style={{ height: "100%" }}>
      <FormControl variant="outlined" className={classes.mainField} style={{width: '100%'}}>
        <OutlinedInput
          // defaultValue={defaultValue?.note}
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
