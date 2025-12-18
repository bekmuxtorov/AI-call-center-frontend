import React, { useState } from 'react';
import { Phone, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
    onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setLoading(false);
            onLogin();
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white flex relative overflow-hidden font-sans">
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute top-[20%] right-[30%] w-[20%] h-[20%] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Left Side - Hero/Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden bg-slate-50 border-r border-slate-100">

                {/* Decorative Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.01)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 tracking-tight">AI Call Center</h1>
                            <p className="text-xs text-slate-500 tracking-wide uppercase">Dispatcher Platform</p>
                        </div>
                    </div>

                    <div className="max-w-md">
                        <h2 className="text-4xl font-bold text-slate-900 mb-6 leading-tight">
                            Biznesingiz uchun <span className="text-blue-600">aqlli muloqot</span> platformasi
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            Mijozlar bilan aloqani avtomatlashtiring, samaradorlikni oshiring va har bir qo'ng'iroqdan maksimal natija oling.
                        </p>

                        <div className="space-y-4">
                            {[
                                "24/7 Avtomatlashtirilgan xizmat",
                                "Real vaqtda tahlillar va hisobotlar",
                                "Oson integratsiya va boshqaruv"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-slate-400">
                    &copy; 2024 AI Call Center Platform. Barcha huquqlar himoyalangan.
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
                <div className="w-full max-w-md mx-auto">
                    {/* Mobile Logo shows only on mobile */}
                    <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-800 text-lg">AI Call Center</span>
                    </div>

                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white lg:border-none shadow-xl lg:shadow-none">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Xush kelibsiz! 👋</h2>
                            <p className="text-slate-500">Davom etish uchun hisobingizga kiring</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-slate-700 ml-1">Email yoki Login</label>
                                <div className={`bg-slate-50 border transition-all duration-200 rounded-xl px-4 py-3 flex items-center gap-3 ${focusedInput === 'email' ? 'border-blue-500 ring-4 ring-blue-500/10 bg-white' : 'border-slate-200 hover:border-slate-300'
                                    }`}>
                                    <User className={`w-5 h-5 transition-colors ${focusedInput === 'email' ? 'text-blue-500' : 'text-slate-400'}`} />
                                    <input
                                        type="text"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                        placeholder="admin@company.com"
                                        className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-sm font-semibold text-slate-700">Parol</label>
                                    <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">Parolni unutdingizmi?</a>
                                </div>
                                <div className={`bg-slate-50 border transition-all duration-200 rounded-xl px-4 py-3 flex items-center gap-3 ${focusedInput === 'password' ? 'border-blue-500 ring-4 ring-blue-500/10 bg-white' : 'border-slate-200 hover:border-slate-300'
                                    }`}>
                                    <Lock className={`w-5 h-5 transition-colors ${focusedInput === 'password' ? 'text-blue-500' : 'text-slate-400'}`} />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput(null)}
                                        placeholder="••••••••"
                                        className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 w-full text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 ${loading ? 'opacity-80 cursor-not-allowed' : ''
                                    }`}
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Kirish</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-8 text-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                            <p className="text-sm text-slate-600">
                                Hisobingiz yo'qmi?{' '}
                                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                                    Ro'yxatdan o'tish
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
