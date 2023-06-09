import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function CustomizedSnackbars({
  open = true,
  autohide = 6000,
  severity = 'success',
  message = 'demo alerta',
  onClose = (e, r) => console.log('close')
}) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (event, reason) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  return (
    <Snackbar open={open} autoHideDuration={autohide} onClose={onClose} anchorOrigin={{ vertical:'bottom', horizontal:'right' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomizedSnackbars;