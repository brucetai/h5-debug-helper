'use client'

import { useState } from 'react'
import { PaymentAutoFill } from '../components/PaymentAutoFill'
import { PaymentMethodSelector } from '../components/PaymentMethodSelector'
import { GamePaymentDemo } from '../components/GamePaymentDemo'
import { ButtonDemo } from '../components/ButtonDemo'

interface Session {
  id: string
  name: string
  gameUrl: string
  status: 'active' | 'paused' | 'stopped'
  players: number
  startTime: Date
  analysisType: 'game' | 'resource'
}

interface FileResource {
  id: string
  fileName: string
  status: number
  contentType: string
  compression: string
  cache: string
  size: string
  time: string
  url: string
}

interface PerformanceMetric {
  timestamp: Date
  fps: number
  memory: number
  cpu: number
  diskIO: number
}

export default function Home() {
  // 核心功能標籤狀態
  const [activeTab, setActiveTab] = useState<'download' | 'resource' | 'session' | 'payment'>('download')
  
  // 會話相關狀態
  const [activeSessionId, setActiveSessionId] = useState('slime')
  const [gameUrl, setGameUrl] = useState('https://h5.stg.g123.jp/game/slime?lang=ja')
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  
  // Session Management State
  const [sessions] = useState<Session[]>([
    {
      id: 'slime',
      name: '遊戲分析',
      gameUrl: 'https://slime.stg.g123-cpp.com/slime/index.html',
      status: 'active',
      players: 2,
      startTime: new Date(Date.now() - 300000),
      analysisType: 'game'
    },
    {
      id: 'resource',
      name: '資源分析', 
      gameUrl: 'https://h5.stg.g123.jp/game/example',
      status: 'active',
      players: 1,
      startTime: new Date(Date.now() - 600000),
      analysisType: 'resource'
    },
    {
      id: 'kumo',
      name: '蜘蛛測試',
      gameUrl: 'https://h5.stg.g123.jp/game/kumo',
      status: 'paused',
      players: 3,
      startTime: new Date(Date.now() - 180000),
      analysisType: 'game'
    }
  ])

  // Performance monitoring data
  const [performanceMetrics] = useState<PerformanceMetric[]>([
    { timestamp: new Date(Date.now() - 300000), fps: 60, memory: 85.4, cpu: 23.1, diskIO: 12.3 },
    { timestamp: new Date(Date.now() - 240000), fps: 58, memory: 92.1, cpu: 28.7, diskIO: 15.6 },
    { timestamp: new Date(Date.now() - 180000), fps: 60, memory: 88.9, cpu: 25.4, diskIO: 11.2 },
    { timestamp: new Date(Date.now() - 120000), fps: 57, memory: 95.2, cpu: 32.1, diskIO: 18.4 },
    { timestamp: new Date(Date.now() - 60000), fps: 60, memory: 90.3, cpu: 26.8, diskIO: 13.7 }
  ])

  // Mock resource data
  const [resources] = useState<FileResource[]>([
    {
      id: '1',
      fileName: 'b115a422-3b77-415d-b9d5-40010a6dff2d.b9db4.webp',
      status: 200,
      contentType: 'binary/octet-stream',
      compression: '-',
      cache: 'RefreshHit',
      size: '3.89 MB',
      time: '6634ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '2', 
      fileName: 'font_ssb_kt.ttf',
      status: 200,
      contentType: 'binary/octet-stream',
      compression: '-',
      cache: 'Hit',
      size: '2.76 MB',
      time: '3031ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '3',
      fileName: 'ac6913f1-9608-4dc8-9d23-e27e2dbb6eb6.bca1.webp',
      status: 200,
      contentType: 'binary/octet-stream', 
      compression: '-',
      cache: 'RefreshHit',
      size: '1.88 MB',
      time: '4883ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '4',
      fileName: 'c850ab78-0774-4dae-a49b-6aee0900d410.24b09.webp',
      status: 200,
      contentType: 'binary/octet-stream',
      compression: '-', 
      cache: 'RefreshHit',
      size: '1.59 MB',
      time: '1361ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '5',
      fileName: '1ffe1067-eaa1-4647-9351-55ac2c6bf90a.a0799.bin',
      status: 200,
      contentType: 'text/plain',
      compression: 'gzip',
      cache: 'RefreshHit', 
      size: '1.21 MB',
      time: '1546ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    }
  ])

  const activeSession = sessions.find(s => s.id === activeSessionId)
  const latestMetrics = performanceMetrics[performanceMetrics.length - 1]

  const handleStartAnalysis = () => {
    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => setIsAnalyzing(false), 2000)
  }

  const handlePaymentComplete = (paymentData: {
    cardNumber: string
    cardHolder: string
    expiryDate: string
    cvv: string
    amount: string
    currency: string
    merchantId: string
    transactionId: string
  }) => {
    console.log('Payment completed:', paymentData)
    // 可以在这里添加支付完成后的处理逻辑
  }

  // Calculate statistics
  const totalRequests = 135
  const totalSize = '17.27 MB'
  const totalTime = '21.61s'

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'stopped': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }



  const tabs = [
    { id: 'download', name: '下載性能分析', icon: '📥' },
    { id: 'resource', name: '資源使用監控', icon: '📊' },
    { id: 'session', name: '會話管理', icon: '🔄' },
    { id: 'payment', name: '支付自動填入', icon: '💳' }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-center">H5 Helper</h1>
        </div>
      </header>

      {/* 主要內容區域 */}
      <div className="flex h-[calc(100vh-120px)]">

        {/* 左側遊戲區域 */}
        <div className="w-2/3 bg-white mr-4">
          {/* 遊戲畫面頂部控制欄 */}
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <input
                  type="url"
                  value={activeSession?.gameUrl || gameUrl}
                  onChange={(e) => setGameUrl(e.target.value)}
                  placeholder="https://h5.stg.g123.jp/game/slime?lang=ja"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-80"
                  onKeyPress={(e) => e.key === 'Enter' && handleStartAnalysis()}
                />
                <button
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? '分析中...' : '開始'}
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">執行中</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 遊戲畫面主區域 */}
          <div className="relative bg-gray-50 h-80">
            {/* 遊戲 iframe 容器 */}
            <div className="absolute inset-4 bg-white rounded-lg border-2 border-red-500 shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
                <div className="text-sm font-medium truncate">
                  {activeSession?.gameUrl || gameUrl}
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(activeSession?.status || 'active')}`}></div>
                  <span className="text-xs">
                    {activeSession?.status === 'active' ? '執行中' : 
                     activeSession?.status === 'paused' ? '暫停' : '停止'}
                  </span>
                </div>
              </div>
              
              {/* 遊戲畫面內容 */}
              <div className="relative h-full bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">🎮</div>
                    <div className="text-lg font-medium mb-1">遊戲畫面預覽</div>
                    <div className="text-sm">
                      {activeSession?.name || '遊戲分析'}
                    </div>
                  </div>
                </div>
                
                {/* 模擬遊戲截圖 */}
                <div className="absolute inset-4 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-lg opacity-20"></div>
                
                {/* 遊戲狀態資訊 */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black bg-opacity-50 text-white p-2 rounded text-sm">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <div className="font-bold text-green-400">FPS: {latestMetrics.fps}</div>
                        <div className="text-xs text-gray-300">影格率</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-400">{latestMetrics.memory.toFixed(1)}MB</div>
                        <div className="text-xs text-gray-300">記憶體</div>
                      </div>
                      <div>
                        <div className="font-bold text-orange-400">{latestMetrics.cpu.toFixed(1)}%</div>
                        <div className="text-xs text-gray-300">CPU</div>
                      </div>
                      <div>
                        <div className="font-bold text-purple-400">{totalTime}</div>
                        <div className="text-xs text-gray-300">載入時間</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右側功能區域 */}
        <div className="w-1/3 bg-white rounded-lg shadow-lg">
          {/* 功能標籤頁 */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'download' | 'resource' | 'session' | 'payment')}
                  className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span>{tab.icon}</span>
                    <span className="hidden lg:inline">{tab.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 功能內容區域 */}
          <div className="h-[calc(100vh-220px)] overflow-y-auto">
            
            {/* 下載性能分析 */}
            {activeTab === 'download' && (
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">📥 下載性能分析</h2>
                  <p className="text-sm text-gray-600">文件下載監控、統計、快取分析</p>
                </div>

                {/* 統計概覽 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{totalRequests}</div>
                    <div className="text-sm text-gray-600">總請求數</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{totalSize}</div>
                    <div className="text-sm text-gray-600">總大小</div>
                  </div>
                </div>

                {/* 快取分析 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-3">快取分析</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">快取命中率:</span>
                      <span className="text-sm font-semibold text-blue-800">68%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Service Worker:</span>
                      <span className="text-sm font-semibold text-blue-800">啟用</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">CDN 狀態:</span>
                      <span className="text-sm font-semibold text-blue-800">正常</span>
                    </div>
                  </div>
                </div>

                {/* 壓縮分析 */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">壓縮分析</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Gzip 壓縮:</span>
                      <span className="text-sm font-semibold text-green-800">23% 檔案</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">可節省:</span>
                      <span className="text-sm font-semibold text-green-800">10.36 MB</span>
                    </div>
                    <div className="text-sm text-green-700">• 建議啟用 Brotli 壓縮</div>
                  </div>
                </div>

                {/* 檔案列表 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">檔案列表</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-800">
                      查看全部
                    </button>
                  </div>
                  <div className="space-y-2">
                    {resources.slice(0, 3).map((resource) => (
                      <div key={resource.id} className="bg-white p-3 rounded border">
                        <div className="text-sm font-medium text-blue-600 truncate mb-1">
                          {resource.fileName}
                        </div>
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>{resource.size}</span>
                          <span>{resource.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 資源使用監控 */}
            {activeTab === 'resource' && (
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">📊 資源使用監控</h2>
                  <p className="text-sm text-gray-600">性能異常檢測、內存/CPU趨勢監控</p>
                </div>

                {/* 改善建議總結 */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">📋 改善建議</h3>
                  <div className="space-y-3 text-sm">
                    <div className="text-gray-700">
                      <strong>目前加載資源數量：</strong> 135 個，總大小 17.27 MB，經過時間 21.61s
                    </div>
                    <div className="text-orange-700">
                      <strong>這些檔案類型沒有配置 CDN 緩存：</strong> webp, bin, ttf, json, wasm, cconb
                    </div>
                    <div className="text-orange-700">
                      <strong>這些檔案類型沒有 gzip 壓縮，請在上傳時配置 content-type：</strong> ttf, manifest 📋
                    </div>
                  </div>
                </div>

                {/* 即時性能指標 */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{latestMetrics.fps}</div>
                    <div className="text-sm text-gray-600">FPS</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{latestMetrics.memory.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">記憶體(MB)</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">{latestMetrics.cpu.toFixed(1)}%</div>
                    <div className="text-sm text-gray-600">CPU</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">{latestMetrics.diskIO.toFixed(1)}</div>
                    <div className="text-sm text-gray-600">磁碟 I/O</div>
                  </div>
                </div>

                {/* 性能趨勢圖 */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">性能趨勢監控</h3>
                  <div className="h-32 bg-white rounded flex items-center justify-center border">
                    <div className="text-center text-gray-500">
                      <div className="text-3xl mb-2">📈</div>
                      <div className="text-sm">即時性能圖表</div>
                      <div className="text-xs text-gray-400">FPS: 57-60 | 記憶體: 85-95MB | CPU: 23-32%</div>
                    </div>
                  </div>
                </div>

                {/* 異常檢測 */}
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-800 mb-3">⚠️ 性能異常檢測</h3>
                  <div className="space-y-2 text-sm text-yellow-700">
                    <div>• 檢測到 FPS 偶爾下降至 57</div>
                    <div>• 記憶體使用量呈上升趨勢</div>
                    <div>• CPU 使用率峰值達 32%</div>
                    <div>• 磁碟 I/O 活動正常</div>
                  </div>
                </div>

                {/* 優化建議 */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-3">💡 優化建議</h3>
                  <div className="space-y-2 text-sm text-green-700">
                    <div>• 建議啟用 requestAnimationFrame</div>
                    <div>• 考慮使用 Web Workers</div>
                    <div>• 實作物件池模式</div>
                    <div>• 啟用紋理壓縮</div>
                  </div>
                </div>
              </div>
            )}

            {/* 會話管理 */}
            {activeTab === 'session' && (
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">🔄 會話管理</h2>
                  <p className="text-sm text-gray-600">單/多會話切換、資料隔離、狀態同步</p>
                </div>

                {/* 會話列表 */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800">會話列表</h3>
                  {sessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => setActiveSessionId(session.id)}
                      className={`w-full p-4 rounded-lg border transition-colors text-left ${
                        activeSessionId === session.id
                          ? 'bg-blue-50 border-blue-200 text-blue-900'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{session.name}</span>
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`}></div>
                      </div>
                      <div className="text-sm text-gray-600">
                        玩家: {session.players} | 運行: {Math.floor((Date.now() - session.startTime.getTime()) / 60000)}分鐘
                      </div>
                    </button>
                  ))}
                </div>

                {/* 會話詳情 */}
                {activeSession && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-800">會話詳情</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">會話 ID:</span>
                          <span className="text-sm font-semibold">{activeSession.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">狀態:</span>
                          <span className={`text-sm font-semibold ${
                            activeSession.status === 'active' ? 'text-green-600' : 
                            activeSession.status === 'paused' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {activeSession.status === 'active' ? '執行中' : 
                             activeSession.status === 'paused' ? '暫停' : '停止'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">運行時間:</span>
                          <span className="text-sm font-semibold">
                            {Math.floor((Date.now() - activeSession.startTime.getTime()) / 60000)} 分鐘
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">玩家數:</span>
                          <span className="text-sm font-semibold">{activeSession.players}</span>
                        </div>
                      </div>
                    </div>

                    {/* 狀態同步 */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-3">🔄 狀態同步</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">資料隔離:</span>
                          <span className="text-sm font-semibold text-blue-800">✓ 已啟用</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">即時同步:</span>
                          <span className="text-sm font-semibold text-blue-800">✓ 正常</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-700">快照備份:</span>
                          <span className="text-sm font-semibold text-blue-800">✓ 每 30 秒</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 支付自动填入 */}
            {activeTab === 'payment' && (
              <div className="p-6 space-y-6">
                {/* 原始支付组件 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">原始支付组件</h3>
                  <PaymentAutoFill 
                    isActive={true}
                    onPaymentComplete={handlePaymentComplete}
                  />
                </div>
                
                {/* 新的支付方式选择器 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">改进版支付组件</h3>
                  <PaymentMethodSelector
                    amount="100"
                    currency="JPY"
                    onPaymentComplete={(method, data) => {
                      console.log('Payment completed with method:', method, data)
                      handlePaymentComplete(data)
                    }}
                  />
                </div>
                
                {/* 游戏支付演示 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">游戏支付演示</h3>
                  <GamePaymentDemo />
                </div>
                
                {/* 按钮设计演示 */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">按钮设计演示</h3>
                  <ButtonDemo />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
