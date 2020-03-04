import * as React from "react";
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
import { LoadingContext } from "context/loading/loadingContext";
import { SkeletonLoad } from "../skeleton/SkeletonLoad";
import { NotesContext } from "components/dashboard/context/notes/notesContext";

export const NoteList: React.FC<any> = props => {
  const classes = useStyle();
  const loadingContext = React.useContext(LoadingContext);
  const { loading } = loadingContext;

  React.useEffect(() => {
    // console.log('note render')
  })

  const notesContext = React.useContext(NotesContext);
  const { loadAllNotes, allNotes, loadSingleNote } = notesContext;

  React.useEffect(() => {
    loadAllNotes();
    // eslint-disable-next-line
  }, [])
  
  return (
    <List>
      {
        loading ?
          <SkeletonLoad />
        :
          allNotes?.data?.map((item, index) => (
            <React.Fragment key={item._id}>
              <ListItem button onClick={() => loadSingleNote(item)}>
                <ListItemText 
                  primary={<Typography className={classes.textElipsis}>{item.title}</Typography>} 
                  secondary={moment(item.createdAt).format('MMM D, YYYY')} />
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