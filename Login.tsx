
import React, { useState } from 'react';
import { GlassCard } from './components/GlassCard';
import { Button } from './components/Button';
import { User, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { User as UserType } from './types';
import { apiService } from './services/apiService';

interface LoginProps {
  onLoginSuccess: (user: UserType) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // --- BACKDOOR FOR DEMO/ADMIN (Optional - keep if you want local testing) ---
      if (username === 'admin' && password === 'astra777') {
         setTimeout(() => {
             onLoginSuccess({ username: 'Admin', credits: 9999, avatarUrl: '' });
         }, 800);
         return;
      }
      // ------------------------------------------

      // GỌI API SANG GOOGLE APPS SCRIPT
      const user = await apiService.login(username, password);

      onLoginSuccess(user);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative bg-[#0f172a] overflow-hidden flex flex-col items-center justify-center selection:bg-blue-500 selection:text-white">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none transform-gpu translate-z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#0f172a] blur-[120px] opacity-40 will-change-transform"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tl from-[#3b82f6] via-[#60a5fa] to-[#0f172a] blur-[120px] opacity-20 will-change-transform"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/40 blur-[80px]"></div>
        <div className="absolute inset-0 backdrop-blur-[60px]"></div>
        <div className="absolute inset-0 z-0 opacity-50 mix-blend-overlay" style={{backgroundImage: `repeating-linear-gradient(90deg,rgba(255,255,255,0) 0px,rgba(255,255,255,0.1) 10px,rgba(255,255,255,0.2) 15px,rgba(255,255,255,0.1) 20px,rgba(255,255,255,0) 30px,rgba(0,0,0,0.2) 40px,rgba(0,0,0,0.5) 45px,rgba(0,0,0,0.2) 50px,rgba(0,0,0,0) 60px)`}}></div>
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80"></div>
      </div>

      <GlassCard className="p-8 sm:p-12 flex flex-col items-center w-full max-w-md mx-4 text-center z-10 relative border-white/20 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-500">
        
        <div className="flex flex-col justify-center items-center mb-8 w-full">
            <h1 className="text-5xl font-black text-white tracking-tighter leading-none uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">ASTRA</h1>
            <p className="text-[0.65rem] font-bold tracking-[0.4em] uppercase text-white/50 pl-0.5 leading-none mt-2">Creatives from the stars</p>
            <div className="w-full mt-6 border-t border-white/10"></div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-white/50 text-sm mb-8">Enter your credentials to access the design node.</p>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
            
            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                    <User size={18} />
                </div>
                <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
            </div>

            <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                    <Lock size={18} />
                </div>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                />
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center gap-2 text-red-200 text-xs text-left animate-in slide-in-from-top-1">
                    <AlertCircle size={14} className="flex-none" />
                    <span>{error}</span>
                </div>
            )}

            <Button 
                type="submit" 
                className="w-full mt-2 py-3" 
                variant="primary"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" /> Authenticating...
                    </>
                ) : (
                    <>
                        Align Your Stars <ArrowRight size={18} />
                    </>
                )}
            </Button>

        </form>

        <div className="mt-8 pt-6 border-t border-white/10 w-full">
             <p className="text-[10px] text-white/30 uppercase tracking-widest">
                 Authorized Personnel Only
             </p>
        </div>

      </GlassCard>
    </div>
  );
};

export default Login;
