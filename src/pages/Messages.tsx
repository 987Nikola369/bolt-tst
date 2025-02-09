import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { useMessagesStore } from '../store/messages';
import { Send, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const Messages: React.FC = () => {
  const { user } = useAuthStore();
  const { chatRooms, addMessage, addChatRoom, getUserChatRooms } = useMessagesStore();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [messageContent, setMessageContent] = useState('');
  const [media, setMedia] = useState<string[]>([]);
  const [userRooms, setUserRooms] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setUserRooms(getUserChatRooms(user.id));
    }
  }, [user, chatRooms]);

  const selectedRoom = selectedRoomId ? chatRooms.find((room) => room.id === selectedRoomId) : null;

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoomId(roomId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedRoomId || (!messageContent.trim() && media.length === 0)) return;
    addMessage(selectedRoomId, user.id, messageContent, media);
    setMessageContent('');
    setMedia([]);
  };

  const handleCreateRoom = () => {
    if (!user) return;
    const newRoomId = uuidv4();
    // For simplicity, creating a room with a default participant (user 2).
    // In a real app, you'd have a user selection mechanism.
    addChatRoom(newRoomId, [user.id, '2']);
    setSelectedRoomId(newRoomId);
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
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Messages</h2>
        <p className="text-gray-300 text-center mb-12">Direct chat system</p>
        <div className="flex space-x-8">
          <div className="w-1/4 bg-gray-900 rounded-lg p-4">
            <h3 className="text-xl font-bold mb-4">Chat Rooms</h3>
            <button
              onClick={handleCreateRoom}
              className="w-full bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors mb-4"
            >
              Create New Room
            </button>
            <div className="space-y-2">
              {userRooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => handleRoomSelect(room.id)}
                  className={`w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors ${
                    selectedRoomId === room.id ? 'bg-gray-700' : ''
                  }`}
                >
                  Room {room.id}
                </button>
              ))}
            </div>
          </div>
          <div className="w-3/4 bg-gray-900 rounded-lg p-4">
            {selectedRoom ? (
              <>
                <h3 className="text-xl font-bold mb-4">Room {selectedRoom.id}</h3>
                <div className="space-y-4 mb-8 overflow-y-auto max-h-[300px]">
                  {selectedRoom.messages?.map((message) => (
                    <div key={message.id} className="bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center space-x-4 mb-2">
                        <Link to={`/profile/${message.senderId}`}>
                        <img
                          src="https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=150"
                          alt="User"
                          className="h-8 w-8 rounded-full object-cover cursor-pointer"
                        />
                        </Link>
                        <div>
                          <p className="font-medium text-white">User {message.senderId}</p>
                          <p className="text-gray-300 text-sm">Sent on {message.createdAt.toLocaleDateString()}</p>
                        </div>
                      </div>
                      <p className="text-white">{message.content}</p>
                      {message.media && message.media.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.media.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt="Message media"
                              className="h-20 w-20 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="mt-4 flex items-center space-x-4">
                  <div className="flex-1">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-200">
                      Send a message
                    </label>
                    <input
                      type="text"
                      id="message"
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white shadow-sm focus:border-[#E41E12] focus:ring focus:ring-[#E41E12] focus:ring-opacity-50"
                      placeholder="Enter your message"
                    />
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
                  <button
                    type="submit"
                    disabled={!messageContent.trim() && media.length === 0}
                    className="bg-[#E41E12] text-white py-2 px-4 rounded-md hover:bg-[#E41E12]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    <Send size={16} className='mr-2'/> Send
                  </button>
                </form>
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
              </>
            ) : (
              <p className="text-center text-gray-300">Select a chat room to start messaging</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Messages;
