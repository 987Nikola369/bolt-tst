import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { UserProfileForm } from '../components/auth/UserProfileForm';
import { useAuthStore } from '../store/auth';
import { motion } from 'framer-motion';
import { usePostsStore } from '../store/posts';
import { PostCard } from '../components/post/PostCard';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, users } = useAuthStore();
  const { posts } = usePostsStore();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (user.id !== userId) {
    return <div>Error: You cannot access this profile.</div>;
  }

  const currentUser = users.find(u => u.id === userId);
  const userPosts = posts.filter(post => post.userId === userId);

  return (
    <motion.section
      className="py-16 bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <div className="relative">
          <img
            src={currentUser?.coverPhoto || 'https://images.unsplash.com/photo-1601785825567-7c2999969950?w=1920'}
            alt="Cover Photo"
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
          <div className="absolute bottom-0 left-0 ml-8 -mb-16">
            <img
              src={currentUser?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
              alt={currentUser?.username}
              className="h-32 w-32 rounded-full object-cover border-4 border-gray-800"
            />
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-2">{currentUser?.username}</h2>
          <p className="text-gray-300 mb-2">Joined on {currentUser?.joinDate.toLocaleDateString()}</p>
          <p className="text-white">{currentUser?.bio || 'No bio provided'}</p>
        </div>

        <div className="mt-8 space-y-8">
          {userPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default UserProfile;
