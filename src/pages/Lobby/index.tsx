import React, { useContext, useEffect, useState } from 'react';
import { Client, RoomAvailable } from 'colyseus.js';

import { Box, IconButton, Typography } from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';

import { BaseButton, BaseModal, BaseTextField, ChatLobby } from 'components';
import { PagesContext } from 'pages/PagesProvider';
import { SessionStorage } from 'core/infra';
import {
  HandleCreateRoom,
  HandleGetRooms,
  HandleJoinByIdRoom
} from 'utils/handleClientCalls';

export const LobbyPage: React.FC = () => {
  const { updateCurrentPage, updateRoomState } = useContext(PagesContext);

  const [client, setClient] = useState<Client>();
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [newRoom, setNewRoom] = useState<string>('');
  const [realTimeRooms, setRealTimeRooms] = useState<RoomAvailable[]>([]);

  const nickname = new SessionStorage().get('nickname');

  useEffect(() => {
    const client = new Client('ws://localhost:3000');
    setClient(client);

    HandleGetRooms(setRealTimeRooms);
  }, []);

  const handleCreateRoom = async () => {
    if (!client) return;

    const room = await HandleCreateRoom(newRoom, nickname);

    if (!room) {
      setCreateModal(false);
      return;
    }

    setCreateModal(false);
    setNewRoom('');
    updateRoomState(room);
    updateCurrentPage('chat');
  };

  const handleEnterRoom = async (roomId: string) => {
    if (!client) return;

    const room = await HandleJoinByIdRoom(roomId, nickname);

    if (room) {
      updateRoomState(room);
      updateCurrentPage('chat');
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        height: '100vh',
        position: 'relative',
        overflow: 'auto',
        gap: '4rem',

        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
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
        <Typography variant="h2" ml={1} mb={1} height="10%">
          Lobby
        </Typography>

        <ChatLobby />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: 'minmax(0, 1fr) min-content',
          gap: '0.5rem',
          zIndex: 1
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'min-content minmax(0, 1fr)'
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: '1fr min-content',
              padding: '0.25rem 0.5rem',
              marginBottom: '1rem',
              bgcolor: 'background.paper',
              borderRadius: 2,
              pr: 3,
              pl: 3,

              span: {
                fontSize: '1.5rem'
              }
            }}
          >
            <span>Nome da sala</span>
            <span>Usuários</span>
          </Box>

          <Box
            component="ul"
            sx={{
              listStyleType: 'none',
              p: 0,
              overflow: 'auto',
              borderRadius: 2
            }}
          >
            {realTimeRooms.map((item, i) => {
              if (item.metadata.roomName === 'lobby') {
                return null;
              }

              return (
                <Box
                  key={i}
                  component="li"
                  sx={{
                    display: 'grid',
                    gap: '2rem',
                    padding: '0.25rem 0.5rem',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    gridTemplateColumns: '1fr 4rem',
                    pr: 2,
                    pl: 2,

                    '&:hover': {
                      bgcolor: 'action.hover'
                    },

                    span: {
                      '&:last-child': {
                        textAlign: 'right'
                      }
                    },

                    '&:last-child': {
                      marginBottom: 0
                    },

                    '&:active': {
                      filter: 'brightness(1.2)'
                    }
                  }}
                  onClick={() => handleEnterRoom(item.roomId)}
                >
                  <Box component="span">{item.metadata.roomName}</Box>

                  <Box component="span">{item.clients}</Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '1fr min-content',
            gap: '2rem'
          }}
        >
          <BaseButton
            title="Criar sala"
            endIcon={<Add />}
            onClick={() => setCreateModal(true)}
          />

          <IconButton onClick={() => HandleGetRooms(setRealTimeRooms)}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <BaseModal open={createModal} handleClose={() => setCreateModal(false)}>
        <Box display="flex" flexDirection="column">
          <BaseTextField
            label="Nome da sala"
            name="roomName"
            value={newRoom}
            onChange={(e) => setNewRoom(e.currentTarget.value)}
          />

          <BaseButton
            title="Confirmar"
            sx={{ mt: 3 }}
            onClick={handleCreateRoom}
          />
        </Box>
      </BaseModal>
    </Box>
  );
};
