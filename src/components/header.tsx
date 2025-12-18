import React, { useState } from 'react';
import {
    Search,
    Bell,
    User,
    Settings,
    LogOut,
    Menu,
    ChevronRight,
    Globe,
    Moon,
    Sun
} from 'lucide-react';

interface HeaderProps {
    activeMenu: string;
    darkMode: boolean;
    toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeMenu, darkMode, toggleTheme }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [language, setLanguage] = useState('uz');

    const getPageTitle = (menu: string) => {
        switch (menu) {
            case 'dashboard': return 'Dashboard';
            case 'numbers': return 'Numbers & Connectivity';
            case 'logs': return 'Call Logs & Recordings';
            default: return 'Dashboard';
        }
    };

    const getBreadcrumbs = (menu: string) => {
        const title = getPageTitle(menu);
        return [
            { label: 'Home', path: '/' },
            { label: title, path: '#' }
        ];
    };

    const notifications = [
        { id: 1, title: 'Missed Call', time: '5 min ago', unread: true },
        { id: 2, title: 'New Number Active', time: '1 hour ago', unread: false },
        { id: 3, title: 'System Update', time: 'Yesterday', unread: false }
    ];

    const bgColor = darkMode ? 'bg-gray-800' : 'bg-white';
    const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
    const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
    const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
    const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

    return (
        <header className={`sticky top-0 z-20 ${bgColor} border-b ${borderColor} px-8 py-4 flex items-center justify-between transition-colors shadow-sm`}>
            {/* Left: Breadcrumbs & Mobile Menu */}
            <div className="flex items-center gap-4">
                <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Menu className={textSecondary} size={24} />
                </button>

                <div className="hidden md:block">
                    <nav className="flex items-center gap-2 text-sm">
                        {getBreadcrumbs(activeMenu).map((crumb, index, arr) => (
                            <React.Fragment key={index}>
                                <span className={`${index === arr.length - 1 ? 'font-semibold ' + textPrimary : 'text-gray-500'}`}>
                                    {crumb.label}
                                </span>
                                {index < arr.length - 1 && <ChevronRight size={14} className="text-gray-400" />}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Center: Global Search */}
            <div className="flex-1 max-w-lg mx-8 hidden md:block">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search anything (calls, numbers, settings)..."
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${borderColor} ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>Ctrl</span>
                        <span className={`text-xs px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>K</span>
                    </div>
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Language */}
                <button className={`p-2 rounded-xl border ${borderColor} ${hoverBg} hidden sm:flex items-center gap-2`}>
                    <Globe size={18} className={textSecondary} />
                    <span className={`text-sm font-medium ${textPrimary}`}>{language.toUpperCase()}</span>
                </button>

                {/* Theme Toggle (Quick Access) */}
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-xl border ${borderColor} ${hoverBg} transition-colors`}
                >
                    {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`p-2 rounded-xl border ${borderColor} ${hoverBg} relative`}
                    >
                        <Bell size={20} className={textSecondary} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
                    </button>

                    {showNotifications && (
                        <div className={`absolute right-0 mt-3 w-80 rounded-2xl shadow-xl border ${borderColor} ${bgColor} overflow-hidden`}>
                            <div className={`p-4 border-b ${borderColor} flex justify-between items-center`}>
                                <h3 className={`font-semibold ${textPrimary}`}>Notifications</h3>
                                <span className="text-xs text-blue-500 cursor-pointer">Mark all as read</span>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {notifications.map(notif => (
                                    <div key={notif.id} className={`p-4 border-b ${borderColor} ${hoverBg} cursor-pointer flex gap-3 last:border-0`}>
                                        <div className={`w-2 h-2 mt-2 rounded-full ${notif.unread ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                                        <div>
                                            <h4 className={`text-sm font-medium ${textPrimary}`}>{notif.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className={`flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-xl border ${borderColor} ${hoverBg} transition-all`}
                    >
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                            JD
                        </div>
                        <div className="hidden sm:block text-left">
                            <div className={`text-xs font-semibold ${textPrimary}`}>John Doe</div>
                            <div className="text-[10px] text-gray-500">Admin</div>
                        </div>
                    </button>

                    {showProfileMenu && (
                        <div className={`absolute right-0 mt-3 w-56 rounded-2xl shadow-xl border ${borderColor} ${bgColor} overflow-hidden p-2`}>
                            <div className={`p-3 mb-2 border-b ${borderColor}`}>
                                <div className={`font-semibold ${textPrimary}`}>John Doe</div>
                                <div className="text-xs text-gray-500">john@example.com</div>
                            </div>
                            <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${hoverBg} ${textSecondary} mb-1`}>
                                <User size={16} /> Profile
                            </button>
                            <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${hoverBg} ${textSecondary} mb-1`}>
                                <Settings size={16} /> Settings
                            </button>
                            <div className={`my-1 border-t ${borderColor}`}></div>
                            <button className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-red-500`}>
                                <LogOut size={16} /> Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
