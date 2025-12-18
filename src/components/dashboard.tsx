import React, { useState } from 'react';
import {
  LayoutDashboard,
  Phone,
  FileText,
  PhoneIncoming,
  PhoneOutgoing,
  Clock,
  Wallet,
  TrendingUp,
  Moon,
  Sun,
  ChevronRight,
  Activity,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Calendar,
  Zap,
  Cpu,
  Server
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import NumbersConnectivityContent from './numbers_connectivity_page';
import CallLogsContent from './call_logs';
import Header from './header';

const AiCallCenterDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('7days');

  const toggleTheme = () => setDarkMode(!darkMode);

  const callsData = [
    { time: '00:00', incoming: 12, outgoing: 8 },
    { time: '04:00', incoming: 8, outgoing: 5 },
    { time: '08:00', incoming: 45, outgoing: 32 },
    { time: '12:00', incoming: 68, outgoing: 52 },
    { time: '16:00', incoming: 58, outgoing: 48 },
    { time: '20:00', incoming: 32, outgoing: 24 },
    { time: '23:59', incoming: 15, outgoing: 10 }
  ];

  const efficiencyData = [
    { day: 'Mon', rate: 85 },
    { day: 'Tue', rate: 88 },
    { day: 'Wed', rate: 92 },
    { day: 'Thu', rate: 89 },
    { day: 'Fri', rate: 94 },
    { day: 'Sat', rate: 91 },
    { day: 'Sun', rate: 87 }
  ];

  const stats = {
    totalCalls: {
      incoming: 1247,
      outgoing: 892,
      change: 12.5,
      trend: 'up'
    },
    avgDuration: {
      value: '4:32',
      seconds: 272,
      change: -8.3,
      trend: 'down'
    },
    balance: {
      spent: 2847.50,
      remaining: 7152.50,
      change: 15.2,
      trend: 'up'
    },
    aiEfficiency: {
      rate: 89.5,
      successful: 1867,
      total: 2087,
      change: 5.7,
      trend: 'up'
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'numbers', label: 'Numbers & Connectivity', icon: Phone },
    { id: 'logs', label: 'Call Logs & Recordings', icon: FileText }
  ];

  const bgColor = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';

  const renderContent = () => {
    switch (activeMenu) {
      case 'numbers':
        return <NumbersConnectivityContent darkMode={darkMode} />;
      case 'logs':
        return <CallLogsContent darkMode={darkMode} />;
      case 'dashboard':
      default:
        return (
          <div className="animate-fade-in">
            {/* Header / Filter Row */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Dashboard</h2>
                <p className={textSecondary}>Asosiy boshqaruv paneli - umumiy statistika</p>
              </div>

              {/* Time Range Filter */}
              <div className="flex items-center gap-3">
                <Calendar className={`w-5 h-5 ${textSecondary}`} />
                <div className={`flex ${cardBg} rounded-xl border ${borderColor} p-1`}>
                  {['24h', '7days', '30days', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeRange === range
                        ? darkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : `${textSecondary} ${hoverBg}`
                        }`}
                    >
                      {range === '24h' ? '24 soat' : range === '7days' ? '7 kun' : range === '30days' ? '30 kun' : 'Yil'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              {/* Total Calls Card */}
              <div className={`${cardBg} rounded-2xl p-6 border ${borderColor} transition-all hover:shadow-xl`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center`}>
                    <PhoneIncoming className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stats.totalCalls.trend === 'up'
                    ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    : darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                    }`}>
                    {stats.totalCalls.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="text-xs font-semibold">{stats.totalCalls.change}%</span>
                  </div>
                </div>
                <div className={`text-sm ${textSecondary} mb-2`}>Umumiy Qo'ng'iroqlar</div>
                <div className={`text-3xl font-bold ${textPrimary} mb-4`}>
                  {stats.totalCalls.incoming + stats.totalCalls.outgoing}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <PhoneIncoming className="w-4 h-4 text-green-500" />
                    <span className={textSecondary}>{stats.totalCalls.incoming}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneOutgoing className="w-4 h-4 text-blue-500" />
                    <span className={textSecondary}>{stats.totalCalls.outgoing}</span>
                  </div>
                </div>
              </div>

              {/* Average Duration Card */}
              <div className={`${cardBg} rounded-2xl p-6 border ${borderColor} transition-all hover:shadow-xl`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}>
                    <Clock className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stats.avgDuration.trend === 'down'
                    ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    : darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                    }`}>
                    {stats.avgDuration.trend === 'down' ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    <span className="text-xs font-semibold">{Math.abs(stats.avgDuration.change)}%</span>
                  </div>
                </div>
                <div className={`text-sm ${textSecondary} mb-2`}>O'rtacha Davomiyligi</div>
                <div className={`text-3xl font-bold ${textPrimary} mb-4`}>{stats.avgDuration.value}</div>
                <div className={`w-full h-2 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    style={{ width: `${(stats.avgDuration.seconds / 600) * 100}%` }}
                  />
                </div>
              </div>

              {/* Balance Card */}
              <div className={`${cardBg} rounded-2xl p-6 border ${borderColor} transition-all hover:shadow-xl`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'} flex items-center justify-center`}>
                    <Wallet className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stats.balance.trend === 'up'
                    ? darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                    : darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    }`}>
                    {stats.balance.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="text-xs font-semibold">{stats.balance.change}%</span>
                  </div>
                </div>
                <div className={`text-sm ${textSecondary} mb-2`}>Sarflangan Mablag'</div>
                <div className={`text-3xl font-bold ${textPrimary} mb-1`}>${stats.balance.spent.toLocaleString()}</div>
                <div className={`text-xs ${textSecondary}`}>Qolgan: ${stats.balance.remaining.toLocaleString()}</div>
              </div>

              {/* AI Efficiency Card */}
              <div className={`${cardBg} rounded-2xl p-6 border ${borderColor} transition-all hover:shadow-xl`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-orange-500/20' : 'bg-orange-100'} flex items-center justify-center`}>
                    <Activity className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${stats.aiEfficiency.trend === 'up'
                    ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                    : darkMode ? 'bg-red-500/20 text-red-400' : 'bg-red-100 text-red-700'
                    }`}>
                    {stats.aiEfficiency.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    <span className="text-xs font-semibold">{stats.aiEfficiency.change}%</span>
                  </div>
                </div>
                <div className={`text-sm ${textSecondary} mb-2`}>AI Samaradorligi</div>
                <div className={`text-3xl font-bold ${textPrimary} mb-1`}>{stats.aiEfficiency.rate}%</div>
                <div className={`text-xs ${textSecondary}`}>
                  {stats.aiEfficiency.successful}/{stats.aiEfficiency.total} muvaffaqiyatli
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6">
              {/* Calls Chart */}
              <div className={`col-span-2 ${cardBg} rounded-2xl p-6 border ${borderColor}`}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className={`text-lg font-semibold ${textPrimary} mb-1`}>Qo'ng'iroqlar Statistikasi</h3>
                    <p className={`text-sm ${textSecondary}`}>Kiruvchi va chiquvchi qo'ng'iroqlar</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className={`text-sm ${textSecondary}`}>Kiruvchi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className={`text-sm ${textSecondary}`}>Chiquvchi</span>
                    </div>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={callsData}>
                    <defs>
                      <linearGradient id="colorIncoming" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorOutgoing" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="time" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: darkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Area type="monotone" dataKey="incoming" stroke="#22c55e" fillOpacity={1} fill="url(#colorIncoming)" />
                    <Area type="monotone" dataKey="outgoing" stroke="#3b82f6" fillOpacity={1} fill="url(#colorOutgoing)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* AI Efficiency Chart */}
              <div className={`${cardBg} rounded-2xl p-6 border ${borderColor}`}>
                <div className="mb-6">
                  <h3 className={`text-lg font-semibold ${textPrimary} mb-1`}>AI Samaradorligi</h3>
                  <p className={`text-sm ${textSecondary}`}>Haftalik ko'rsatkich</p>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="day" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} domain={[80, 100]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                        border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                        borderRadius: '8px',
                        color: darkMode ? '#ffffff' : '#000000'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rate"
                      stroke="#f97316"
                      strokeWidth={3}
                      dot={{ fill: '#f97316', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 text-center">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${darkMode ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                    <CheckCircle2 className={`w-5 h-5 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                    <span className={`font-semibold ${darkMode ? 'text-orange-400' : 'text-orange-700'}`}>
                      O'rtacha: {(efficiencyData.reduce((sum, d) => sum + d.rate, 0) / efficiencyData.length).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`flex min-h-screen ${bgColor} transition-colors duration-300 font-sans`}>
      {/* Sidebar */}
      <aside className={`w-72 flex-shrink-0 border-r ${borderColor} ${cardBg} flex flex-col transition-colors duration-300 z-10 sticky top-0 h-screen`}>
        {/* Logo */}
        <div className={`p-6 border-b ${borderColor} flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${textPrimary}`}>AI Call Center</h1>
              <p className={`text-xs ${textSecondary}`}>"Hududgazta'minoti" AJ</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <div className="space-y-2 mb-8">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenu === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${isActive
                    ? darkMode
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : `${textSecondary} ${hoverBg}`
                    }`}
                >
                  <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              );
            })}
          </div>

          {/* AI System Status Widget */}
          <div className={`p-4 rounded-xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-slate-50 border-gray-100'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                  <Zap className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <span className={`text-xs font-semibold ${textPrimary}`}>AI Engine</span>
              </div>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className={textSecondary}>Optimization</span>
                  <span className="text-green-500 font-medium">98% Efficient</span>
                </div>
                <div className={`w-full h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 w-[98%] rounded-full"></div>
                </div>
              </div>

              <div className={`flex items-center gap-2 text-[10px] ${textSecondary}`}>
                <Server className="w-3 h-3" />
                <span>Qo'ng'iroqlarni real vaqt rejimida qayta ishlash</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className={`p-6 border-t ${borderColor} flex-shrink-0`}>
          <div className={`text-xs ${textSecondary} text-center`}>
            v1.0.0 • © 2024 AI Center
          </div>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* Top Header */}
        <Header activeMenu={activeMenu} darkMode={darkMode} toggleTheme={toggleTheme} />

        {/* Dynamic Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AiCallCenterDashboard;
