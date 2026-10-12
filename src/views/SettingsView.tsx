import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { EditProfileModal } from './EditProfileModal';
import { 
  Shield, Bell, Lock, Eye, UserX, VolumeX, 
  RotateCcw, Check, Sparkles, UserCheck 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { 
    currentUser, users, settings, updateSettings, 
    unmuteUser, unblockUser, resetAllDemoData 
  } = useApp();

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const mutedUsers = users.filter(u => settings.mutedUserIds.includes(u.id));
  const blockedUsers = users.filter(u => settings.blockedUserIds.includes(u.id));

  return (
    <div className="space-y-5 pb-12">
      {/* Title */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-extrabold text-[#20212A]">Account & Privacy Settings</h1>
          <p className="text-xs text-[#74788A] mt-0.5">
            Manage your visibility, safety preferences, and personal notifications.
          </p>
        </div>
        <button
          onClick={() => setIsEditProfileOpen(true)}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#7957E8] text-white hover:bg-[#6846D4] transition-colors shadow-2xs"
        >
          Edit Profile
        </button>
      </div>

      {/* Privacy Settings Card */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#7957E8]" />
          <h2 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Privacy & Permissions
          </h2>
        </div>

        {/* Private Account Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[#EAEAEF]/70">
          <div>
            <p className="text-xs font-semibold text-[#20212A]">Private Account</p>
            <p className="text-[11px] text-[#74788A]">
              Only approved followers will be able to see your posts and photos.
            </p>
          </div>
          <button
            onClick={() => updateSettings({ isPrivate: !settings.isPrivate })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.isPrivate ? 'bg-[#7957E8]' : 'bg-slate-200'
            }`}
            aria-label="Toggle private account"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.isPrivate ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Allow Direct Messages Select */}
        <div className="flex items-center justify-between py-2 border-b border-[#EAEAEF]/70">
          <div>
            <p className="text-xs font-semibold text-[#20212A]">Direct Message Requests</p>
            <p className="text-[11px] text-[#74788A]">
              Choose who can initiate private message threads with you.
            </p>
          </div>
          <select
            value={settings.allowDirectMessages}
            onChange={e => updateSettings({ allowDirectMessages: e.target.value as any })}
            className="bg-[#FAFAFC] border border-[#EAEAEF] text-xs font-medium text-[#20212A] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#7957E8]"
          >
            <option value="everyone">Everyone</option>
            <option value="following">People I Follow</option>
            <option value="nobody">Nobody</option>
          </select>
        </div>

        {/* Activity Status */}
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-semibold text-[#20212A]">Show Online Status</p>
            <p className="text-[11px] text-[#74788A]">
              Allow people you message to see when you are actively using Gather.
            </p>
          </div>
          <button
            onClick={() => updateSettings({ showActivityStatus: !settings.showActivityStatus })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.showActivityStatus ? 'bg-[#7957E8]' : 'bg-slate-200'
            }`}
            aria-label="Toggle activity status"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.showActivityStatus ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Notifications Preferences */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-[#5B8DEF]" />
          <h2 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Notification Preferences
          </h2>
        </div>

        <div className="flex items-center justify-between py-2 border-b border-[#EAEAEF]/70">
          <div>
            <p className="text-xs font-semibold text-[#20212A]">Browser Push Notifications</p>
            <p className="text-[11px] text-[#74788A]">
              Receive alerts for direct mentions and comment replies in real-time.
            </p>
          </div>
          <button
            onClick={() => updateSettings({ pushNotifications: !settings.pushNotifications })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.pushNotifications ? 'bg-[#7957E8]' : 'bg-slate-200'
            }`}
            aria-label="Toggle push notifications"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.pushNotifications ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-semibold text-[#20212A]">Weekly Digest Email</p>
            <p className="text-[11px] text-[#74788A]">
              Summary of popular discussions in your joined communities.
            </p>
          </div>
          <button
            onClick={() => updateSettings({ emailNotifications: !settings.emailNotifications })}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              settings.emailNotifications ? 'bg-[#7957E8]' : 'bg-slate-200'
            }`}
            aria-label="Toggle email notifications"
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.emailNotifications ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Safety: Muted & Blocked Lists */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          <h2 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Safety & Moderated Contacts
          </h2>
        </div>

        {/* Muted */}
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#20212A] mb-2">
            <VolumeX className="w-3.5 h-3.5 text-[#74788A]" />
            <span>Muted Accounts ({mutedUsers.length})</span>
          </div>
          {mutedUsers.length > 0 ? (
            <div className="space-y-2">
              {mutedUsers.map(u => (
                <div key={u.id} className="p-2.5 bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar src={u.avatar} name={u.name} size="xs" />
                    <span className="text-xs font-medium text-[#20212A]">@{u.username}</span>
                  </div>
                  <button
                    onClick={() => unmuteUser(u.id)}
                    className="text-xs text-[#7957E8] font-semibold hover:underline"
                  >
                    Unmute
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#74788A] italic">No muted accounts.</p>
          )}
        </div>

        {/* Blocked */}
        <div className="pt-2 border-t border-[#EAEAEF]/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#20212A] mb-2">
            <UserX className="w-3.5 h-3.5 text-rose-500" />
            <span>Blocked Accounts ({blockedUsers.length})</span>
          </div>
          {blockedUsers.length > 0 ? (
            <div className="space-y-2">
              {blockedUsers.map(u => (
                <div key={u.id} className="p-2.5 bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar src={u.avatar} name={u.name} size="xs" />
                    <span className="text-xs font-medium text-[#20212A]">@{u.username}</span>
                  </div>
                  <button
                    onClick={() => unblockUser(u.id)}
                    className="text-xs text-[#7957E8] font-semibold hover:underline"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#74788A] italic">No blocked accounts.</p>
          )}
        </div>
      </div>

      {/* Demo Reset Card */}
      <div className="bg-white border border-[#EAEAEF] rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-amber-600" />
          <h2 className="text-xs font-bold text-[#20212A] uppercase tracking-wider">
            Demo Environment Management
          </h2>
        </div>
        <p className="text-xs text-[#74788A] leading-relaxed">
          All your edits, likes, newly created posts, and direct messages are saved to your browser’s localStorage. You can restore the initial seed state at any time.
        </p>

        {showResetConfirm ? (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <p className="text-xs font-bold text-amber-900">Are you sure you want to reset all demo data?</p>
            <p className="text-[11px] text-amber-700">This will restore the original seed posts and sample conversations.</p>
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  resetAllDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-3.5 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700"
              >
                Yes, Reset Everything
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 bg-white border border-slate-200 text-xs font-semibold text-slate-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 border border-[#EAEAEF] hover:bg-[#FAFAFC] text-xs font-semibold text-rose-600 rounded-xl transition-colors"
          >
            Reset All Demo Data to Defaults
          </button>
        )}
      </div>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </div>
  );
};
