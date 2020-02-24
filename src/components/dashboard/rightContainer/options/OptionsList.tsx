import React, { useState } from 'react';
import { Fab, Checkbox } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import HistoryIcon from '@material-ui/icons/History';
import { useStyle } from 'useStyle';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';

interface Props {}

export type OptionsProps = Props;

export const OptionsList: React.FC<OptionsProps> = props => {
  const classes = useStyle();
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(null);
  const [checkDue, setCheckDue] = useState<boolean>(false);

  return (
    <div className={classes.options}>
      <div style={{width: '50%', paddingTop: '8px'}}>
        <DateTimePicker
          autoOk
          clearable
          ampm={false}
          inputVariant="filled"
          color="primary"
          label="Due date"
          className={classes.dueDate}
          value={selectedDate}
          onChange={date => {
            handleDateChange(date)
            if (!date && checkDue) {
              setCheckDue(false);
            }
          }}
          InputProps={{
            className: selectedDate && moment(selectedDate).isBefore(moment()) ? (checkDue ? '' : classes.dueDate) : ''
          }}
        />
        <Checkbox 
          style={{padding: '0', verticalAlign: 'bottom'}} 
          disabled={!selectedDate}
          color="primary"
          value={checkDue}
          checked={checkDue}
          onChange={e => setCheckDue(e.target.checked)}
        />
      </div>
      <div className={classes.optionsFab}>
        <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem}>
          <VisibilityIcon />
        </Fab>
        <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem}>
          <HistoryIcon />
        </Fab>
        <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem}>
          <DeleteIcon />
        </Fab>
        <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem}>
          <InfoIcon />
        </Fab>
      </div>
    </div>
  )
}
