import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

// interface ConfirmActionModalProps {
//   color: "primary" | "secondary" | "error" | "success";
//   message: string;
//   open: boolean;
//   onDismiss: () => void;
//   onConfirmAction: () => void;
//   confirmButtonText: string;
// }

export default function ConfirmActionModal(props) {
  const {
    color = 'primary',
    message,
    title,
    open,
    onDismiss,
    onConfirmAction,
    confirmButtonText = 'click me',
  } = props;

  return (
    <>
      <Dialog open={open} onClose={onDismiss}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <Typography sx={{ padding: '16px 24px' }}>{message}</Typography>
        <DialogActions>
          <Button onClick={onDismiss}>Cancel</Button>
          <Button
            variant="contained"
            color={color}
            onClick={onConfirmAction}
            autoFocus
          >
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
