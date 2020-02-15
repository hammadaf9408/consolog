import React, { useContext } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";
import moment from 'moment';
import LockIcon from "@material-ui/icons/LockOutlined";
import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";
import { useStyle } from "useStyle";
import Skeleton from '@material-ui/lab/Skeleton';
import { LoadingContext } from "context/loading/loadingContext";

export const NoteList: React.FC<any> = props => {
  const classes = useStyle();
  const loadingContext = useContext(LoadingContext);
  const { loading } = loadingContext;

  const dummy: String[] = ['Inbox', 'Starred', 'Send email', 'Drafts', 'Inbox', 'Starred', 'Send email', 'Drafts', 'Inbox', 'Starred', 'Send email', 'Drafts Drafts Drafts Drafts Drafts Drafts Drafts Drafts'];
  
  const skeleton = () => {
    const render = [];

    for (let i = 0; i < 9; i++) {
      render.push(
        <React.Fragment key={i}>
          <ListItem>
            <ListItemText 
              primary={<Skeleton className={classes.skeleton} variant="text" width={`${Math.floor((Math.random() * 40) + 40)}%`} />}
              secondary={<Skeleton className={classes.skeleton} width={'30%'} />}
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      )
    }

    return render;
  }

  return (
    <List>
      {
        loading ?
          skeleton()
        :
          dummy.map((text, index) => (
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
          ))
      }
    </List>
  );
};