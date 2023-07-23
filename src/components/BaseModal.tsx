import React from 'react';

import { Modal, Box } from '@mui/material';

type Props = {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  minSize?: {
    width?: string;
    height?: string;
  };
};

export const BaseModal: React.FC<Props> = ({
  children,
  open,
  handleClose,
  minSize
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
    >
      <Box
        sx={{
          maxWidth: '80%',
          maxHeight: '80%',
          backgroundColor: 'background.default',
          borderRadius: '10px',
          padding: '20px',
          '&:focus': {
            outline: 'none',
            border: '0px'
          },
          ...minSize
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};
