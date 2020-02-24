import React from "react";
import { FieldTypes } from "../types";
// import { useStyle } from "useStyle";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  ListItemIcon,
  Checkbox
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from "@material-ui/icons/DeleteOutline";

interface Props {
  value: string;
  handleOnChange: (type: FieldTypes, value: string) => void;
  todo: string[];
  handleAddList: (type: FieldTypes) => void;
  handleKeyDown: (type: FieldTypes, event: React.KeyboardEvent) => void;
  handleDeleteList: (type: FieldTypes, index: number) => void;
}

type TodoPartialProps = Props;

export const TodoPartial: React.FC<TodoPartialProps> = props => {
  // const classes = useStyle();
  const { value, todo, handleOnChange, handleAddList, handleKeyDown, handleDeleteList } = props;

  return (
    <Paper style={{ height: "100%", overflowX: 'auto'}}>
      <List style={{paddingTop: 0}}>
        <div style={{backgroundColor: '#6c7b95', zIndex: 1000, position: 'sticky', top: 0}}>
          <ListItem ContainerProps={{ style: { paddingLeft: '54px', paddingRight: '32px' } }}>
            <ListItemText primary={
              <TextField 
                fullWidth 
                placeholder="Type here..." 
                value={value} 
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleOnChange(FieldTypes.Todo, event.target.value)
                }
                onKeyDown={(event: React.KeyboardEvent) => handleKeyDown(FieldTypes.Todo, event)} 
              />
            } />
            <ListItemSecondaryAction>
              <IconButton onClick={() => handleAddList(FieldTypes.Todo)}>
                <AddIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </div>
        {todo.map((value, index) => {
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
                  <IconButton onClick={() => handleDeleteList(FieldTypes.Todo, index)} >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {
                index !== todo.length - 1 &&
                <Divider />
              }
            </React.Fragment>
          );
        })}
      </List>
    </Paper>
  );
};
