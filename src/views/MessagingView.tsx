import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { 
  Send, Search, ArrowLeft, MessageSquare, 
  Check, CheckCheck, Sparkles 
} from 'lucide-react';

interface MessagingViewProps {
  onNavigateUser: (username: string) => void;
}

export const MessagingView: React.FC<MessagingViewProps> = ({ onNavigateUser }) => {
  const { 
    currentUser, conversations, messages, activeConversationId, 
    setActiveConversationId, sendMessage 
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set default active conversation if none selected
  useEffect(() => {
    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId, setActiveConversationId]);

  // Scroll to bottom when message list changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeConversationId]);

  const activeConv = conversations.find(c => c.id === activeConversationId);
  const currentMessages = activeConversationId ? (messages[activeConversationId] || []) : [];

  const filteredConversations = conversations.filter(c =>
    c.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.participant.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversationId) return;

    sendMessage(activeConversationId, inputText);
    setInputText('');
  };

  return (
    <div className="bg-white border border-[#EAEAEF] rounded-2xl shadow-xs overflow-hidden h-[calc(100vh-6rem)] flex flex-col md:flex-row">
      {/* Left Pane: Conversation List */}
      <div className={`w-full md:w-80 border-r border-[#EAEAEF] flex flex-col h-full bg-[#FAFAFC]/50 ${
        activeConversationId ? 'hidden md:flex' : 'flex'
      }`}>
        {/* Search header */}
        <div className="p-3.5 border-b border-[#EAEAEF] space-y-2.5">
          <h2 className="text-sm font-bold text-[#20212A]">Direct Messages</h2>
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#74788A] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search conversations..."
              className="w-full bg-white border border-[#EAEAEF] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#20212A] placeholder:text-[#74788A] focus:outline-none focus:border-[#7957E8]"
            />
          </div>
        </div>

        {/* Conversation list items */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#EAEAEF]/60">
          {filteredConversations.length > 0 ? (
            filteredConversations.map(conv => {
              const isActive = conv.id === activeConversationId;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full p-3.5 flex items-start gap-3 text-left transition-colors ${
                    isActive 
                      ? 'bg-white shadow-2xs border-l-2 border-[#7957E8]' 
                      : 'hover:bg-white/80'
                  }`}
                >
                  <Avatar src={conv.participant.avatar} name={conv.participant.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-[#20212A] truncate">
                        {conv.participant.name}
                      </p>
                      <span className="text-[10px] text-[#74788A]">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-xs text-[#74788A] truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#7957E8] shrink-0 mt-2" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-[#74788A]">
              No conversations found.
            </div>
          )}
        </div>
      </div>

      {/* Right Pane: Active Chat Area */}
      <div className={`flex-1 flex flex-col h-full bg-white ${
        !activeConversationId ? 'hidden md:flex' : 'flex'
      }`}>
        {activeConv ? (
          <>
            {/* Chat header */}
            <div className="p-3.5 border-b border-[#EAEAEF] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversationId(null)}
                  className="md:hidden p-1.5 text-[#74788A] hover:text-[#20212A] rounded-lg"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigateUser(activeConv.participant.username)}
                  className="flex items-center gap-2.5 text-left group"
                >
                  <Avatar src={activeConv.participant.avatar} name={activeConv.participant.name} size="sm" />
                  <div>
                    <h3 className="text-xs font-bold text-[#20212A] group-hover:text-[#7957E8]">
                      {activeConv.participant.name}
                    </h3>
                    <p className="text-[10px] text-[#74788A]">
                      @{activeConv.participant.username} · Online
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Message Bubble History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAFAFC]/30">
              {currentMessages.length > 0 ? (
                currentMessages.map(msg => {
                  const isMine = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                          isMine
                            ? 'bg-[#7957E8] text-white rounded-br-xs'
                            : 'bg-white border border-[#EAEAEF] text-[#20212A] rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-[#74788A] mt-1 px-1">
                        {msg.createdAt}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#7957E8]/10 text-[#7957E8] flex items-center justify-center text-lg">
                    👋
                  </div>
                  <p className="text-xs font-semibold text-[#20212A]">Start the conversation</p>
                  <p className="text-[11px] text-[#74788A] max-w-xs">
                    Send a note to {activeConv.participant.name}. All messages are stored in your session.
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#EAEAEF] flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder={`Message @${activeConv.participant.username}...`}
                className="flex-1 bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-4 py-2.5 text-xs text-[#20212A] placeholder:text-[#74788A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2.5 bg-[#7957E8] text-white rounded-xl hover:bg-[#6846D4] disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
            <MessageSquare className="w-10 h-10 text-[#74788A]/40" />
            <h3 className="text-sm font-bold text-[#20212A]">Your Inbox</h3>
            <p className="text-xs text-[#74788A] max-w-xs">
              Select a chat on the left or open a user’s profile to send them a private message.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
