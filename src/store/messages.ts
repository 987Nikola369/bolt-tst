import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Message, ChatRoom } from '../types';

interface MessagesState {
  chatRooms: ChatRoom[];
  addChatRoom: (id: string, participants: string[]) => void;
  addMessage: (roomId: string, senderId: string, content: string, media?: string[]) => void;
  getChatRoom: (roomId: string) => ChatRoom | undefined;
  getUserChatRooms: (userId: string) => ChatRoom[];
}

export const useMessagesStore = create<MessagesState>((set, get) => ({
  chatRooms: [],
  addChatRoom: (id, participants) => {
    set((state) => ({
      chatRooms: [...state.chatRooms, { id, participants, messages: [], lastMessage: null, createdAt: new Date() }],
    }));
  },
  addMessage: (roomId, senderId, content, media) => {
    const newMessage: Message = {
      id: uuidv4(),
      senderId,
      content,
      media,
      createdAt: new Date(),
      read: false,
    };
    set((state) => ({
      chatRooms: state.chatRooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            messages: [...(room.messages || []), newMessage],
            lastMessage: newMessage,
          };
        }
        return room;
      }),
    }));
  },
  getChatRoom: (roomId) => {
    return get().chatRooms.find((room) => room.id === roomId);
  },
  getUserChatRooms: (userId) => {
    return get().chatRooms.filter((room) => room.participants.includes(userId));
  }
}));
