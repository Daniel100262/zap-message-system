import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import './styles.css';
import { useHistory } from "react-router-dom";





const ButtonAppBar = () => {

  const history = useHistory();

  const handleClickMessage = () => {
    history.push("/messages")
  }

  const handleClickDashboard = () => {
    history.push("/dashboard")
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="AppBar" position="static">
        <Toolbar>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
            ZAP System
          </Typography>
          <Button onClick={handleClickDashboard} color="inherit">Dashboard</Button>
          <Button onClick={handleClickMessage} color="inherit">Mensagem</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default ButtonAppBar