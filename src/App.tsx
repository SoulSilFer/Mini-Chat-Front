import React, { useContext } from 'react';
import { StyledEngineProvider } from '@mui/material';
import { Theme } from 'components';

import PagesProvider, { PagesContext } from './pages/PagesProvider';

import AuthLayout from 'layouts/auth';
import AppLayout from 'layouts/app';
import { SignInPage } from 'pages/SignIn';
import { LobbyPage } from 'pages/Lobby';
import { ChatPage } from 'pages/Chat';

export const routes = {
  signin: (
    <AuthLayout>
      <SignInPage />
    </AuthLayout>
  ),
  lobby: (
    <AppLayout>
      <LobbyPage />
    </AppLayout>
  ),
  chat: (
    <AppLayout>
      <ChatPage />
    </AppLayout>
  )
};

function App(): React.ReactElement {
  return (
    <StyledEngineProvider>
      <Theme>
        <PagesProvider>
          <InnerApp />
        </PagesProvider>
      </Theme>
    </StyledEngineProvider>
  );
}

function InnerApp(): React.ReactElement {
  const { currentRoute } = useContext(PagesContext);

  return routes[currentRoute];
}

export default App;
