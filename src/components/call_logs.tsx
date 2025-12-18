import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Search, Download, Filter, Phone, Clock, Calendar as CalendarIcon, Activity as ActivityIcon } from 'lucide-react';

interface CallLogsContentProps {
  darkMode: boolean;
}

const CallLogsContent: React.FC<CallLogsContentProps> = ({ darkMode }) => {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const audioRef = useRef(null);

  // Mock data
  const callLogs = [
    {
      id: 1,
      date: '2024-12-18',
      time: '14:32:15',
      duration: '08:45',
      customer: '+998 90 123 45 67',
      sentiment: 'positive',
      sentimentScore: 85,
      purpose: 'Mahsulot haqida so\'rov',
      aiSummary: 'Mijoz yangi tarif rejalar haqida so\'radi. AI barcha mavjud tariflarni tushuntirdi va eng mos variantni tavsiya qildi.',
      keyPoints: ['Tarif rejalar', 'Narxlar taqqoslash', 'Chegirmalar'],
      actionItems: ['Ertaga soat 10:00 da qayta qo\'ng\'iroq'],
      latency: 0.8,
      cost: 0.15,
      transcript: [
        { speaker: 'customer', time: '00:00', text: 'Assalomu alaykum, sizning tariflaringiz haqida ma\'lumot olmoqchi edim.' },
        { speaker: 'ai', time: '00:03', text: 'Vaalaykum assalom! Albatta, sizga yordam bera olaman. Bizda 3 xil tarif rejasi mavjud...' },
        { speaker: 'customer', time: '00:25', text: 'Premium tarif necha so\'m?' },
        { speaker: 'ai', time: '00:27', text: 'Premium tarifimiz oyiga 199,000 so\'m. Bu tarifda cheksiz qo\'ng\'iroqlar va SMS kiradi.' }
      ],
      waveform: [20, 35, 45, 30, 50, 60, 45, 55, 40, 35, 50, 65, 45, 30, 40, 55, 60, 45, 35, 30],
      sentimentTrajectory: [40, 45, 55, 60, 70, 75, 80, 85]
    },
    {
      id: 2,
      date: '2024-12-18',
      time: '13:15:42',
      duration: '05:23',
      customer: '+998 91 234 56 78',
      sentiment: 'negative',
      sentimentScore: 35,
      purpose: 'Shikoyat',
      aiSummary: 'Mijoz xizmat sifati bo\'yicha shikoyat qildi. AI kechirim so\'radi va muammoni hal qilish uchun texnik yordam bo\'limiga uladi.',
      keyPoints: ['Internet sekinligi', 'Shikoyat', 'Texnik yordam'],
      actionItems: ['Texnik yordam 24 soat ichida aloqaga chiqadi'],
      latency: 1.2,
      cost: 0.09,
      transcript: [
        { speaker: 'customer', time: '00:00', text: 'Mening internetim juda sekin ishlayapti, nima qilish kerak?' },
        { speaker: 'ai', time: '00:02', text: 'Kechirasiz, sizda muammo bor. Tekshirib ko\'raylik...' }
      ],
      waveform: [60, 70, 65, 55, 50, 45, 40, 35, 30, 25, 30, 35, 40, 45, 50, 55, 50, 45, 40, 35],
      sentimentTrajectory: [30, 25, 30, 35, 40, 45, 40, 35]
    },
    {
      id: 3,
      date: '2024-12-18',
      time: '12:08:33',
      duration: '03:12',
      customer: '+998 93 345 67 89',
      sentiment: 'neutral',
      sentimentScore: 60,
      purpose: 'Ma\'lumot olish',
      aiSummary: 'Mijoz ofis manzili va ish vaqtini so\'radi. AI to\'liq ma\'lumot berdi.',
      keyPoints: ['Ofis manzili', 'Ish vaqti'],
      actionItems: [],
      latency: 0.6,
      cost: 0.05,
      transcript: [
        { speaker: 'customer', time: '00:00', text: 'Sizning ofis qayerda joylashgan?' },
        { speaker: 'ai', time: '00:02', text: 'Bizning ofisimiz Toshkent shahrida, Chilonzor tumani...' }
      ],
      waveform: [30, 35, 40, 35, 40, 45, 40, 35, 40, 45, 40, 35, 30, 35, 40, 35, 30, 35, 40, 35],
      sentimentTrajectory: [55, 58, 60, 62, 60, 58, 60, 62]
    }
  ];

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return darkMode ? 'bg-green-500/20' : 'bg-green-100';
      case 'negative': return darkMode ? 'bg-red-500/20' : 'bg-red-100';
      default: return darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100';
    }
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const changeSpeed = () => {
    const speeds = [1, 1.5, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    setPlaybackSpeed(speeds[(currentIndex + 1) % speeds.length]);
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying && selectedCall) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const duration = selectedCall.duration.split(':');
          const totalSeconds = parseInt(duration[0]) * 60 + parseInt(duration[1]);
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed, selectedCall]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredLogs = callLogs.filter(log =>
    log.customer.includes(searchTerm) ||
    log.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-sm`}>
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Qidirish (ism, raqam, maqsad)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 bg-transparent outline-none font-medium ${darkMode ? 'text-gray-100 placeholder:text-gray-500' : 'text-gray-900 placeholder:text-gray-400'}`}
          />
        </div>
        <button className={`px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700' : 'bg-white hover:bg-gray-50 border-gray-200'
          } border shadow-sm`}>
          <Filter size={20} />
          <span>Filtr</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Minimalistic Table */}
        <div className={`overflow-hidden rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b text-xs uppercase tracking-wider ${darkMode ? 'border-gray-700 text-gray-400 bg-gray-800' : 'border-gray-100 text-gray-500 bg-gray-50/50'}`}>
                  <th className="p-4 font-semibold">Mijoz</th>
                  <th className="p-4 font-semibold">Vaqt</th>
                  <th className="p-4 font-semibold">Maqsad</th>
                  <th className="p-4 font-semibold text-center">Holat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredLogs.map(call => (
                  <tr
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className={`group cursor-pointer transition-colors ${selectedCall?.id === call.id
                        ? darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                        : darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                      }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                          <Phone size={16} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                        </div>
                        <div>
                          <div className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{call.customer}</div>
                          <div className="text-xs text-gray-500">ID: #{call.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{call.time}</div>
                      <div className="text-xs text-gray-500">{call.duration}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{call.purpose}</span>
                    </td>
                    <td className="p-4 text-center">
                      <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getSentimentBg(call.sentiment)} ${getSentimentColor(call.sentiment)}`}>
                        {call.sentiment === 'positive' ? 'Ijobiy' : call.sentiment === 'negative' ? 'Salbiy' : 'Neytral'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLogs.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Hech narsa topilmadi
            </div>
          )}
        </div>

        {/* Right Column: Sticky Detail Content */}
        {selectedCall ? (
          <div className="sticky top-24 space-y-4 animate-slide-in-right">
            {/* Audio Player Card */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <Play size={20} className="text-blue-500" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Audio Player</h3>
                    <p className="text-xs text-gray-500">Yozib olingan suhbat</p>
                  </div>
                </div>
                <button className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <Download size={20} />
                </button>
              </div>

              {/* Enhanced Waveform */}
              <div className="mb-6 px-2">
                <div className="flex items-end justify-between h-16 gap-1 mb-2">
                  {selectedCall.waveform.map((height: number, i: number) => (
                    <div key={i} className="flex-1 flex flex-col gap-0.5 group">
                      <div
                        className={`w-full rounded-t-sm transition-all duration-300 ${darkMode ? 'bg-blue-500' : 'bg-blue-500'} opacity-80 group-hover:opacity-100`}
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className={`w-full rounded-b-sm transition-all duration-300 ${darkMode ? 'bg-green-500' : 'bg-green-500'} opacity-60 group-hover:opacity-100`}
                        style={{ height: `${height * 0.6}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex text-[10px] uppercase font-bold tracking-wider text-gray-400 justify-between">
                  <span>AI Agent</span>
                  <span>Mijoz</span>
                </div>
              </div>

              {/* Custom Audio Custom Controls */}
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-xs font-mono text-gray-500">{formatTime(currentTime)}</span>
                  <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-blue-500 rounded-full relative"
                      style={{ width: `${(currentTime / (parseInt(selectedCall.duration.split(':')[0]) * 60 + parseInt(selectedCall.duration.split(':')[1]))) * 100}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform"></div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{selectedCall.duration}</span>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <button className="text-gray-400 hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" /></svg>
                  </button>
                  <button
                    onClick={togglePlayback}
                    className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all ${darkMode ? 'bg-blue-500 text-white shadow-blue-900/30' : 'bg-blue-600 text-white shadow-blue-200'
                      }`}
                  >
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                  </button>
                  <button className="text-gray-400 hover:text-blue-500 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" /></svg>
                  </button>
                </div>
              </div>
            </div>

            {/* AI Analysis Cards */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-1.5 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <ActivityIcon size={18} className="text-purple-500" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Tahlil</h3>
              </div>

              <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-gray-900/50' : 'bg-blue-50/50'}`}>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedCall.aiSummary}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Asosiy Mavzular</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCall.keyPoints.map((point: string, i: number) => (
                      <span key={i} className={`px-3 py-1 rounded-lg text-xs font-medium border ${darkMode
                          ? 'bg-gray-800 border-gray-600 text-gray-300'
                          : 'bg-white border-gray-200 text-gray-600'
                        }`}>
                        #{point}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCall.actionItems.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">Harakatlar rejasi</h4>
                    {selectedCall.actionItems.map((item: string, i: number) => (
                      <div key={i} className={`flex items-start gap-2 p-3 rounded-lg text-sm ${darkMode ? 'bg-green-500/10 text-green-300' : 'bg-green-50 text-green-800'
                        }`}>
                        <div className="mt-0.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sentiment Card */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex justify-between items-center mb-6">
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hissiyotlar</h3>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${getSentimentBg(selectedCall.sentiment)} ${getSentimentColor(selectedCall.sentiment)}`}>
                  {selectedCall.sentimentScore}% {selectedCall.sentiment === 'positive' ? 'Ijobiy' : 'Salbiy'}
                </div>
              </div>

              <div className="relative h-24 flex items-end justify-between gap-1">
                {selectedCall.sentimentTrajectory.map((val: number, i: number) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group">
                    <div
                      className={`w-full rounded-t-sm transition-all hover:opacity-100 opacity-80 ${val >= 60 ? 'bg-green-500' : val <= 40 ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                ))}
                {/* Baseline */}
                <div className={`absolute bottom-0 w-full h-[1px] ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              </div>
            </div>

            {/* Transcript */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Transkripsiya</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {selectedCall.transcript.map((msg: any, i: number) => (
                  <div key={i} className={`flex gap-3 ${msg.speaker === 'customer' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.speaker === 'ai'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                      }`}>
                      {msg.speaker === 'ai' ? 'AI' : <Phone size={14} />}
                    </div>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.speaker === 'ai'
                        ? darkMode ? 'bg-blue-500/20 text-blue-100 rounded-tl-none' : 'bg-blue-50 text-blue-900 rounded-tl-none'
                        : darkMode ? 'bg-gray-700 text-gray-200 rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tr-none'
                      }`}>
                      <p>{msg.text}</p>
                      <span className="text-[10px] opacity-60 mt-1 block">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className={`h-96 rounded-2xl border border-dashed flex items-center justify-center flex-col gap-4 ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
            }`}>
            <div className={`p-4 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <ActivityIcon className="text-gray-400" size={32} />
            </div>
            <p className="text-gray-500 font-medium">Batafsil ma'lumot ko'rish uchun qo'ng'iroqni tanlang</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallLogsContent;