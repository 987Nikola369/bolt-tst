import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../../store/auth';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm: React.FC = () => {
  const { register, login } = useAuthStore();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data.username, data.email, data.password);
      await login(data.email, data.password);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-200">
          Username
        </label>
        <input
          {...formRegister('username')}
          type="text"
          id="username"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
          placeholder="Enter your username"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email
        </label>
        <input
          {...formRegister('email')}
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password
        </label>
        <input
          {...formRegister('password')}
          type="password"
          id="password"
          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white px-3 py-2 focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};
