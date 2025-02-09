import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/auth';
import { motion } from 'framer-motion';

const userProfileSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  profilePicture: z.string().optional(),
  coverPhoto: z.string().optional(),
  bio: z.string().optional(),
});

type UserProfileFormData = z.infer<typeof userProfileSchema>;

export const UserProfileForm: React.FC = () => {
  const { user, updateUserProfile } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserProfileFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: user?.username || '',
      profilePicture: user?.profilePicture || '',
      coverPhoto: user?.coverPhoto || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = async (data: UserProfileFormData) => {
    try {
      await updateUserProfile(data);
      reset(data);
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-200">
          Username
        </label>
        <input
          {...register('username')}
          type="text"
          id="username"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-200">
          Profile Picture URL
        </label>
        <input
          {...register('profilePicture')}
          type="text"
          id="profilePicture"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="coverPhoto" className="block text-sm font-medium text-gray-200">
          Cover Photo URL
        </label>
        <input
          {...register('coverPhoto')}
          type="text"
          id="coverPhoto"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-gray-200">
          Bio
        </label>
        <textarea
          {...register('bio')}
          id="bio"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
          rows={4}
        />
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        whileTap={{ scale: 0.95 }}
      >
        {isSubmitting ? 'Updating...' : 'Update Profile'}
      </motion.button>
    </motion.form>
  );
};
