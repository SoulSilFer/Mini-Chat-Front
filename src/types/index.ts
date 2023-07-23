export type ROUTES = 'signin' | 'lobby' | 'chat';

export interface Message {
  nickname: string;
  message: string;
}

export interface ChatMessage {
  nickname: string;
  time: string;
  message: string;
}

export interface User {
  sessionId: string;
  nickname: string;
}
