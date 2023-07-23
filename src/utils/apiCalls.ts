import api from 'core/api/index';

export const API_ValidatNickname = async (nickname: string) => {
  try {
    const res = await api.get(`/check-nickname/${nickname}`);

    const nicknameInUse = await res.data.nicknameInUse;

    return nicknameInUse;
  } catch (error) {
    return false;
  }
};

export const API_GetRoomyId = async (roomId: string) => {
  try {
    const res = await api.get(`http://localhost:3000/room/${roomId}`);

    const room = await res.data;

    return room;
  } catch (error) {
    return false;
  }
};

export const API_GetRoomUsers = async (roomId: string) => {
  try {
    const res = await api.get(`http://localhost:3000/room/${roomId}/users`);

    const users = await res.data;

    return users;
  } catch (error) {
    return false;
  }
};
