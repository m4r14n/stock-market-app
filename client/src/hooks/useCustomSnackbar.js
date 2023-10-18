import { useState } from 'react';

export default function useCustomSnackbar() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  // Severity can be 'success', 'info', 'warning', or 'error'
  const [severity, setSeverity] = useState('success');

  const handleOpen = ({ message, severity }) => {
    setOpen(true);
    setMessage(message);
    setSeverity(severity);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return {
    open,
    handleOpen,
    handleClose,
    message,
    severity
  };
}
