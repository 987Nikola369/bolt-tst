import React from 'react';
import { useAuthStore } from '../store/auth';
import { Link } from 'react-router-dom';

const UserDirectory: React.FC = () => {
  const { users } = useAuthStore();

  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">User Directory</h2>
        <p className="text-gray-300 text-center mb-12">A complete list of members</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <div key={user.id} className="bg-gray-900 rounded-lg p-6 hover-effect">
              <div className="flex items-center space-x-4 mb-4">
                <Link to={`/profile/${user.id}`}>
                <img
                  src={user.profilePicture || 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150'}
                  alt={user.username}
                  className="h-16 w-16 rounded-full object-cover cursor-pointer hover-effect-scale"
                />
                </Link>
                <div>
                  <p className="font-medium text-white">{user.username}</p>
                  <p className="text-gray-300 text-sm">Joined on {user.joinDate.toLocaleDateString()}</p>
                </div>
              </div>
              <p className="text-gray-300">{user.bio || 'No bio provided'}</p>
              <Link to={`/profile/${user.id}`}>
                <button className="mt-4 w-full bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors hover-effect">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserDirectory;
