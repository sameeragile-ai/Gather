import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Check, AlertCircle } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateCurrentUserProfile } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [location, setLocation] = useState(currentUser.location || '');
  const [website, setWebsite] = useState(currentUser.website || '');
  const [interestsStr, setInterestsStr] = useState(currentUser.interests.join(', '));
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name cannot be empty.');
      return;
    }

    const interests = interestsStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    updateCurrentUserProfile({
      name: name.trim(),
      bio: bio.trim(),
      location: location.trim() || undefined,
      website: website.trim() || undefined,
      interests
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-[#EAEAEF] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        <div className="px-5 py-4 border-b border-[#EAEAEF] flex items-center justify-between">
          <h2 className="text-base font-bold text-[#20212A]">Edit Profile Details</h2>
          <button
            onClick={onClose}
            className="p-1 text-[#74788A] hover:text-[#20212A] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#20212A] uppercase tracking-wider mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#20212A] uppercase tracking-wider mb-1.5">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#20212A] uppercase tracking-wider mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#20212A] uppercase tracking-wider mb-1.5">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                placeholder="https://..."
                className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#20212A] uppercase tracking-wider mb-1.5">
              Interests (comma separated)
            </label>
            <input
              type="text"
              value={interestsStr}
              onChange={e => setInterestsStr(e.target.value)}
              placeholder="Design, Typography, Photography, Books"
              className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
            />
          </div>

          <div className="pt-3 border-t border-[#EAEAEF] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#74788A] hover:text-[#20212A] rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] rounded-xl hover:opacity-95 shadow-xs"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
