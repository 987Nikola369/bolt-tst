import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePostsStore } from '../../store/posts';
import { useAuthStore } from '../../store/auth';
import { Image, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const postSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});

type PostFormData = z.infer<typeof postSchema>;

export const PostForm: React.FC = () => {
  const { user } = useAuthStore();
  const { addPost } = usePostsStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const [media, setMedia] = useState<string[]>([]);

  const onSubmit = async (data: PostFormData) => {
    if (!user) return;
    try {
      addPost(user.id, data.content, media);
      reset();
      setMedia([]);
    } catch (error) {
      console.error('Post creation failed:', error);
    }
  };

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      setMedia([...media, base64String]);
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-200">
          Content
        </label>
        <textarea
          {...register('content')}
          id="content"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
          rows={4}
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={() => document.getElementById('media-upload')?.click()}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <Image size={20} />
        </button>
        <input
          id="media-upload"
          type="file"
          className="hidden"
          onChange={handleMediaUpload}
        />
      </div>

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

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? 'Posting...' : 'Post'}
        <Send size={16} className="ml-2" />
      </motion.button>
    </form>
  );
};
