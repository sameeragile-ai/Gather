import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Avatar } from '../common/Avatar';
import { 
  X, Image as ImageIcon, Sparkles, AlertCircle, 
  Check, Loader2 
} from 'lucide-react';
import { 
  travelCoverImg, designWorkspaceImg, artisanBakeryImg, 
  mountainFogImg, gatherBannerImg 
} from '../../data/initialData';

const PRESET_IMAGES = [
  { label: 'Mediterranean Coast', url: travelCoverImg },
  { label: 'Design Workspace', url: designWorkspaceImg },
  { label: 'Artisan Sourdough', url: artisanBakeryImg },
  { label: 'Mountain Fog', url: mountainFogImg },
  { label: 'Gather Studio', url: gatherBannerImg }
];

export const CreatePostModal: React.FC = () => {
  const { 
    currentUser, communities, isCreatePostOpen, 
    createPostInitialCommunityId, closeCreatePost, createPost 
  } = useApp();

  const [content, setContent] = useState('');
  const [selectedCommunityId, setSelectedCommunityId] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const MAX_CHARS = 600;

  useEffect(() => {
    if (createPostInitialCommunityId) {
      setSelectedCommunityId(createPostInitialCommunityId);
    } else {
      setSelectedCommunityId('');
    }
  }, [createPostInitialCommunityId, isCreatePostOpen]);

  if (!isCreatePostOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Please write some content for your post.');
      return;
    }
    if (content.length > MAX_CHARS) {
      setError(`Your post exceeds the ${MAX_CHARS} character limit.`);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Simulate swift, natural submission
    setTimeout(() => {
      const finalImage = selectedImage || (customImageUrl.trim() ? customImageUrl.trim() : undefined);
      createPost(
        content.trim(),
        finalImage,
        selectedCommunityId || undefined
      );

      setIsSubmitting(false);
      setContent('');
      setSelectedImage('');
      setCustomImageUrl('');
      setShowImagePicker(false);
      closeCreatePost();
    }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      closeCreatePost();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl border border-[#EAEAEF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onKeyDown={handleKeyDown}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#EAEAEF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#20212A]">Create New Post</h2>
          </div>
          <button
            onClick={closeCreatePost}
            className="p-1.5 text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-y-auto p-5">
          {error && (
            <div className="mb-3 p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Author & Community row */}
          <div className="flex items-center gap-3 mb-3.5 flex-wrap">
            <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#20212A]">{currentUser.name}</span>
              <span className="text-[11px] text-[#74788A]">Publishing to public feed</span>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <select
                value={selectedCommunityId}
                onChange={e => setSelectedCommunityId(e.target.value)}
                className="bg-[#FAFAFC] border border-[#EAEAEF] text-xs font-medium text-[#20212A] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#7957E8] transition-colors"
              >
                <option value="">Public / No community</option>
                {communities.map(comm => (
                  <option key={comm.id} value={comm.id}>
                    {comm.avatar} {comm.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            autoFocus
            rows={5}
            value={content}
            onChange={e => {
              setContent(e.target.value);
              if (error) setError(null);
            }}
            placeholder="Share an insight, question, or story with the community..."
            className="w-full resize-none text-[15px] leading-relaxed text-[#20212A] placeholder:text-[#74788A]/60 focus:outline-none bg-transparent"
          />

          {/* Image Preview if selected */}
          {(selectedImage || customImageUrl) && (
            <div className="relative mt-3 rounded-xl overflow-hidden border border-[#EAEAEF] bg-slate-50 max-h-56">
              <img
                src={selectedImage || customImageUrl}
                alt="Selected attachment preview"
                className="w-full h-full object-cover max-h-56"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedImage('');
                  setCustomImageUrl('');
                }}
                className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Image Picker Accordion */}
          {showImagePicker && (
            <div className="mt-4 p-3.5 bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#20212A]">
                <span>Select Curated High-Res Media</span>
                <button
                  type="button"
                  onClick={() => setShowImagePicker(false)}
                  className="text-[#74788A] hover:text-[#20212A]"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {PRESET_IMAGES.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSelectedImage(img.url);
                      setCustomImageUrl('');
                      setShowImagePicker(false);
                    }}
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img.url ? 'border-[#7957E8] ring-2 ring-[#7957E8]/20' : 'border-transparent hover:opacity-80'
                    }`}
                  >
                    <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-[#EAEAEF]/70">
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={e => {
                    setCustomImageUrl(e.target.value);
                    if (e.target.value) setSelectedImage('');
                  }}
                  placeholder="Or paste an image URL (https://...)"
                  className="w-full bg-white border border-[#EAEAEF] rounded-lg px-3 py-1.5 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8]"
                />
              </div>
            </div>
          )}

          {/* Bottom Bar Controls */}
          <div className="mt-auto pt-4 border-t border-[#EAEAEF] flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowImagePicker(!showImagePicker)}
                className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors ${
                  showImagePicker || selectedImage 
                    ? 'text-[#7957E8] bg-[#7957E8]/10' 
                    : 'text-[#74788A] hover:text-[#20212A] hover:bg-[#FAFAFC]'
                }`}
                title="Attach image"
              >
                <ImageIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Add Photo</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs font-mono tabular-nums ${
                content.length > MAX_CHARS ? 'text-rose-600 font-bold' : 'text-[#74788A]'
              }`}>
                {MAX_CHARS - content.length}
              </span>

              <button
                type="button"
                onClick={closeCreatePost}
                className="px-4 py-2 text-xs font-medium text-[#74788A] hover:text-[#20212A] rounded-xl transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !content.trim() || content.length > MAX_CHARS}
                className="px-5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] hover:opacity-95 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed shadow-sm transition-all flex items-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Publish Post</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
