import * as React from "react";
import { Grid, Paper, AppBar, Toolbar, IconButton, FormControl, Input } from "@material-ui/core";
import { useStyle } from "useStyle";
import { FieldTypes } from "../types";
import { NotePartial } from "../partial/NotePartial";
import { TodoPartial } from "../partial/TodoPartial";
import { CommentPartial } from "../partial/CommentPartial";
import MenuIcon from "@material-ui/icons/Menu";
// import BackIcon from "@material-ui/icons/KeyboardBackspace";
import { OptionsList } from "../options/OptionsList";
import { INotePayload } from "../interface";
import { useForm } from "react-hook-form";
import { LoadingContext } from "context/loading/loadingContext";
import { AxiosResponse } from "axios";
import { ApiCall, Cookies } from "middleware";
import { API_ROUTES, LOCALNAME } from "utils/Constant";
import { IError } from "context/error/IError";
import { ErrorContext } from "context/error/errorContext";
import { NotesContext } from "components/dashboard/context/notes/notesContext";

interface Props {}

type MainProps = Props;

export const Main: React.FC<MainProps> = props => {
  const classes = useStyle();

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [commentField, setCommentField] = React.useState<string>('');

  const [commentList, setCommentList] = React.useState<string[]>(['Mantap', 'OK']);

  const handleOnChange = (type: FieldTypes, value: string) => {
    switch (type) {
      case FieldTypes.Comment:
        setCommentField(value);
        break;
    
      default:
        break;
    }
  }

  const handleAddList = (type: FieldTypes) => {
    switch (type) {
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
      case FieldTypes.Comment:
        // setDmCheck(dmCheck.filter((item, idx) => idx !== index));
        commentList.splice(index, 1);
        setCommentList([...commentList]);
        break;
    
      default:
        break;
    }
  }

  const loadingContext = React.useContext(LoadingContext);
  const errorContext = React.useContext(ErrorContext);

  const { loading, setLoading, resetLoading } = loadingContext;
  const { setError } = errorContext;

  const notesContext = React.useContext(NotesContext);
  const { singleNote, loadAllNotes, loadSingleNote } = notesContext;
  
  const { handleSubmit, register, reset, control, watch } = useForm<INotePayload>({
    // mode: "onChange",
    defaultValues: {
      title: '',
      note: '',
      dueDate: {
        date: null,
        value: false
      },
      todo: [],
    }
  });
  
  const onSubmit = async (values: INotePayload) => {
    // console.log('e', e);
    const tembuss = false;
    let payload: INotePayload;

    if (values.todo) {
      payload = values
    } else {
      payload = {
        ...values,
        todo: []
      }
    }

    console.log('payload', payload);

    setLoading();
    let res: AxiosResponse<any>;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get(LOCALNAME.TOKEN)}`
      }
    }
    if (singleNote) {
      res = await ApiCall.put(API_ROUTES.NOTES, singleNote?._id, payload, config)
    } else {
      res = await ApiCall.post(API_ROUTES.NOTES, payload, config);
    }
    if (res) {
      if (res.status === 200) {
        loadSingleNote(res.data.data);
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
    if (tembuss) {
    }
  }

  React.useEffect(() => {
    // console.log('main render');
    // console.log('getVal', getValues());
  })

  React.useEffect(() => {
    reset({
      title: singleNote?.title,
      note: singleNote?.note,
      dueDate: singleNote?.dueDate,
      todo: singleNote?.todo
    });
  }, [singleNote, reset])

  const todos = watch('todo');

  React.useEffect(() => {
    console.log('todos', todos)
  })
  return (
    <Paper className={classes.rightContainer}>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(onSubmit)(e);}} style={{height: '100%'}}>
        <AppBar position="fixed" className={classes.rightAppBar}>
          <Toolbar>
            {/* This icon only show on small width */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            {/* Back button */}
            {/* <IconButton edge="start" className={classes.backButton} color="inherit" aria-label="menu">
              <BackIcon />
            </IconButton> */}
            <FormControl style={{width: '30%'}}>
              <Input
                disabled={loading}
                style={{color: '#fff'}}
                placeholder="Title"
                type="text"
                name="title"
                inputRef={register()}
              />
            </FormControl>
          </Toolbar>
        </AppBar>
        {/*  */}
        <Grid container spacing={0} className={classes.mainGridContainer}>
          <Grid item xs={12} style={{height: '10%'}}>
            <OptionsList
              register={register} 
              initialValue={singleNote?.dueDate}
            />
          </Grid>
          <Grid item xs={12} style={{height: '90%', paddingBottom: '16px'}}>
            <div className={classes.mainDiv} >
              <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6} xl={6}>
                  <NotePartial
                    defaultValue={singleNote}
                    loading={loading}
                    register={register}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={6} xl={6} style={{ height: "100%" }}>
                  <Grid container spacing={0} style={{ height: "100%" }}>
                    <Grid item xs={12} sm={6} md={12} lg={12} xl={12} style={{ paddingBottom: "6px", height: "50%" }}>
                      <TodoPartial
                        control={control}
                        register={register}
                        loading={loading}
                        initialValue={singleNote?.todo}
                        // currentValue={todos.todo}
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
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
