import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/common/Avatar';
import { 
  X, Check, Eye, EyeOff, Sparkles, UserPlus, 
  ArrowRight, ShieldCheck, Heart 
} from 'lucide-react';

const AVAILABLE_INTERESTS = [
  'Design & Typography',
  'Documentary Photography',
  'Slow Travel & Essays',
  'Indie SaaS Building',
  'Trail Running & Longevity',
  'Artisan Sourdough & Craft',
  'Literature & Marginalia',
  'Hardware & Minimal Architecture'
];

export const OnboardingModal: React.FC = () => {
  const { 
    isAuthModalOpen, closeAuthModal, users, currentUser, 
    switchDemoUser, toggleFollowUser, followedUserIds, addToast 
  } = useApp();

  const [step, setStep] = useState<'auth' | 'interests' | 'follow'>('auth');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Design & Typography', 'Slow Travel & Essays']);

  if (!isAuthModalOpen) return null;

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter credentials', 'For demo mode, you can use any email and password, or choose a persona below.', 'info');
      return;
    }
    // Advance to interests setup
    setStep('interests');
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleFinishOnboarding = () => {
    addToast('Welcome to Gather!', 'Your personalized feed has been tailored to your interests.', 'success');
    closeAuthModal();
    setStep('auth');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-[#EAEAEF] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#EAEAEF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7957E8] to-[#5B8DEF] flex items-center justify-center text-white font-black text-sm">
              G
            </div>
            <span className="text-sm font-extrabold text-[#20212A]">
              {step === 'auth' ? 'Sign In / Explore Gather' : step === 'interests' ? 'Curate Your Interests' : 'Follow Recommended Creators'}
            </span>
          </div>

          <button
            onClick={closeAuthModal}
            className="p-1.5 text-[#74788A] hover:text-[#20212A] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Sign in / Switch Persona */}
        {step === 'auth' && (
          <div className="p-6 space-y-5 overflow-y-auto">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-[#20212A] tracking-tight">
                {authMode === 'signin' ? 'Welcome Back to Gather' : 'Create Your Gather Account'}
              </h2>
              <p className="text-xs text-[#74788A]">
                A serene community for genuine conversations and craftsmanship.
              </p>
            </div>

            {/* Quick Demo Persona Chooser */}
            <div className="p-4 bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#20212A]">Instant Demo Access</span>
                <span className="text-[11px] text-[#7957E8] font-semibold">1-Click Switch</span>
              </div>
              <p className="text-[11px] text-[#74788A] leading-relaxed">
                Click any pre-configured persona below to explore the application immediately without typing:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {users.slice(0, 4).map(u => (
                  <button
                    key={u.id}
                    onClick={() => {
                      switchDemoUser(u.id);
                      closeAuthModal();
                    }}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all ${
                      u.id === currentUser.id
                        ? 'border-[#7957E8] bg-[#7957E8]/10 text-[#7957E8]'
                        : 'border-[#EAEAEF] bg-white hover:bg-slate-50 text-[#20212A]'
                    }`}
                  >
                    <Avatar src={u.avatar} name={u.name} size="xs" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{u.name.split(' ')[0]}</p>
                      <p className="text-[10px] text-[#74788A] truncate">@{u.username}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Auth Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-[#EAEAEF]"></div>
                <span className="flex-shrink mx-3 text-[11px] text-[#74788A] uppercase font-semibold">
                  Or enter credentials
                </span>
                <div className="flex-grow border-t border-[#EAEAEF]"></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#20212A] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2.5 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#20212A] mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#FAFAFC] border border-[#EAEAEF] rounded-xl px-3.5 py-2.5 text-xs text-[#20212A] focus:outline-none focus:border-[#7957E8] focus:bg-white transition-all pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#74788A] hover:text-[#20212A] p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] text-white text-xs font-semibold rounded-xl hover:opacity-95 shadow-md shadow-[#7957E8]/20 transition-all flex items-center justify-center gap-2"
              >
                <span>{authMode === 'signin' ? 'Sign In & Customize Feed' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                className="text-xs text-[#7957E8] font-semibold hover:underline"
              >
                {authMode === 'signin'
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Interest Selection */}
        {step === 'interests' && (
          <div className="p-6 space-y-5 overflow-y-auto">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#20212A]">What are you passionate about?</h2>
              <p className="text-xs text-[#74788A]">
                We'll prioritize discussions and stories in your feed matching your choices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_INTERESTS.map(interest => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#7957E8] bg-[#7957E8]/10 text-[#7957E8]'
                        : 'border-[#EAEAEF] bg-[#FAFAFC] hover:bg-slate-100 text-[#20212A]'
                    }`}
                  >
                    <span>{interest}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#7957E8]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#EAEAEF] flex items-center justify-between">
              <button
                onClick={() => setStep('auth')}
                className="text-xs text-[#74788A] hover:text-[#20212A]"
              >
                Back
              </button>

              <button
                onClick={() => setStep('follow')}
                className="px-5 py-2 bg-[#7957E8] text-white text-xs font-semibold rounded-xl hover:bg-[#6846D4] transition-colors flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Suggested Follows */}
        {step === 'follow' && (
          <div className="p-6 space-y-5 overflow-y-auto">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[#20212A]">Follow Curated Contributors</h2>
              <p className="text-xs text-[#74788A]">
                Here are a few thoughtful people in your selected disciplines.
              </p>
            </div>

            <div className="space-y-3">
              {users.filter(u => u.id !== currentUser.id).slice(0, 4).map(user => (
                <div key={user.id} className="p-3 bg-[#FAFAFC] border border-[#EAEAEF] rounded-2xl flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar src={user.avatar} name={user.name} size="md" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#20212A] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#74788A] truncate">@{user.username} · {user.location}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleFollowUser(user.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shrink-0 ${
                      followedUserIds.has(user.id)
                        ? 'bg-slate-200 text-[#20212A]'
                        : 'bg-[#7957E8] text-white hover:bg-[#6846D4]'
                    }`}
                  >
                    {followedUserIds.has(user.id) ? 'Following' : 'Follow'}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EAEAEF] flex items-center justify-between">
              <button
                onClick={() => setStep('interests')}
                className="text-xs text-[#74788A] hover:text-[#20212A]"
              >
                Back
              </button>

              <button
                onClick={handleFinishOnboarding}
                className="px-6 py-2.5 bg-gradient-to-r from-[#7957E8] to-[#5B8DEF] text-white text-xs font-semibold rounded-xl hover:opacity-95 shadow-md shadow-[#7957E8]/20 transition-all flex items-center gap-1.5"
              >
                <span>Complete Setup & Enter Gather</span>
                <Check className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
