import React, { useContext, useState, useEffect } from 'react';
import { Client } from 'colyseus.js';

import { Box } from '@mui/material';

import { BaseButton, BaseTextField } from 'components';
import { PagesContext } from 'pages/PagesProvider';
import {
  HandleBaseInputChange,
  API_ValidatNickname,
  HandleJoinRoom
} from 'utils';
import { SessionStorage } from 'core/infra';

export const SignInPage: React.FC = () => {
  const { updateCurrentPage, updateRoomState } = useContext(PagesContext);
  const session_storage = new SessionStorage();

  const [value, setValue] = useState<{ nickname: string }>({ nickname: '' });
  const [client, setClient] = useState<Client>();
  const [nicknameError, setNicknameError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const client = new Client('https://chat-mini-backend.firebaseapp.com');
    setClient(client);
  }, []);

  const handleCheckNickname = async () => {
    if (!client) return;

    setLoading(true);
    setNicknameError('');

    const nicknameInUse = await API_ValidatNickname(value.nickname);

    if (await nicknameInUse) {
      setNicknameError(
        'Esse nome de usuário já está sendo utilizado. Por favor, escolha outro.'
      );
      setLoading(false);
    } else {
      setNicknameError('');

      try {
        const room = await HandleJoinRoom(value.nickname);

        if (room) {
          session_storage.set('nickname', value.nickname);
          updateRoomState(room);
          updateCurrentPage('lobby');
        }
      } catch (error) {
        setNicknameError('Erro ao conectar ao servidor.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      alignItems="center"
      display="flex"
      justifyContent="center"
      alignContent="center"
      flexDirection="column"
      width="50%"
    >
      <Box
        component="img"
        src="static/hbanner.png"
        width="100%"
        borderRadius={3}
        mb={6}
      />

      <BaseTextField
        label="Nome do usuário"
        name="nickname"
        value={value.nickname}
        handleChange={(e) => HandleBaseInputChange(e, value, setValue)}
        error={Boolean(nicknameError)}
        helperText={nicknameError}
        fullWidth
      />

      <BaseButton
        title="Entrar"
        sx={{ mt: 5 }}
        onClick={handleCheckNickname}
        disabled={loading || value.nickname === ''}
        loading={loading}
        fullWidth
      />
    </Box>
  );
};
