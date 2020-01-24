import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { Cookies } from 'middleware'
import { LOCALNAME } from 'utils/Constant'

export const Home: React.FC<any> = props => {
  console.log('props', props)

  const onLogout = () => {
    Cookies.delete(LOCALNAME.TOKEN)
    props.history.push('/login');
  }

  return (
    <React.Fragment>
      <Typography variant="h1">
        Welcome home
      </Typography>
      <Button
        color="primary"
        size="large"
        variant="contained"
        onClick={onLogout}
      >
        Logout
      </Button>
    </React.Fragment>
  )
}
