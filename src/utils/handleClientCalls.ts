import { Client, RoomAvailable } from 'colyseus.js';

const client = new Client('ws://localhost:3000');

export const HandleGetRooms = async (
  setRealTimeRooms: (value: React.SetStateAction<RoomAvailable<any>[]>) => void
) => {
  const rooms = await client.getAvailableRooms();
  return setRealTimeRooms(rooms);
};

export const HandleJoinRoom = async (nickname: string, roomName?: string) => {
  try {
    return await client.join('my_room', {
      nickname: nickname,
      roomName: roomName && roomName
    });
  } catch (error) {
    return false;
  }
};

export const HandleCreateRoom = async (roomName: string, nickname: string) => {
  try {
    return await client.create('my_room', {
      roomName: roomName,
      nickname: nickname
    });
  } catch (error) {
    return false;
  }
};

export const HandleJoinByIdRoom = async (roomId: string, nickname: string) => {
  try {
    return await client.joinById(roomId, {
      nickname
    });
  } catch (error) {
    return false;
  }
};
