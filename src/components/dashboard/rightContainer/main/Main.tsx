import React, { useState } from "react";
import {
  Paper,
  Grid,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import { useStyle } from "useStyle";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import AddIcon from '@material-ui/icons/Add';
import avatar from 'gambar/avatar.png';
import moment from 'moment';

interface Props {}

type MainProps = Props;

export const Main: React.FC<MainProps> = props => {
  const classes = useStyle();
  const [dmCheck, setDmCheck] = useState<String[]>(['A','B'])
  const [addCheck, setAddCheck] = useState<String>('');

  const [komen, setKomen] = useState<String[]>(['Mantap', 'OK']);
  const [addKomen, setAddKomen] = useState<String>('');

  const handleTextCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddCheck(event.target.value);
  };

  const handleAddCheck = () => {
    setDmCheck([addCheck].concat(dmCheck));
    setAddCheck('');
  }

  const handleDeleteCheck = (index: number) => {
    // setDmCheck(dmCheck.filter((item, idx) => idx !== index));
    dmCheck.splice(index, 1);
    setDmCheck([...dmCheck]);
  }

  const handleTextKomen = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddKomen(event.target.value);
  };

  const handleAddKomen = () => {
    // setKomen([...komen, addKomen]);
    setKomen([addKomen].concat(komen))
    setAddKomen('');
  }
  
  const dummyDate = moment("2020-2-19");

  const handleKeyDownCheck = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        setDmCheck([addCheck].concat(dmCheck));
        setAddCheck('');
        break
      case 'Escape':
        // etc...
        break
      default: break
    }
  }

  const handleKeyDownKomen = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        setKomen([addKomen].concat(komen));
        setAddKomen('');
        break
      case 'Escape':
        // etc...
        break
      default: break
    }
  }

  return (
    <div className={classes.mainDiv} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <Paper style={{ height: "100%" }}>
            <TextField
              fullWidth
              multiline
              margin="normal"
              id="filled-basic"
              placeholder="Type your note here..."
              variant="outlined"
              className={classes.mainField}
              inputProps={{
                className: classes.mainFieldInput
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6} style={{ height: "100%" }}>
          <Grid container spacing={0} style={{ height: "100%" }}>
            <Grid item xs={12} sm={6} md={12} lg={12} xl={12} style={{ paddingBottom: "6px", height: "50%" }}>
              <Paper style={{ height: "100%", overflowX: 'auto'}}>
                <List style={{paddingTop: 0}}>
                  <div style={{backgroundColor: '#6c7b95', zIndex: 1000, position: 'sticky', top: 0}}>
                    <ListItem ContainerProps={{ style: { paddingLeft: '54px', paddingRight: '32px' } }}>
                      <ListItemText primary={
                        <TextField fullWidth placeholder="Type here..." value={addCheck} onChange={handleTextCheck} onKeyDown={handleKeyDownCheck} />
                      } />
                      <ListItemSecondaryAction>
                        <IconButton onClick={handleAddCheck}>
                          <AddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                  {dmCheck.map((value, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ListItem>
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText primary={`Item ${value}`} />
                          <ListItemSecondaryAction>
                            <IconButton onClick={() => handleDeleteCheck(index)} >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {
                          index !== dmCheck.length - 1 &&
                          <Divider />
                        }
                      </React.Fragment>
                    );
                  })}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={12} lg={12} xl={12} style={{ paddingTop: "6px", height: "50%" }}>
              <Paper style={{ height: "100%", overflowX: 'auto'}}>
                <List style={{paddingTop: 0}}>
                  <div style={{backgroundColor: '#6c7b95', zIndex: 1500, position: 'sticky', top: 0}}>
                    <ListItem ContainerProps={{ style: { paddingLeft: '54px', paddingRight: '32px' } }}>
                      <ListItemText primary={
                        <TextField fullWidth placeholder="Type here..." value={addKomen} onChange={handleTextKomen} onKeyDown={handleKeyDownKomen} />
                      } />
                      <ListItemSecondaryAction>
                        <IconButton onClick={handleAddKomen}>
                          <AddIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </div>
                  
                  {komen.map((value, index) => {
                    return (
                      <React.Fragment key={index}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={avatar} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography variant="caption"><b>Muhammad Afif</b> - {moment(dummyDate).fromNow()}</Typography>
                            }
                            secondary={value}
                          />
                          <ListItemSecondaryAction>
                            <IconButton >
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {
                          index !== komen.length - 1 &&
                          <Divider variant="inset" component="li" />
                        }
                      </React.Fragment>
                    );
                  })}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
