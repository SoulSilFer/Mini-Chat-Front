import React, { useCallback, useContext, useRef, useState } from 'react';

import { Box, IconButton, Typography } from '@mui/material';
import { Send } from '@mui/icons-material';

import { BaseTextField } from 'components';
import { PagesContext } from 'pages/PagesProvider';
import { SessionStorage } from 'core/infra';
import { ChatMessage } from 'types';

export const ChatLobby: React.FC = () => {
  const { roomState } = useContext(PagesContext);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const s_nickname = new SessionStorage().get('nickname');

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');

  const scrollToBottom = useCallback(() => {
    if (!messagesContainerRef.current) return;

    const scrollHeight = messagesContainerRef.current.scrollHeight;
    messagesContainerRef.current.scrollTo(0, scrollHeight);
  }, []);

  const currentTime = useCallback(() => {
    const currentDate = new Date();
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const timeFormatted = `${hour}:${minutes}`;

    return timeFormatted;
  }, []);

  const handleSendMessage = () => {
    if (inputValue === '') return;

    if (roomState) {
      const messageToAdd: ChatMessage = {
        time: currentTime(),
        message: inputValue,
        nickname: s_nickname
      };

      roomState.onMessage('messages', (messages: ChatMessage[]) => {
        setMessages(messages);
      });

      roomState.send('messages', messageToAdd);
      setInputValue('');

      setTimeout(scrollToBottom, 0);
    }
  };

  roomState &&
    roomState.onMessage('messages', (messages: ChatMessage[]) => {
      setMessages(messages);
    });

  return (
    <Box
      sx={{
        width: '100%',
        padding: '1rem',
        zIndex: 2,
        bgcolor: 'background.paper',

        borderRadius: 3,

        display: 'grid',
        gridTemplateRows: '1fr min-content',
        gap: '0.5rem',
        height: '100%',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          pr: 1
        }}
        ref={messagesContainerRef}
      >
        {messages.map((item, i) => {
          const userEqualSender = item.nickname === s_nickname;

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

                <Box
                  component="span"
                  sx={{
                    fontSize: '0.875rem',
                    marginRight: '0.5rem'
                  }}
                >
                  {item.time}
                </Box>
              </Box>

              <Box
                component="span"
                sx={{
                  fontSize: '0.875rem',
                  marginRight: '0.5rem'
                }}
              >
                {item.message}
              </Box>
            </Box>
          );
        })}
      </Box>

      <Box
        sx={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '1fr min-content',
          gap: '0.5rem',
          width: '100%',
          mr: 3
        }}
      >
        <BaseTextField
          label=""
          placeholder="Nova mensagem..."
          name="message"
          onKeyDown={(event) => {
            event.stopPropagation();
            if (event.key === 'Enter') {
              handleSendMessage();
            }
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <IconButton
          onClick={handleSendMessage}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Send
            sx={{
              minHeight: '1.5rem',
              minWidth: '1.5rem',
              height: '1.5rem',
              width: '1.5rem'
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};
