import React from 'react';
import { Alert, Snackbar } from '@mui/material';


export default function CustomSnackbar({
  severity,
  message,
  open,
  handleClose,
  autoHideDuration,
  sx,
}) {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={sx}>
        {message}
      </Alert>
    </Snackbar>
  );
}
