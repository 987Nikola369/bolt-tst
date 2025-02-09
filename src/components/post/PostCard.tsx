import React, { useState } from 'react';
import { Post, Comment } from '../../types';
import { usePostsStore } from '../../store/posts';
import { useAuthStore } from '../../store/auth';
import { useNotificationsStore } from '../../store/notifications';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle } from 'lucide-react';

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useAuthStore();
  const { likePost, addComment } = usePostsStore();
  const { addNotification } = useNotificationsStore();
  const [commentContent, setCommentContent] = useState('');

  const handleLike = () => {
    if (!user) return;
    likePost(post.id, user.id);
    if (post.userId !== user.id) {
      addNotification(post.userId, 'like', post.id);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentContent.trim()) return;
    addComment(post.id, user.id, commentContent);
    setCommentContent('');
    if (post.userId !== user.id) {
      addNotification(post.userId, 'comment', post.id);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Link to={`/profile/${post.userId}`}>
          <img
            src={post.userId === '1' ? 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150' : 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
            alt="User"
            className="h-10 w-10 rounded-full object-cover cursor-pointer hover-effect-scale"
          />
        </Link>
        <div>
          <p className="font-medium text-white">User {post.userId}</p>
          <p className="text-gray-300 text-sm">Posted on {post.createdAt.toLocaleDateString()}</p>
        </div>
      </div>
      <p className="text-white mb-4">{post.content}</p>
      {post.media && post.media.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.media.map((url, index) => (
            <img
              key={index}
              src={url}
              alt="Post media"
              className="h-20 w-20 object-cover rounded-lg"
            />
          ))}
        </div>
      )}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleLike}
          className="text-gray-400 hover:text-[#E41E12] hover-effect"
        >
          <Heart size={20} className="mr-2" />
          {post.likes.includes(user?.id || '') ? 'Unlike' : 'Like'} ({post.likes.length})
        </button>
      </div>
      <div className="space-y-4">
        {post.comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-4 mb-2">
              <Link to={`/profile/${comment.userId}`}>
                <img
                  src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150"
                  alt="User"
                  className="h-8 w-8 rounded-full object-cover cursor-pointer hover-effect-scale"
                />
              </Link>
              <div>
                <p className="font-medium text-white">User {comment.userId}</p>
                <p className="text-gray-300 text-sm">Commented on {comment.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-white">{comment.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-200">
            Add a comment
          </label>
          <input
            type="text"
            id="comment"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
            placeholder="Enter your comment"
          />
        </div>
        <button
          type="submit"
          disabled={!commentContent.trim()}
          className="mt-2 w-full bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors hover-effect disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <MessageCircle size={20} className="mr-2" />
          Comment
        </button>
      </form>
    </div>
  );
};
