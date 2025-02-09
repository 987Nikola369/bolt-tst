import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Notification } from '../types';

interface NotificationsState {
  notifications: Notification[];
  addNotification: (
    userId: string,
    type: 'like' | 'comment' | 'message',
    referenceId: string
  ) => void;
  markAsRead: (notificationId: string) => void;
  getUserNotifications: (userId: string) => Notification[];
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  notifications: [],
  addNotification: (userId, type, referenceId) => {
    const newNotification: Notification = {
      id: uuidv4(),
      userId,
      type,
      referenceId,
      read: false,
      createdAt: new Date(),
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },
  markAsRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId ? { ...notification, read: true } : notification
      ),
    }));
  },
  getUserNotifications: (userId) => {
    return get().notifications.filter((notification) => notification.userId === userId);
  },
}));
