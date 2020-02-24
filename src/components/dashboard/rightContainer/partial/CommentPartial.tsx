import React from "react";
import { FieldTypes } from "../types";
import {
  Paper,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  ListItemAvatar,
  Avatar,
  Typography
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import avatar from 'gambar/avatar.png';
import moment from 'moment';
import DeleteIcon from "@material-ui/icons/DeleteOutline";

interface Props {
  value: string;
  handleOnChange: (type: FieldTypes, value: string) => void;
  comment: string[];
  handleAddList: (type: FieldTypes) => void;
  handleKeyDown: (type: FieldTypes, event: React.KeyboardEvent) => void;
  handleDeleteList: (type: FieldTypes, index: number) => void;
}

type CommentPartialProps = Props;

export const CommentPartial: React.FC<CommentPartialProps> = props => {
  const { value, comment, handleOnChange, handleAddList, handleKeyDown, handleDeleteList } = props;
  const dummyDate = moment("2020-2-19");

  return (
    <Paper style={{ height: "100%", overflowX: 'auto'}}>
      <List style={{paddingTop: 0}}>
        <div style={{backgroundColor: '#6c7b95', zIndex: 1500, position: 'sticky', top: 0}}>
          <ListItem ContainerProps={{ style: { paddingLeft: '54px', paddingRight: '32px' } }}>
            <ListItemText primary={
              <TextField 
                fullWidth 
                placeholder="Type here..." 
                value={value} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(FieldTypes.Comment, event.target.value)
                }
                onKeyDown={(event: React.KeyboardEvent) => handleKeyDown(FieldTypes.Comment, event)} 
              />
            } />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleAddList(FieldTypes.Comment)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
        
        {comment.map((value, index) => {
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
                  <IconButton onClick={() => handleDeleteList(FieldTypes.Comment, index)} >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {
                index !== comment.length - 1 &&
                <Divider variant="inset" component="li" />
              }
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};
