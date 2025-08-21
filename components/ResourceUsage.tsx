'use client'

import { useState, useEffect } from 'react'

interface PerformanceData {
  timestamp: Date
  cpu: number
  memory: number
  fps: number
  diskRead: number
  diskWrite: number
}

interface PerformanceAlert {
  id: string
  type: 'cpu' | 'memory' | 'fps' | 'disk'
  message: string
  severity: 'low' | 'medium' | 'high'
  timestamp: Date
}

export function ResourceUsage() {
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [alerts, setAlerts] = useState<PerformanceAlert[]>([
    {
      id: '1',
      type: 'memory',
      message: '記憶體使用量激增 (+45% 在過去 30 秒)',
      severity: 'high',
      timestamp: new Date(Date.now() - 30000)
    },
    {
      id: '2',
      type: 'fps',
      message: 'FPS 下降到 28fps，低於目標 30fps',
      severity: 'medium',
      timestamp: new Date(Date.now() - 60000)
    }
  ])

  const [currentMetrics] = useState({
    cpu: 65,
    memory: 78,
    fps: 45,
    diskRead: 12.5,
    diskWrite: 8.3,
    memoryUsage: 256, // MB
    totalMemory: 512, // MB
    activeConnections: 15,
    longTasks: 3
  })

  // Generate mock performance data
  useEffect(() => {
    const generateData = () => {
      const now = new Date()
      const data: PerformanceData[] = []
      
      for (let i = 59; i >= 0; i--) {
        data.push({
          timestamp: new Date(now.getTime() - i * 1000),
          cpu: Math.random() * 40 + 30 + (i < 10 ? Math.random() * 30 : 0), // Spike in recent data
          memory: Math.random() * 20 + 60 + (i < 15 ? Math.random() * 20 : 0), // Memory spike
          fps: Math.random() * 20 + 40 - (i < 20 ? Math.random() * 15 : 0), // FPS drop
          diskRead: Math.random() * 10 + 5,
          diskWrite: Math.random() * 8 + 3
        })
      }
      
      setPerformanceData(data)
    }

    generateData()
    const interval = setInterval(generateData, 5000)
    return () => clearInterval(interval)
  }, [])

  const getAlertColor = (severity: PerformanceAlert['severity']) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/10'
      case 'medium': return 'border-yellow-500 bg-yellow-500/10'
      case 'low': return 'border-blue-500 bg-blue-500/10'
    }
  }

  const getAlertIcon = (type: PerformanceAlert['type']) => {
    switch (type) {
      case 'cpu': return '⚡'
      case 'memory': return '🧠'
      case 'fps': return '🎮'
      case 'disk': return '💾'
    }
  }

  const formatSize = (mb: number) => {
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)}GB`
    return `${mb.toFixed(1)}MB`
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(alerts.filter(a => a.id !== alertId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Resource Usage</h1>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-300">
            監控間隔: <span className="text-white">1s</span>
          </div>
          <div className="text-sm text-gray-300">
            數據保留: <span className="text-white">60s</span>
          </div>
        </div>
      </div>

      {/* Performance Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white">⚠️ 效能告警</h2>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`border rounded-lg p-4 ${getAlertColor(alert.severity)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{getAlertIcon(alert.type)}</span>
                  <div>
                    <div className="text-white font-medium">{alert.message}</div>
                    <div className="text-sm text-gray-400">
                      {alert.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Current Metrics */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">CPU 使用率</div>
            <div className="text-xl">⚡</div>
          </div>
          <div className="text-2xl font-bold text-white">{currentMetrics.cpu}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${
                currentMetrics.cpu > 80 ? 'bg-red-600' : 
                currentMetrics.cpu > 60 ? 'bg-yellow-600' : 'bg-green-600'
              }`}
              style={{ width: `${currentMetrics.cpu}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            長任務: {currentMetrics.longTasks}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">記憶體使用</div>
            <div className="text-xl">🧠</div>
          </div>
          <div className="text-2xl font-bold text-white">{currentMetrics.memory}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${
                currentMetrics.memory > 85 ? 'bg-red-600' : 
                currentMetrics.memory > 70 ? 'bg-yellow-600' : 'bg-green-600'
              }`}
              style={{ width: `${currentMetrics.memory}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {formatSize(currentMetrics.memoryUsage)} / {formatSize(currentMetrics.totalMemory)}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">FPS</div>
            <div className="text-xl">🎮</div>
          </div>
          <div className="text-2xl font-bold text-white">{currentMetrics.fps}</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${
                currentMetrics.fps < 30 ? 'bg-red-600' : 
                currentMetrics.fps < 50 ? 'bg-yellow-600' : 'bg-green-600'
              }`}
              style={{ width: `${Math.min(currentMetrics.fps, 60) / 60 * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            目標: 60fps
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-400">磁碟 I/O</div>
            <div className="text-xl">💾</div>
          </div>
          <div className="text-xl font-bold text-white">
            {currentMetrics.diskRead.toFixed(1)}MB/s
          </div>
          <div className="text-sm text-gray-400">
            寫入: {currentMetrics.diskWrite.toFixed(1)}MB/s
          </div>
          <div className="text-xs text-gray-500 mt-1">
            連線數: {currentMetrics.activeConnections}
          </div>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* CPU & Memory Chart */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">CPU & 記憶體趨勢</h2>
          </div>
          <div className="p-4">
            {/* Mock Chart Area */}
            <div className="h-64 bg-gray-900 rounded-lg relative overflow-hidden">
              {/* Chart Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {/* CPU Line */}
                <polyline
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  points={performanceData.map((d, i) => 
                    `${(i / (performanceData.length - 1)) * 100}%,${100 - d.cpu}%`
                  ).join(' ')}
                />
                {/* Memory Line */}
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="2"
                  points={performanceData.map((d, i) => 
                    `${(i / (performanceData.length - 1)) * 100}%,${100 - d.memory}%`
                  ).join(' ')}
                />
              </svg>
              
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-rows-4 border-gray-700">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="border-b border-gray-700"></div>
                ))}
              </div>
              
              {/* Labels */}
              <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                60s前
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                現在
              </div>
              <div className="absolute top-2 left-2 text-xs text-gray-400">
                100%
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-sm text-gray-300">CPU</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-300">記憶體</span>
              </div>
            </div>
          </div>
        </div>

        {/* FPS & I/O Chart */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">FPS & 磁碟 I/O</h2>
          </div>
          <div className="p-4">
            {/* Mock Chart Area */}
            <div className="h-64 bg-gray-900 rounded-lg relative overflow-hidden">
              {/* Chart Lines */}
              <svg className="absolute inset-0 w-full h-full">
                {/* FPS Line */}
                <polyline
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  points={performanceData.map((d, i) => 
                    `${(i / (performanceData.length - 1)) * 100}%,${100 - (d.fps / 60 * 100)}%`
                  ).join(' ')}
                />
                {/* Disk Read Line */}
                <polyline
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  points={performanceData.map((d, i) => 
                    `${(i / (performanceData.length - 1)) * 100}%,${100 - (d.diskRead / 20 * 100)}%`
                  ).join(' ')}
                />
              </svg>
              
              {/* Grid Lines */}
              <div className="absolute inset-0 grid grid-rows-4 border-gray-700">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="border-b border-gray-700"></div>
                ))}
              </div>
              
              {/* Labels */}
              <div className="absolute bottom-2 left-2 text-xs text-gray-400">
                60s前
              </div>
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                現在
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                <span className="text-sm text-gray-300">FPS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-sm text-gray-300">磁碟讀取</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">效能分析與建議</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">突然變慢原因</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 記憶體洩漏檢測中 - 疑似 DOM 節點累積</li>
              <li>• 長任務識別: 主執行緒阻塞 2.3s</li>
              <li>• 資源競爭: 同時載入多個大檔案</li>
              <li>• GC 壓力: 垃圾回收頻率過高</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">記憶體分析</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 堆記憶體: {formatSize(198)}</li>
              <li>• DOM 節點: 1,847 個</li>
              <li>• 事件監聽器: 234 個</li>
              <li>• 成長趨勢: +12MB/分鐘</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">優化建議</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 啟用圖片延遲載入</li>
              <li>• 優化 JavaScript 執行</li>
              <li>• 減少 DOM 操作頻率</li>
              <li>• 考慮使用 Web Worker</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Storage Analysis */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">儲存空間分析</h2>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-900 p-3 rounded">
            <div className="text-sm text-gray-400 mb-1">LocalStorage</div>
            <div className="text-lg font-semibold text-white">2.4MB</div>
            <div className="text-xs text-gray-500">限額: 5MB</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
              <div className="bg-blue-600 h-1 rounded-full" style={{ width: '48%' }}></div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-3 rounded">
            <div className="text-sm text-gray-400 mb-1">IndexedDB</div>
            <div className="text-lg font-semibold text-white">18.7MB</div>
            <div className="text-xs text-gray-500">限額: 無限制</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
              <div className="bg-green-600 h-1 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-3 rounded">
            <div className="text-sm text-gray-400 mb-1">快取存儲</div>
            <div className="text-lg font-semibold text-white">45.1MB</div>
            <div className="text-xs text-gray-500">Service Worker</div>
            <div className="w-full bg-gray-700 rounded-full h-1 mt-1">
              <div className="bg-purple-600 h-1 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 