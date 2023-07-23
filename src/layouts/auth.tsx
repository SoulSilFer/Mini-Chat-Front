import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box, CssBaseline } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <Box height="100vh">
      <CssBaseline />
      <Outlet />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '100%'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
