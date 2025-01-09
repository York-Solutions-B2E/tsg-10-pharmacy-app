import { useState } from 'react';
import Modal from '../components/Modal';
import Button from '@mui/material/Button';

export const useErrorModal = () => {
  const [modalContent, setModalContent] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  /**
   * @Param {Object} error: {ok: {Boolean}, status: {Integer}, body: {Object}}
   * @Optional
   * @Param {Object} resolution: {name: {String}, action: {Function}}
   * */
  const handleHttpError = (error, resolution) => {
    console.log(error);
    const content = {
      type: 'http error',
      status: error.status,
      title: error.body.error,
      body: error.body.message,
      details: error.body?.details,
    };

    setModalContent(content);
    setModalOpen(true);
    if (resolution)
      setModalAction(
        <Button
          onClick={() => {
            resolution.action();
            setModalOpen(false);
          }}
        >
          {resolution.name}
        </Button>
      );
  };

  const modal = (
    <Modal
      open={modalOpen}
      close={() => setModalOpen(false)}
      content={modalContent}
      action={modalAction}
    />
  );

  return { modal, handleHttpError };
};
