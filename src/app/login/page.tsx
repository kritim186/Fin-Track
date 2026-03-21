'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alex@fintrack.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Auth.js built-in sign-in
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-14 h-14 bg-black dark:bg-white rounded-2xl shadow-sm ring-1 ring-black/5">
            <Activity className="w-7 h-7 text-white dark:text-black" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-black tracking-tight text-gray-900 dark:text-white transition-colors">
          Sign in to FinTrack
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
          Use the demo credentials to access your secure dashboard.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
        <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl shadow-black/5 dark:shadow-none sm:rounded-2xl sm:px-10 ring-1 ring-gray-900/5 dark:ring-white/10 transition-colors">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-xl bg-rose-50 dark:bg-rose-500/10 p-4 text-sm text-rose-600 dark:text-rose-400 font-semibold border border-rose-200 dark:border-rose-500/20">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 sm:text-sm rounded-xl border border-gray-200 dark:border-white/10 py-3 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors font-medium outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="mt-2 relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 sm:text-sm rounded-xl border border-gray-200 dark:border-white/10 py-3 bg-white dark:bg-slate-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors font-medium outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all active:scale-[0.98] disabled:opacity-70 disabled:scale-100"
              >
                {loading ? 'Authenticating...' : 'Sign In securely'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
