import React from 'react';
import Modal from 'react-modal';
import ButtonWithText from './buttons/ButtonWithText';
import { Box } from '@mui/material';

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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={contentLabel}
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
      {children}

      <Box display="flex" justifyContent="flex-end" marginTop={2}>
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
      </Box>
    </Modal>
  );
};

export default CustomModal;
