
import React, { useState, useRef, useEffect } from 'react';
import { LogOut, Upload, ChevronDown, User as UserIcon, Wallet, Loader2 } from 'lucide-react';
import { User } from '../types';
import { apiService } from '../services/apiService';
import { saveUserToCookie } from '../utils/storage';

interface UserProfileProps {
  user: User;
  onSignOut: () => void;
}

const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=Astra+User&background=1e3a8a&color=fff&size=128";

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onSignOut
}) => {
  const [avatar, setAvatar] = useState<string>(user.avatarUrl || DEFAULT_AVATAR);
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update local avatar state if prop changes (e.g. fresh login)
  useEffect(() => {
     if (user.avatarUrl) setAvatar(user.avatarUrl);
  }, [user.avatarUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const result = reader.result as string;
        
        // Optimistic update
        setAvatar(result);
        setIsOpen(false);
        setIsUploading(true);

        try {
            // 1. Upload to Google Drive via Apps Script
            const driveUrl = await apiService.uploadAvatar(user.username, result);
            setAvatar(driveUrl);

            // 2. Explicitly update the Sheet with the new URL
            await apiService.updateUserAvatar(user.username, driveUrl);

            // 3. Update Cookie with new Avatar URL to persist on reload
            const updatedUser = { ...user, avatarUrl: driveUrl };
            saveUserToCookie(updatedUser);

        } catch (err) {
            console.error("Avatar upload failed:", err);
            // Optionally revert avatar here on failure
        } finally {
            setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative z-50 ml-auto" ref={dropdownRef}>
      {/* Main Trigger Area */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
      >
        {/* Avatar Circle */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/20 shadow-inner group-hover:scale-105 transition-transform bg-black/20">
            <img 
                src={avatar} 
                alt="User Avatar" 
                className={`w-full h-full object-cover transition-opacity duration-300 ${isUploading ? 'opacity-50' : 'opacity-100'}`}
                onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
            />
            {isUploading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 size={16} className="text-white animate-spin" />
                </div>
            )}
            {/* Hover Overlay */}
            {!isUploading && (
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ChevronDown size={14} className="text-white" />
                </div>
            )}
        </div>

        {/* User Info */}
        <div className="flex flex-col items-start">
            <span className="text-sm font-bold text-white leading-none mb-1 group-hover:text-blue-200 transition-colors">
                {user.username}
            </span>
            <div className="flex items-center gap-1.5">
                <Wallet size={10} className="text-emerald-400" />
                <span className="text-[10px] font-mono text-emerald-400 font-medium tracking-wide">
                    {user.credits} Credits
                </span>
            </div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#0f172a]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="p-1">
                {/* Change Avatar Option */}
                <button 
                    onClick={triggerUpload}
                    disabled={isUploading}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-left disabled:opacity-50"
                >
                    <div className="p-1.5 bg-blue-500/20 rounded-md text-blue-400">
                        <Upload size={14} />
                    </div>
                    <div>
                        <span className="block font-semibold">Change Avatar</span>
                        <span className="block text-[9px] text-white/40">Upload to Drive</span>
                    </div>
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                />

                <div className="h-[1px] w-full bg-white/10 my-1"></div>

                {/* Sign Out Option */}
                <button 
                    onClick={onSignOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-red-300 hover:text-red-200 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                >
                    <div className="p-1.5 bg-red-500/20 rounded-md text-red-400">
                        <LogOut size={14} />
                    </div>
                    <span className="font-semibold">Sign Out</span>
                </button>
            </div>
            
            {/* Footer */}
            <div className="bg-black/20 px-3 py-2 text-[9px] text-white/30 text-center border-t border-white/5">
                Logged in via Secure Node
            </div>
        </div>
      )}
    </div>
  );
};
