import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Search, Download, Filter, Phone, Clock, Calendar as CalendarIcon, Activity as ActivityIcon, ArrowLeft, ChevronRight, Share2, MoreVertical } from 'lucide-react';

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

  // DETAIL VIEW
  if (selectedCall) {
    return (
      <div className="space-y-6 animate-fade-in">
        {/* Detail Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedCall(null)}
              className={`p-2 rounded-xl transition-colors ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCall.customer}</h2>
                <div className={`px-3 py-0.5 rounded-full text-xs font-bold ${getSentimentBg(selectedCall.sentiment)} ${getSentimentColor(selectedCall.sentiment)}`}>
                  {selectedCall.sentiment === 'positive' ? 'Ijobiy' : selectedCall.sentiment === 'negative' ? 'Salbiy' : 'Neytral'}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><CalendarIcon size={14} /> {selectedCall.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {selectedCall.time}</span>
                <span>• ID: #{selectedCall.id}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
              <Share2 size={18} className="text-gray-500" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Ulashish</span>
            </button>
            <button className={`p-2 rounded-xl border ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}`}>
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Player Card */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Audio Yozuv</h3>
                <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                  <Download size={20} />
                </button>
              </div>

              <div className="mb-6 px-1">
                <div className="flex items-end justify-between h-24 gap-1 mb-2">
                  {selectedCall.waveform.map((height: number, i: number) => (
                    <div key={i} className="flex-1 flex flex-col gap-0.5">
                      <div
                        className={`w-full rounded-full transition-all duration-300 ${darkMode ? 'bg-blue-500' : 'bg-blue-500'} opacity-80`}
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className={`w-full rounded-full transition-all duration-300 ${darkMode ? 'bg-green-500' : 'bg-green-500'} opacity-60`}
                        style={{ height: `${height * 0.6}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 rounded-xl flex items-center gap-4 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50'}`}>
                <button
                  onClick={togglePlayback}
                  className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex-shrink-0 ${darkMode ? 'bg-blue-500 text-white shadow-blue-900/30' : 'bg-blue-600 text-white shadow-blue-200'
                    }`}
                >
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>

                <div className="flex-1">
                  <div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
                    <span>{formatTime(currentTime)}</span>
                    <span>{selectedCall.duration}</span>
                  </div>
                  <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div
                      className="h-full bg-blue-500 rounded-full relative"
                      style={{ width: `${(currentTime / (parseInt(selectedCall.duration.split(':')[0]) * 60 + parseInt(selectedCall.duration.split(':')[1]))) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={changeSpeed}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-sm border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}
                >
                  {playbackSpeed}x
                </button>
              </div>
            </div>

            {/* Transcript */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Transkripsiya</h3>
              <div className="space-y-6">
                {selectedCall.transcript.map((msg: any, i: number) => (
                  <div key={i} className={`flex gap-4 ${msg.speaker === 'customer' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.speaker === 'ai'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                      }`}>
                      {msg.speaker === 'ai' ? 'AI' : <Phone size={16} />}
                    </div>
                    <div className={`max-w-[80%]`}>
                      <div className={`flex items-center gap-2 mb-1 ${msg.speaker === 'customer' ? 'flex-row-reverse' : ''}`}>
                        <span className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {msg.speaker === 'ai' ? 'AI Assistant' : 'Mijoz'}
                        </span>
                        <span className="text-xs text-gray-500">{msg.time}</span>
                      </div>
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.speaker === 'ai'
                          ? darkMode ? 'bg-blue-500/10 text-blue-100 rounded-tl-none' : 'bg-blue-50 text-blue-900 rounded-tl-none'
                          : darkMode ? 'bg-gray-700 text-gray-200 rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tr-none'
                        }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (1/3 width) - Analysis */}
          <div className="space-y-6">
            {/* AI Analysis Cards */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <ActivityIcon size={20} className="text-purple-500" />
                </div>
                <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Tahlil</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Xulosa</h4>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {selectedCall.aiSummary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Asosiy Mavzular</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCall.keyPoints.map((point: string, i: number) => (
                      <span key={i} className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${darkMode
                          ? 'bg-gray-900/50 border-gray-600 text-gray-300'
                          : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}>
                        #{point}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCall.actionItems.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">Harakatlar rejasi</h4>
                    <div className="space-y-2">
                      {selectedCall.actionItems.map((item: string, i: number) => (
                        <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${darkMode ? 'bg-green-500/10 text-green-300' : 'bg-green-50 text-green-800'
                          }`}>
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sentiment Card */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hissiyotlar Dinamikasi</h3>

              <div className="flex items-center gap-4 mb-6">
                <div className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCall.sentimentScore}%</div>
                <div className="flex-1">
                  <div className={`h-2 rounded-full overflow-hidden mb-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className={`h-full ${getSentimentBg(selectedCall.sentiment).replace('/20', '')} ${selectedCall.sentiment === 'positive' ? 'bg-green-500' : selectedCall.sentiment === 'negative' ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${selectedCall.sentimentScore}%` }} />
                  </div>
                  <div className="text-xs text-gray-500 text-right">Umumiy ijobiy ko'rsatkich</div>
                </div>
              </div>

              <div className="relative h-32 w-full flex items-end justify-between gap-1.5">
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

            {/* Technical Info */}
            <div className={`p-6 rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h3 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Texnik Ma'lumotlar</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500">Javob vaqti (Latency)</span>
                  <span className={`font-mono font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCall.latency}s</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-500">Xarajat</span>
                  <span className={`font-mono font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCall.cost}$</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Kanal</span>
                  <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>SIP Trunk / UDP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
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

      <div className={`overflow-hidden rounded-2xl border shadow-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs uppercase tracking-wider ${darkMode ? 'border-gray-700 text-gray-400 bg-gray-900/50' : 'border-gray-100 text-gray-500 bg-gray-50/50'}`}>
                <th className="p-4 font-semibold">Mijoz</th>
                <th className="p-4 font-semibold">Vaqt & Davomiylik</th>
                <th className="p-4 font-semibold">Maqsad</th>
                <th className="p-4 font-semibold">Xulosa</th>
                <th className="p-4 font-semibold text-center">Holat</th>
                <th className="p-4 font-semibold text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredLogs.map(call => (
                <tr
                  key={call.id}
                  onClick={() => setSelectedCall(call)}
                  className={`group cursor-pointer transition-colors ${darkMode ? 'hover:bg-gray-700/50' : 'hover:bg-blue-50/50'
                    }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{call.customer}</div>
                        <div className="text-xs text-gray-500">ID: #{call.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{call.time}</div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock size={12} />
                      {call.duration}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{call.purpose}</span>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="text-xs text-gray-500 truncate">{call.aiSummary}</p>
                  </td>
                  <td className="p-4 text-center">
                    <div className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${getSentimentBg(call.sentiment)} ${getSentimentColor(call.sentiment)}`}>
                      {call.sentimentScore}%
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-gray-400`}>
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLogs.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search size={24} className="opacity-50" />
            </div>
            <p>Hech narsa topilmadi</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallLogsContent;