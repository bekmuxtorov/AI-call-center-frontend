import React, { useState } from 'react';
import {
  Phone,
  CheckCircle2,
  Clock,
  PhoneCall,
  Globe,
  Link2,
  Plus,
  Search,
  Filter,
  RefreshCw,
  Copy,
  Settings,
  Power,
  Trash2,
  Shield
} from 'lucide-react';

interface NumbersConnectivityContentProps {
  darkMode: boolean;
}

const NumbersConnectivityContent: React.FC<NumbersConnectivityContentProps> = ({ darkMode }) => {
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSipModal, setShowSipModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('uz');
  const [numberType, setNumberType] = useState('mobile');
  const [searchQuery, setSearchQuery] = useState('');

  const numbers = [
    {
      id: 1,
      number: '+998 71 200 5555',
      country: 'Uzbekistan',
      countryCode: 'UZ',
      type: 'Local',
      status: 'active',
      assignedTo: 'Sotuv bolimi boti',
      monthlyFee: 5.00,
      callerId: '+998 71 200 5555',
      routing: 'AI Agent - Sales',
      purchaseDate: '2024-01-15',
      totalCalls: 1247
    },
    {
      id: 2,
      number: '+998 90 123 4567',
      country: 'Uzbekistan',
      countryCode: 'UZ',
      type: 'Mobile',
      status: 'active',
      assignedTo: 'Texnik yordam boti',
      monthlyFee: 8.00,
      callerId: '+998 90 123 4567',
      routing: 'AI Agent - Support',
      purchaseDate: '2024-02-10',
      totalCalls: 892
    },
    {
      id: 3,
      number: '+1 (555) 123-4567',
      country: 'United States',
      countryCode: 'US',
      type: 'Toll-Free',
      status: 'active',
      assignedTo: 'Mijozlarni qollab-quvvatlash',
      monthlyFee: 2.00,
      callerId: '+1 (555) 123-4567',
      routing: 'AI Agent - Customer Service',
      purchaseDate: '2024-01-20',
      totalCalls: 2156
    },
    {
      id: 4,
      number: '+7 (495) 123-4567',
      country: 'Russia',
      countryCode: 'RU',
      type: 'Local',
      status: 'inactive',
      assignedTo: 'Tashrifchilarni qabul qilish',
      monthlyFee: 6.50,
      callerId: '+7 (495) 123-4567',
      routing: 'Voicemail',
      purchaseDate: '2024-03-05',
      totalCalls: 124
    }
  ];

  const availableNumbers = [
    { number: '+998 71 200 7777', type: 'Local', price: 5.00, setup: 0 },
    { number: '+998 71 200 8888', type: 'Local', price: 5.00, setup: 0 },
    { number: '+998 90 999 1234', type: 'Mobile', price: 8.00, setup: 2.00 },
    { number: '+998 90 888 5678', type: 'Mobile', price: 8.00, setup: 2.00 }
  ];

  const countries = [
    { code: 'uz', name: 'Uzbekistan', flag: '🇺🇿', available: 45 },
    { code: 'us', name: 'United States', flag: '🇺🇸', available: 1200 },
    { code: 'ru', name: 'Russia', flag: '🇷🇺', available: 320 },
    { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', available: 180 }
  ];

  const cardBg = darkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = darkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';
  const hoverBg = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const inputBg = darkMode ? 'bg-gray-700' : 'bg-gray-50';

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Numbers & Connectivity</h2>
          <p className={textSecondary}>Telefon raqamlarini boshqarish va AI agentlarga ulash</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSipModal(true)}
            className={`flex items-center gap-2 px-4 py-3 ${cardBg} border ${borderColor} rounded-xl ${hoverBg} transition-all`}
          >
            <Link2 className="w-5 h-5" />
            <span className="font-medium text-sm">SIP Trunk</span>
          </button>
          <button
            onClick={() => setShowBuyModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Raqam sotib olish</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className={`${cardBg} rounded-2xl p-6 border ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}>
              <Phone className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          </div>
          <div className={`text-2xl font-bold ${textPrimary} mb-1`}>{numbers.length}</div>
          <div className={`text-sm ${textSecondary}`}>Faol raqamlar</div>
        </div>

        <div className={`${cardBg} rounded-2xl p-6 border ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center`}>
              <PhoneCall className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
          </div>
          <div className={`text-2xl font-bold ${textPrimary} mb-1`}>4,419</div>
          <div className={`text-sm ${textSecondary}`}>Jami qongiroqlar</div>
        </div>

        <div className={`${cardBg} rounded-2xl p-6 border ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'} flex items-center justify-center`}>
              <Globe className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
          </div>
          <div className={`text-2xl font-bold ${textPrimary} mb-1`}>3</div>
          <div className={`text-sm ${textSecondary}`}>Mamlakatlar</div>
        </div>

        <div className={`${cardBg} rounded-2xl p-6 border ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl ${darkMode ? 'bg-orange-500/20' : 'bg-orange-100'} flex items-center justify-center`}>
              <Clock className={`w-6 h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
            </div>
          </div>
          <div className={`text-2xl font-bold ${textPrimary} mb-1`}>$21.50</div>
          <div className={`text-sm ${textSecondary}`}>Oylik xarajat</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className={`${cardBg} rounded-2xl p-4 border ${borderColor} mb-6`}>
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${textSecondary}`} />
            <input
              type="text"
              placeholder="Raqam, mamlakat yoki bot nomi boyicha qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 ${inputBg} ${textPrimary} rounded-xl border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button className={`flex items-center gap-2 px-4 py-3 ${inputBg} rounded-xl ${hoverBg} border ${borderColor}`}>
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter</span>
          </button>
          <button className={`flex items-center gap-2 px-4 py-3 ${inputBg} rounded-xl ${hoverBg} border ${borderColor}`}>
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Numbers Table */}
      <div className={`${cardBg} rounded-2xl border ${borderColor} overflow-hidden`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>Raqam</th>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>Mamlakat</th>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>Turi</th>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>AI Agent</th>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>Caller ID</th>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>Qongiroqlar</th>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>Holat</th>
                <th className={`text-left px-6 py-4 text-sm font-semibold ${textPrimary}`}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {numbers.map((num) => (
                <tr key={num.id} className={`border-t ${borderColor} ${hoverBg} transition-colors`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}>
                        <Phone className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <div className={`font-semibold ${textPrimary}`}>{num.number}</div>
                        <div className={`text-xs ${textSecondary}`}>Sotib olingan: {num.purchaseDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{num.countryCode === 'UZ' ? '🇺🇿' : num.countryCode === 'US' ? '🇺🇸' : '🇷🇺'}</span>
                      <span className={textSecondary}>{num.country}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-lg text-xs font-medium ${num.type === 'Local' ? darkMode ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700' :
                        num.type === 'Mobile' ? darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700' :
                          darkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-100 text-purple-700'
                      }`}>
                      {num.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${num.assignedTo.includes('Sotuv') ? 'bg-green-500' :
                          num.assignedTo.includes('Texnik') ? 'bg-blue-500' :
                            num.assignedTo.includes('Mijoz') ? 'bg-purple-500' : 'bg-orange-500'
                        }`}></div>
                      <span className={`text-sm ${textSecondary}`}>{num.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${textSecondary}`}>{num.callerId}</span>
                      <button className={`p-1 ${hoverBg} rounded`}>
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${textPrimary}`}>{num.totalCalls.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${num.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className={`text-sm ${num.status === 'active' ? 'text-green-500' : textSecondary}`}>
                        {num.status === 'active' ? 'Faol' : 'Nofaol'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className={`p-2 ${hoverBg} rounded-lg transition-colors`}>
                        <Power className="w-4 h-4" />
                      </button>
                      <button className={`p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors`}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Buy Number Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto`}>
            <div className={`p-6 border-b ${borderColor} flex items-center justify-between`}>
              <div>
                <h3 className={`text-2xl font-bold ${textPrimary}`}>Yangi raqam sotib olish</h3>
                <p className={`text-sm ${textSecondary} mt-1`}>Mamlakat va raqam turini tanlang</p>
              </div>
              <button onClick={() => setShowBuyModal(false)} className={`p-2 ${hoverBg} rounded-lg`}>
                ✕
              </button>
            </div>

            <div className="p-6">
              {/* Country Selection */}
              <div className="mb-6">
                <label className={`block text-sm font-semibold ${textPrimary} mb-3`}>Mamlakat tanlash</label>
                <div className="grid grid-cols-2 gap-4">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => setSelectedCountry(country.code)}
                      className={`p-4 rounded-xl border-2 transition-all ${selectedCountry === country.code
                          ? 'border-blue-500 bg-blue-500/10'
                          : `${borderColor} ${hoverBg}`
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{country.flag}</span>
                        <div className="text-left">
                          <div className={`font-semibold ${textPrimary}`}>{country.name}</div>
                          <div className={`text-sm ${textSecondary}`}>{country.available} raqam mavjud</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Number Type */}
              <div className="mb-6">
                <label className={`block text-sm font-semibold ${textPrimary} mb-3`}>Raqam turi</label>
                <div className="flex gap-3">
                  {['mobile', 'local', 'tollfree'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNumberType(type)}
                      className={`px-6 py-3 rounded-xl font-medium transition-all ${numberType === type
                          ? 'bg-blue-500 text-white'
                          : `${inputBg} ${textSecondary}`
                        }`}
                    >
                      {type === 'mobile' ? 'Mobil' : type === 'local' ? 'Shahar' : 'Toll-free'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Available Numbers */}
              <div>
                <label className={`block text-sm font-semibold ${textPrimary} mb-3`}>Mavjud raqamlar</label>
                <div className="space-y-3">
                  {availableNumbers.map((num, index) => (
                    <div key={index} className={`p-4 rounded-xl border ${borderColor} flex items-center justify-between ${hoverBg}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}>
                          <Phone className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        </div>
                        <div>
                          <div className={`font-semibold text-lg ${textPrimary}`}>{num.number}</div>
                          <div className={`text-sm ${textSecondary}`}>{num.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`font-bold ${textPrimary}`}>${num.price}/oy</div>
                          {num.setup > 0 && (
                            <div className={`text-sm ${textSecondary}`}>Setup: ${num.setup}</div>
                          )}
                        </div>
                        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                          Sotib olish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIP Trunk Modal */}
      {showSipModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`${cardBg} rounded-2xl max-w-2xl w-full`}>
            <div className={`p-6 border-b ${borderColor} flex items-center justify-between`}>
              <div>
                <h3 className={`text-2xl font-bold ${textPrimary}`}>SIP Trunk ulanish</h3>
                <p className={`text-sm ${textSecondary} mt-1`}>Mavjud raqamingizni ulang</p>
              </div>
              <button onClick={() => setShowSipModal(false)} className={`p-2 ${hoverBg} rounded-lg`}>
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>SIP Host</label>
                <input
                  type="text"
                  placeholder="sip.provider.com"
                  className={`w-full px-4 py-3 ${inputBg} ${textPrimary} rounded-xl border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Port</label>
                <input
                  type="text"
                  placeholder="5060"
                  className={`w-full px-4 py-3 ${inputBg} ${textPrimary} rounded-xl border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Username</label>
                <input
                  type="text"
                  placeholder="your_username"
                  className={`w-full px-4 py-3 ${inputBg} ${textPrimary} rounded-xl border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold ${textPrimary} mb-2`}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 ${inputBg} ${textPrimary} rounded-xl border ${borderColor} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>

              <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'} border border-blue-500/20`}>
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className={`text-sm ${textPrimary} font-medium mb-1`}>Xavfsizlik</p>
                    <p className={`text-xs ${textSecondary}`}>Barcha ma'lumotlar shifrlangan holda saqlanadi</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSipModal(false)}
                  className={`flex-1 px-6 py-3 ${inputBg} ${textPrimary} rounded-xl font-semibold ${hoverBg} transition-all`}
                >
                  Bekor qilish
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                  Ulash
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumbersConnectivityContent;