import React from 'react';

import { Box, Typography } from '@mui/material';

import { SessionStorage } from 'core/infra';
import { User } from 'types';

type Props = {
  users: User[];
};

export const NicknameHolder: React.FC<Props> = ({ users }) => {
  const nickname = new SessionStorage().get('nickname');

  return (
    <Box
      sx={{
        width: '100%',
        padding: '1rem',
        zIndex: 2,
        bgcolor: 'background.paper',

        borderRadius: 3,

        display: 'grid',
        height: '92%'
      }}
    >
      <Box
        sx={{
          overflow: 'auto'
        }}
      >
        {users.map((item, i) => {
          const userEqualSender = item.nickname === nickname;

          return (
            <Box
              sx={{
                marginBottom: '0.5rem',
                bgcolor: 'background.default',
                borderRadius: 3,
                p: 1
              }}
              key={i}
            >
              <Box sx={{ display: 'flex' }}>
                <Typography
                  sx={{
                    fontSize: '1.125rem',
                    flex: 1,
                    color: userEqualSender ? 'primary.main' : 'default'
                  }}
                >
                  {item.nickname}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
