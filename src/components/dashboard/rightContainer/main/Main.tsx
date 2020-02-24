import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useStyle } from "useStyle";
import { FieldTypes } from "../types";
import { NotePartial } from "../partial/NotePartial";
import { TodoPartial } from "../partial/TodoPartial";
import { CommentPartial } from "../partial/CommentPartial";

interface Props {}

type MainProps = Props;

export const Main: React.FC<MainProps> = props => {
  const classes = useStyle();

  const [note, setNote] = useState<string>('');
  const [todoField, setTodoField] = useState<string>('');
  const [commentField, setCommentField] = useState<string>('');

  const [todoList, setTodoList] = useState<string[]>(['A','B']);
  const [commentList, setCommentList] = useState<string[]>(['Mantap', 'OK']);

  const handleOnChange = (type: FieldTypes, value: string) => {
    switch (type) {
      case FieldTypes.Note:
        setNote(value);
        break;
      case FieldTypes.Todo:
        setTodoField(value);
        break;
      case FieldTypes.Comment:
        setCommentField(value);
        break;
    
      default:
        break;
    }
  }

  const handleAddList = (type: FieldTypes) => {
    switch (type) {
      case FieldTypes.Todo:
        setTodoList([todoField].concat(todoList));
        setTodoField('');
        break;
      case FieldTypes.Comment:
        setCommentList([commentField].concat(commentList))
        setCommentField('');
        break;
    
      default:
        break;
    }
  }
  const handleKeyDown = (type: FieldTypes, event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
        if (type === FieldTypes.Todo) {
          setTodoList([todoField].concat(todoList));
          setTodoField('');
        }
        if (type === FieldTypes.Comment) {
          setCommentList([commentField].concat(commentList))
          setCommentField('');
        }
        break
      case 'Escape':
        // etc...
        break
      default: break
    }
  }

  const handleDeleteList = (type: FieldTypes, index: number) => {
    switch (type) {
      case FieldTypes.Todo:
        // setDmCheck(dmCheck.filter((item, idx) => idx !== index));
        todoList.splice(index, 1);
        setTodoList([...todoList]);
        break;
      case FieldTypes.Comment:
        commentList.splice(index, 1);
        setCommentList([...commentList]);
        break;
    
      default:
        break;
    }
  }

  return (
    <div className={classes.mainDiv} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <NotePartial
            value={note}
            handleOnChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6} xl={6} style={{ height: "100%" }}>
          <Grid container spacing={0} style={{ height: "100%" }}>
            <Grid item xs={12} sm={6} md={12} lg={12} xl={12} style={{ paddingBottom: "6px", height: "50%" }}>
              <TodoPartial
                value={todoField}
                handleOnChange={handleOnChange}
                todo={todoList}
                handleAddList={handleAddList}
                handleKeyDown={handleKeyDown}
                handleDeleteList={handleDeleteList}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={12} lg={12} xl={12} style={{ paddingTop: "6px", height: "50%" }}>
              <CommentPartial
                value={commentField}
                handleOnChange={handleOnChange}
                comment={commentList}
                handleAddList={handleAddList}
                handleKeyDown={handleKeyDown}
                handleDeleteList={handleDeleteList}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
