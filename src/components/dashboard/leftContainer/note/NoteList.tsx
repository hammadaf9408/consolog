import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from "@material-ui/core";
import moment from 'moment';
import LockIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";
import { useStyle } from "useStyle";

export const NoteList: React.FC<any> = props => {
  const classes = useStyle();
  const dummy: String[] = ['Inbox', 'Starred', 'Send email', 'Drafts', 'Inbox', 'Starred', 'Send email', 'Drafts', 'Inbox', 'Starred', 'Send email', 'Drafts Drafts Drafts Drafts Drafts Drafts Drafts Drafts'];
  
  return (
    <List>  
      {dummy.map((text, index) => (
        <React.Fragment key={index}>
          <ListItem button>
            <ListItemText 
              primary={<Typography className={classes.textElipsis}>{text}</Typography>} 
              secondary={moment().format('MMM D, YYYY')} />
            <ListItemSecondaryAction>
              {index % 2 === 0 ? <LockIcon color="disabled" /> : <LockOpenIcon color="disabled" />}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};