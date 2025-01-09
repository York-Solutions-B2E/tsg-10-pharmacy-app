import React from 'react';
import ButtonWithText from './buttons/ButtonWithText';
import { Box, DialogActions, DialogContent } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

// Try to set the app element for accessibility, catch and ignore any exceptions
try {
  Modal.setAppElement('#root');
} catch (error) {
  console.warn('Failed to set app element for react-modal:', error);
}

const CustomModal = ({
  isOpen,
  onRequestClose,
  onRequestConfirm,
  contentLabel,
  children,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      title={contentLabel}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <DialogContent>
        <DialogTitle>{contentLabel}</DialogTitle>
        {children}
      </DialogContent>

      <DialogActions>
        <ButtonWithText
          buttonText="Close"
          onClick={onRequestClose}
          variant="secondary"
        />
        <ButtonWithText
          variant="outlined"
          buttonText="Confirm"
          onClick={onRequestConfirm}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomModal;
