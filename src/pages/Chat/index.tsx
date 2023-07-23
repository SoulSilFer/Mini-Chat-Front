import React, { useContext, useEffect, useState } from 'react';
import { Client, RoomAvailable } from 'colyseus.js';

import { Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import { NicknameHolder, ChatLobby } from 'components';
import { PagesContext } from 'pages/PagesProvider';
import { SessionStorage } from 'core/infra';
import { API_GetRoomUsers, API_GetRoomyId, HandleJoinRoom } from 'utils';
import { User } from 'types';

export const ChatPage: React.FC = () => {
  const { updateCurrentPage, updateRoomState, roomState } =
    useContext(PagesContext);

  const [client, setClient] = useState<Client>();
  const [room, setRoom] = useState<RoomAvailable>();
  const [users, setUsers] = useState<User[]>([]);

  const nickName = new SessionStorage().get('nickname');

  useEffect(() => {
    const client = new Client('ws://localhost:3000');
    setClient(client);
  }, []);

  const handleGetRoom = async () => {
    if (!client) return;
    if (!roomState) {
      updateCurrentPage('lobby');
      return;
    }

    const room = await API_GetRoomyId(roomState.roomId);
    const users = await API_GetRoomUsers(roomState.roomId);

    setRoom(room);
    setUsers(users);
  };

  useEffect(() => {
    handleGetRoom();
  }, [client]);

  const handleGoBack = async () => {
    if (roomState) {
      roomState.leave();

      try {
        const room = await HandleJoinRoom(nickName);

        if (room) {
          updateRoomState(room);
          updateCurrentPage('lobby');
        }
      } catch (error) {
        console.log('Failed to join room:', error);
      }
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        height: '100%',
        position: 'relative',
        overflow: 'auto',
        gap: '4rem',
        maxHeight: '100%',

        display: 'grid',
        gridTemplateColumns: '0.5fr 2.0fr',
        gridTemplateRows: 'minmax(0, 1fr)'
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          ml={1}
          mb={3}
          height="5%"
        >
          <IconButton
            sx={{
              height: '3.75rem',
              width: '3.75rem',
              mr: 3
            }}
            onClick={handleGoBack}
          >
            <ArrowBack
              sx={{
                width: '100%',
                height: '100%'
              }}
            />
          </IconButton>

          <Typography variant="h2">{room?.metadata.roomName}</Typography>
        </Box>

        <NicknameHolder users={users} />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'minmax(0, 1fr) min-content',
          gap: '0.5rem',
          zIndex: 1,
          bgcolor: 'background.paper',
          borderRadius: 3
        }}
      >
        <ChatLobby />
      </Box>
    </Box>
  );
};
