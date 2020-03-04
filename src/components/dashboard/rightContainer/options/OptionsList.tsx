import React, { useState } from 'react';
import { Fab, Checkbox, Badge, Menu, MenuItem } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
// import ClearIcon from '@material-ui/icons/Clear';
// import DoneIcon from '@material-ui/icons/Done';
// import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
// import HistoryIcon from '@material-ui/icons/History';
import SaveIcon from '@material-ui/icons/SaveOutlined';
import { useStyle } from 'useStyle';
import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment from 'moment';
import { NotesContext } from 'components/dashboard/context/notes/notesContext';
import { AxiosResponse } from 'axios';
import { LoadingContext } from 'context/loading/loadingContext';
import { ErrorContext } from 'context/error/errorContext';
import { ApiCall } from 'middleware';
import { API_ROUTES, CONFIG_AXIOS } from 'utils/Constant';
import { IError } from 'context/error/IError';
import { INotesDueDate } from 'components/dashboard/context/notes/INotesDueDate';

interface Props {
  register: any;
  initialValue?: INotesDueDate;
}

export type OptionsProps = Props;

export const OptionsList: React.FC<OptionsProps> = props => {
  const classes = useStyle();
  const { initialValue, register } = props;
  const [selectedDate, handleDateChange] = useState<MaterialUiPickersDate>(null);
  const [checkDue, setCheckDue] = useState<boolean>(false);

  const notesContext = React.useContext(NotesContext);
  const loadingContext = React.useContext(LoadingContext);
  const errorContext = React.useContext(ErrorContext);
  
  const { singleNote, loadSingleNote, loadAllNotes } = notesContext;
  const { loading, setLoading, resetLoading } = loadingContext;
  const { setError } = errorContext;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDelete = async () => {
    setAnchorEl(null);
    if (singleNote) {
      setLoading();
      let res: AxiosResponse<any> = await ApiCall.delete(API_ROUTES.NOTES, singleNote._id, CONFIG_AXIOS.WITHAUTH);
      if (res) {
        if (res.status === 200) {
          loadSingleNote();
          loadAllNotes();
        } else {
          const err: IError = {
            status: res.status,
            statusText: res.statusText,
            message: res.data.error || 'Error'
          }
          setError(err);
        }
        resetLoading();
      }
    }
  }

  React.useEffect(() => {
    // console.log('Option render')
  })

  React.useEffect(() => {
    if (initialValue) {
      handleDateChange(moment(initialValue.date))
      setCheckDue(initialValue.value);
    } else {
      handleDateChange(null)
      setCheckDue(false);
    }
  }, [initialValue])

  return (
    <div className={classes.options}>
      <div style={{width: '50%', paddingTop: '8px'}}>
        <DateTimePicker
          disabled={loading}
          autoOk
          clearable
          ampm={false}
          inputVariant="outlined"
          color="primary"
          label="Due date"
          className={classes.dueDate}
          name="dueDate.date"
          inputRef={register()}
          value={selectedDate}
          format="MMM DD, YYYY HH:mm"
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
          disabled={!selectedDate || loading}
          color="primary"
          value={checkDue}
          checked={checkDue}
          name="dueDate.value"
          inputRef={register()}
          onChange={e => {
            setCheckDue(e.target.checked);
          }}
        />
      </div>
      <div className={classes.optionsFab}>
        <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem} type="submit" disabled={loading}>
          <Badge variant="dot" color="secondary" overlap="circle">
            <SaveIcon />
          </Badge>
        </Fab>
        {/* <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem}>
          <VisibilityIcon />
        </Fab>
        <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem}>
          <HistoryIcon />
        </Fab> */}
        {
          singleNote &&
          <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem} disabled={loading} onClick={handleDelete} >
            <DeleteIcon />
          </Fab>
        }
        <Fab color="primary" aria-label="add" size="small" className={classes.optionsFabItem} disabled={loading} >
          <InfoIcon />
        </Fab>
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{
          paper: classes.menu
        }}
      >
        <MenuItem className={classes.menuItem} onClick={handleClose}>No, don't</MenuItem>
        <MenuItem className={classes.menuItemError} onClick={onDelete}>Yes, Delete!</MenuItem>
      </Menu>
    </div>
  )
}
