import * as React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  WithStyles, 
  withStyles, 
  Tooltip
} from "@material-ui/core";
import moment from 'moment';
import AssignmentIcon from "@material-ui/icons/AssignmentOutlined";
import AssignmentOkIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import AssignmentLateIcon from "@material-ui/icons/AssignmentLateOutlined";
import { LoadingContext } from "context/loading/loadingContext";
import { SkeletonLoad } from "../skeleton/SkeletonLoad";
import { NotesContext } from "components/dashboard/context/notes/notesContext";
import { styles } from 'styles';

interface Props {}

type AllProps 
  = WithStyles<typeof styles>
  & Props;

const NoteListView: React.FC<AllProps> = props => {

  /* ============================================ PROPS =============================================== */
  
  const { classes } = props;
  
  /* ============================================ USESTATE ============================================ */
  
  
  /* ============================================ USECONTEXT ========================================== */
  
  const loadingContext = React.useContext(LoadingContext);
  const notesContext = React.useContext(NotesContext);

  const { loadAllNotes, allNotes, loadSingleNote, singleNote } = notesContext;
  const { loading } = loadingContext;

  /* ============================================ USEEFFECT =========================================== */

  React.useEffect(() => {
    loadAllNotes();
    // eslint-disable-next-line
  }, [])

  /* ============================================ OTHERS ============================================== */
  
  
  /* ============================================ VIEW ================================================ */
  
  return (
    <List>
      {
        loading ?
          <SkeletonLoad />
        :
          allNotes?.data?.map((item, index) => (
            <React.Fragment key={item._id}>
              <ListItem button onClick={() => loadSingleNote(item)} selected={singleNote?._id === item._id}>
                <ListItemText 
                  primary={<Typography className={classes.textElipsis}>{item.title}</Typography>} 
                  secondary={moment(item.createdAt).format('MMM D, YYYY')} />
                <ListItemSecondaryAction>
                  {
                    item.dueDate &&
                    item.dueDate.date &&
                    (
                      item.dueDate.value ?
                      <Tooltip title={moment(item.dueDate.date).format('MMM D, YYYY')}>
                        <AssignmentOkIcon style={{color: '#388e3c'}} />
                      </Tooltip>
                      :
                      (
                        moment(item.dueDate.date).isBefore(moment()) ?
                        <Tooltip title={moment(item.dueDate.date).format('MMM D, YYYY')}>
                          <AssignmentLateIcon style={{color: 'rgba(244, 67, 54, 0.8)'}} />
                        </Tooltip>
                        :
                        <Tooltip title={moment(item.dueDate.date).format('MMM D, YYYY')}>
                          <AssignmentIcon style={{color: 'rgba(63, 81, 181, 0.8)'}} />
                        </Tooltip>
                      )
                    )
                  }
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))
      }
    </List>
  );
};

export const NoteList = withStyles(styles)(NoteListView)