import React from 'react';
import { usePostsStore } from '../store/posts';
import { PostCard } from '../components/post/PostCard';
import { motion } from 'framer-motion';

const AcademyFeed: React.FC = () => {
  const { posts, loading } = usePostsStore();

  // Filter posts to show only those from Super Users & Coaches
  const academyPosts = posts.filter(post => post.userId === '1'); // Assuming '1' is the ID for Super Users & Coaches

  return (
    <motion.section
      className="py-16 bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Academy Feed</h2>
        <p className="text-gray-300 text-center mb-12">Exclusive posts from Super Users & Coaches</p>
        {loading ? (
          <p className="text-center text-gray-400">Loading posts...</p>
        ) : (
          <div className="space-y-8">
            {academyPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default AcademyFeed;
