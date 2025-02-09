import React from 'react';
import { usePostsStore } from '../store/posts';
import { PostForm } from '../components/post/PostForm';
import { PostCard } from '../components/post/PostCard';
import { motion } from 'framer-motion';

const CommunityFeed: React.FC = () => {
  const { posts, loading } = usePostsStore();

  return (
    <motion.section
      className="py-16 bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Community Feed</h2>
        <p className="text-gray-300 text-center mb-12">See what the community is talking about</p>
        <div className="max-w-md mx-auto mb-8">
          <PostForm />
        </div>
        {loading ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default CommunityFeed;
