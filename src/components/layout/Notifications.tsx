import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { useNotificationsStore } from '../../store/notifications';
import { Bell, MessageCircle, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Notifications: React.FC = () => {
  const { user } = useAuthStore();
  const { notifications, getUserNotifications, markAsRead } = useNotificationsStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      // In a real app, you'd fetch notifications on component mount and potentially use websockets for real-time updates.
    }
  }, [user]);

    const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  const getNotificationIcon = (type: 'like' | 'comment' | 'message') => {
    switch (type) {
      case 'like':
        return <Heart size={16} />;
      case 'comment':
        return <MessageCircle size={16} />;
      case 'message':
        return <Bell size={16} />;
      default:
        return null;
    }
  };

  const getNotificationMessage = (notification: Notification) => {
      switch (notification.type) {
        case 'like':
          return `Someone liked your post.`;
        case 'comment':
          return `Someone commented on your post.`;
        case 'message':
          return `You have a new message.`;
        default:
          return '';
      }
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="text-gray-400 hover:text-white transition-colors relative"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#E41E12] text-white text-xs rounded-full px-1.5">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <motion.div
          className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {notifications.length === 0 ? (
              <p className="px-4 py-2 text-sm text-gray-400">No notifications</p>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-center px-4 py-2 text-sm ${
                    notification.read ? 'text-gray-400' : 'text-white font-medium'
                  } hover:bg-gray-800 cursor-pointer`}
                  role="menuitem"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  {getNotificationIcon(notification.type)}
                  <span className="ml-2">{getNotificationMessage(notification)}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};
