import { createStyles, Theme } from "@material-ui/core";

const styles = (theme: Theme) =>createStyles({
  'mainContainer': {
    maxWidth: '80vw',
    maxHeight: '85vh',
    margin: '0',
    padding: '0',
    overflow: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px 50px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

    // For initial, delete later
    backgroundColor: '#cfe8fc',
    height: '85vh'
  }
})

export default styles;