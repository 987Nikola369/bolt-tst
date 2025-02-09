import React from 'react';
import { Bell, Home, MessageCircle, Users, LogOut, User, Rocket } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Notifications } from './Notifications';
import { motion } from 'framer-motion';

export const TopNavigation: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 h-16 bg-[#231F20]/95 backdrop-blur-sm border-b border-gray-800 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Rocket className="h-8 w-8 text-[#E41E12]" />
        </div>

        <div className="flex items-center space-x-4">
          <Notifications />

          <div className="flex items-center space-x-2">
            <Link to={`/profile/${user.id}`}>
              <img
                src={user.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
                alt={user.username}
                className="h-8 w-8 rounded-full object-cover cursor-pointer hover-effect-scale"
              />
            </Link>
            <button
              onClick={logout}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export const BottomNavigation: React.FC = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 h-16 bg-[#231F20]/95 backdrop-blur-sm border-t border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="grid grid-cols-4 h-full">
        <Link to="/home" className="flex flex-col items-center justify-center text-gray-400 hover:text-[#E41E12] transition-colors hover-effect">
          <Home size={24} />
        </Link>

        <Link to="/academy" className="flex flex-col items-center justify-center text-gray-400 hover:text-[#E41E12] transition-colors hover-effect">
          <Users size={24} />
        </Link>

        <Link to="/directory" className="flex flex-col items-center justify-center text-gray-400 hover:text-[#E41E12] transition-colors hover-effect">
          <Users size={24} />
        </Link>

        <Link to="/messages" className="flex flex-col items-center justify-center text-gray-400 hover:text-[#E41E12] transition-colors hover-effect">
          <MessageCircle size={24} />
        </Link>
      </div>
    </motion.nav>
  );
};
