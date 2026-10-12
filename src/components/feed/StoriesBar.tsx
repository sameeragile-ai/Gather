import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Plus } from 'lucide-react';

interface StoriesBarProps {
  onSelectUser: (username: string) => void;
  onSelectCommunity: (commId: string) => void;
}

export const StoriesBar: React.FC<StoriesBarProps> = ({ onSelectUser, onSelectCommunity }) => {
  const { currentUser, users, communities, openCreatePost } = useApp();

  return (
    <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs">
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
        {/* Your Story / Create trigger */}
        <button
          onClick={() => openCreatePost()}
          className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
          aria-label="Add to your story or create post"
        >
          <div className="relative w-14 h-14 rounded-full p-0.5 border border-dashed border-[#7957E8] flex items-center justify-center transition-transform group-hover:scale-105">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="md" className="w-12 h-12" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#7957E8] text-white rounded-full flex items-center justify-center shadow-xs">
              <Plus className="w-3 h-3 stroke-[3]" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-[#20212A] truncate max-w-[64px]">Your story</span>
        </button>

        {/* Communities highlights */}
        {communities.slice(0, 3).map(comm => (
          <button
            key={comm.id}
            onClick={() => onSelectCommunity(comm.id)}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            aria-label={`View highlight for ${comm.name}`}
          >
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#7957E8] to-[#5B8DEF] flex items-center justify-center transition-transform group-hover:scale-105">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-lg">
                <span>{comm.avatar}</span>
              </div>
            </div>
            <span className="text-[11px] font-medium text-[#74788A] group-hover:text-[#20212A] truncate max-w-[64px]">
              {comm.name}
            </span>
          </button>
        ))}

        {/* Other Users highlights */}
        {users.filter(u => u.id !== currentUser.id).slice(0, 4).map(user => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.username)}
            className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
            aria-label={`View story of ${user.name}`}
          >
            <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-tr from-[#7957E8] via-[#5B8DEF] to-purple-400 flex items-center justify-center transition-transform group-hover:scale-105">
              <Avatar src={user.avatar} name={user.name} size="md" className="w-12 h-12 ring-2 ring-white" />
            </div>
            <span className="text-[11px] font-medium text-[#74788A] group-hover:text-[#20212A] truncate max-w-[64px]">
              {user.name.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
