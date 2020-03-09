import * as React from "react";
import { Grid, Paper, AppBar, Toolbar, IconButton, FormControl, Input, withStyles, WithStyles } from "@material-ui/core";
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
import { API_ROUTES } from "utils/Constant";
import { NotesContext } from "components/dashboard/context/notes/notesContext";
import { styles } from 'styles';
import { useApi } from "components/hooks/useApi";

interface Props {}

type MainProps 
  = WithStyles<typeof styles>
  & Props;

const MainView: React.FC<MainProps> = props => {

  /* ============================================ PROPS =============================================== */
  
  const { classes } = props;
  const { postOnApi, modifyOnApi } = useApi();
  const { handleSubmit, register, reset, control } = useForm<INotePayload>({
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

  /* ============================================ USESTATE ============================================ */

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [commentField, setCommentField] = React.useState<string>('');
  const [commentList, setCommentList] = React.useState<string[]>(['Mantap', 'OK']);

  /* ============================================ USECONTEXT ========================================== */
  
  const loadingContext = React.useContext(LoadingContext);
  const notesContext = React.useContext(NotesContext);

  const { loading } = loadingContext;
  const { singleNote, loadAllNotes, loadSingleNote } = notesContext;

  /* ============================================ USEEFFECT =========================================== */

  React.useEffect(() => {
    reset({
      title: singleNote?.title,
      note: singleNote?.note,
      dueDate: singleNote?.dueDate,
      todo: singleNote?.todo
    });
  }, [singleNote, reset])
  
  /* ============================================ OTHERS ============================================== */
    
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
  
  const onSubmit = (values: INotePayload) => {
    // HAPUS NANTI
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

    // console.log('payload', payload);
    const next = (res: any) => {
      loadSingleNote(res.data.data);
      loadAllNotes();
    }

    if (singleNote) {
      modifyOnApi(API_ROUTES.NOTES, singleNote?._id, payload, next);
    } else {
      postOnApi(API_ROUTES.NOTES, values, true, next);
    }
    if (tembuss) {
    }
  }

  /* ============================================ VIEW ================================================ */

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
                      {
                        // HAPUS NANTI
                        false &&
                        <CommentPartial
                          value={commentField}
                          handleOnChange={handleOnChange}
                          comment={commentList}
                          handleAddList={handleAddList}
                          handleKeyDown={handleKeyDown}
                          handleDeleteList={handleDeleteList}
                        />
                      }
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

export const Main = withStyles(styles)(MainView)