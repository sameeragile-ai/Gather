import React from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { Image as ImageIcon, Sparkles, Send } from 'lucide-react';

export const FeedComposerBanner: React.FC = () => {
  const { currentUser, openCreatePost } = useApp();

  return (
    <div className="bg-white border border-[#EAEAEF] rounded-2xl p-4 shadow-xs">
      <div className="flex items-center gap-3">
        <Avatar src={currentUser.avatar} name={currentUser.name} size="md" />
        <button
          onClick={() => openCreatePost()}
          className="flex-1 text-left bg-[#FAFAFC] hover:bg-slate-100/70 border border-[#EAEAEF] rounded-xl px-4 py-2.5 text-xs text-[#74788A] transition-all cursor-pointer"
        >
          Share what you are creating, reading, or thinking...
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-[#EAEAEF]/70 flex items-center justify-between text-xs text-[#74788A]">
        <button
          onClick={() => openCreatePost()}
          className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:text-[#7957E8] hover:bg-[#7957E8]/5 transition-colors"
        >
          <ImageIcon className="w-4 h-4 text-[#7957E8]" />
          <span>Add Photo</span>
        </button>

        <button
          onClick={() => openCreatePost()}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] hover:opacity-90 rounded-lg shadow-xs transition-opacity flex items-center gap-1.5"
        >
          <span>Post</span>
          <Send className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
