import React, { createContext, useState } from 'react';

import { Room } from 'colyseus.js';
import { ROUTES } from 'types';

interface ContextProps {
  currentRoute: ROUTES;
  updateCurrentPage: (page: ROUTES) => void;
  roomState: Room | undefined;
  updateRoomState: (room: Room) => void;
}

export const PagesContext = createContext({} as ContextProps);

type Props = {
  children: React.ReactNode;
};

const PagesProvider = ({ children }: Props) => {
  const [currentRoute, setCurrentRoute] = useState<ROUTES>('signin');
  const [roomState, setRoomState] = useState<Room | undefined>(undefined);

  const updateCurrentPage = (page: ROUTES) => {
    setCurrentRoute(page);
  };

  const updateRoomState = (newwRoomState: Room) => {
    setRoomState(newwRoomState);
  };

  return (
    <PagesContext.Provider
      value={{
        currentRoute,
        updateCurrentPage,
        roomState,
        updateRoomState
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};

export default PagesProvider;
