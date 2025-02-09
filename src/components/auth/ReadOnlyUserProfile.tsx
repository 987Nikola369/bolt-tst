import React from 'react';
import { User } from '../../types';
import { motion } from 'framer-motion';

interface ReadOnlyUserProfileProps {
  user: User;
}

export const ReadOnlyUserProfile: React.FC<ReadOnlyUserProfileProps> = ({ user }) => {
  return (
    <motion.div
      className="bg-gray-900 rounded-lg p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={user.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
          alt={user.username}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-white">{user.username}</p>
          <p className="text-gray-300 text-sm">Joined on {user.joinDate.toLocaleDateString()}</p>
        </div>
      </div>
      <p className="text-gray-300">{user.bio || 'No bio provided'}</p>
    </motion.div>
  );
};
