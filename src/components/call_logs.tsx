import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Search, Download, Filter } from 'lucide-react';

interface CallLogsContentProps {
  darkMode: boolean;
}

const CallLogsContent: React.FC<CallLogsContentProps> = ({ darkMode }) => {
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  // variable audioRef is designated but not used in the original code logic, keeping it for compatibility
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
        <div className={`flex-1 flex items-center gap-3 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 bg-transparent outline-none ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
          />
        </div>
        <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Call Logs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Qo'ng'iroqlar jurnali</h2>
          {filteredLogs.map(call => (
            <div
              key={call.id}
              onClick={() => setSelectedCall(call)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${selectedCall?.id === call.id
                  ? darkMode ? 'bg-blue-600' : 'bg-blue-500 text-white'
                  : darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="font-medium">{call.customer}</div>
                  <div className={`text-sm ${selectedCall?.id === call.id ? 'text-blue-100' : 'text-gray-400'}`}>
                    {call.date} • {call.time}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${selectedCall?.id === call.id
                    ? 'bg-white/20'
                    : getSentimentBg(call.sentiment)
                  } ${selectedCall?.id === call.id ? 'text-white' : getSentimentColor(call.sentiment)}`}>
                  {call.sentiment === 'positive' ? 'Ijobiy' : call.sentiment === 'negative' ? 'Salbiy' : 'Neytral'}
                </div>
              </div>
              <div className={`text-sm ${selectedCall?.id === call.id ? 'text-blue-100' : 'text-gray-500'}`}>
                {call.purpose} • {call.duration}
              </div>
            </div>
          ))}
        </div>

        {/* Call Details */}
        {selectedCall && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between mb-6">
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Audio Player</h3>
                <button className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  <Download size={18} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
                </button>
              </div>

              {/* Waveform */}
              <div className="mb-4">
                <div className="flex items-end justify-between h-20 gap-1 mb-2">
                  {selectedCall.waveform.map((height: number, i: number) => (
                    <div key={i} className="flex-1 flex flex-col gap-1">
                      <div
                        className="bg-blue-500 rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <div
                        className="bg-green-500 rounded-b"
                        style={{ height: `${height * 0.8}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex text-xs text-gray-400 justify-between">
                  <span>AI Agent</span>
                  <span>Customer</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="space-y-3">
                <div className={`h-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${(currentTime / (parseInt(selectedCall.duration.split(':')[0]) * 60 + parseInt(selectedCall.duration.split(':')[1]))) * 100}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{selectedCall.duration}</span>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={togglePlayback}
                    className={`p-3 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  <button
                    onClick={changeSpeed}
                    className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Xulosa</h3>
              <p className="text-sm text-gray-400 mb-4">{selectedCall.aiSummary}</p>

              <div className="space-y-3">
                <div>
                  <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Asosiy fikrlar:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedCall.keyPoints.map((point: string, i: number) => (
                      <span key={i} className={`px-3 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                        {point}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCall.actionItems.length > 0 && (
                  <div>
                    <div className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Keyingi qadamlar:</div>
                    {selectedCall.actionItems.map((item: string, i: number) => (
                      <div key={i} className={`px-3 py-2 rounded-lg text-sm ${darkMode ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Hissiyot tahlili</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCall.sentimentScore}%</div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentBg(selectedCall.sentiment)} ${getSentimentColor(selectedCall.sentiment)}`}>
                  {selectedCall.sentiment === 'positive' ? 'Ijobiy' : selectedCall.sentiment === 'negative' ? 'Salbiy' : 'Neytral'}
                </div>
              </div>

              <div className="h-20 flex items-end gap-2">
                {selectedCall.sentimentTrajectory.map((value: number, i: number) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className={`w-full rounded-t transition-all ${value > 60 ? 'bg-green-500' : value < 40 ? 'bg-red-500' : 'bg-yellow-500'
                        }`}
                      style={{ height: `${value}%` }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>Boshlang'ich</span>
                <span>Yakuniy</span>
              </div>
            </div>

            {/* Metadata */}
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Texnik ma'lumotlar</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-400">Javob vaqti</div>
                  <div className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedCall.latency}s</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400">Xarajat</div>
                  <div className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>${selectedCall.cost}</div>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>To'liq transkripsiya</h3>
              <div className="space-y-3">
                {selectedCall.transcript.map((item: any, i: number) => (
                  <div key={i} className="flex gap-3">
                    <div className={`text-xs ${item.speaker === 'ai' ? 'text-blue-400' : 'text-green-400'} font-mono w-12 flex-shrink-0`}>
                      {item.time}
                    </div>
                    <div className={`flex-1 p-3 rounded-lg ${item.speaker === 'ai'
                        ? darkMode ? 'bg-blue-500/10' : 'bg-blue-50'
                        : darkMode ? 'bg-green-500/10' : 'bg-green-50'
                      }`}>
                      <div className={`text-xs font-medium mb-1 ${item.speaker === 'ai' ? 'text-blue-400' : 'text-green-400'}`}>
                        {item.speaker === 'ai' ? 'AI Agent' : 'Customer'}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{item.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CallLogsContent;