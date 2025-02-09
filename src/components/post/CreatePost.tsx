import React, { useState } from 'react';
import { Image, Send } from 'lucide-react';
import { useAuthStore } from '../../store/auth';
import { usePostsStore } from '../../store/posts';
import { motion } from 'framer-motion';

export const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const { user } = useAuthStore();
  const { addPost } = usePostsStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim()) return;

    addPost(user.id, content, media);
    setContent('');
    setMedia([]);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-[#231F20]/80 backdrop-blur-sm rounded-lg p-4 mb-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="flex space-x-4">
        <img
          src={user?.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
          alt={user?.username}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none"
            rows={3}
          />

          {media.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {media.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Upload preview"
                  className="h-20 w-20 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              className="text-gray-400 hover:text-[#E41E12] transition-colors"
              onClick={() => {
                // Handle image upload
              }}
            >
              <Image size={20} />
            </button>

            <button
              type="submit"
              disabled={!content.trim()}
              className="bg-[#E41E12] text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Post</span>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.form>
  );
};
