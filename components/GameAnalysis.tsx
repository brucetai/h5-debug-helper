'use client'

import { useState, useEffect } from 'react'

interface GameAnalysisProps {
  gameUrl: string
  isAnalyzing: boolean
}

export function GameAnalysis({ gameUrl, isAnalyzing }: GameAnalysisProps) {
  const [gameLoaded, setGameLoaded] = useState(false)
  const [performanceData] = useState({
    fps: 60,
    memory: 85.4,
    cpu: 23.1,
    loadTime: 3.2,
    networkRequests: 45
  })

  useEffect(() => {
    if (isAnalyzing) {
      setGameLoaded(false)
      setTimeout(() => setGameLoaded(true), 1500)
    }
  }, [isAnalyzing])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Side - Game Preview */}
      <div className="space-y-4">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">遊戲預覽</h3>
          </div>
          
          <div className="aspect-video bg-gray-100 relative">
            {isAnalyzing ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">載入中...</p>
                </div>
              </div>
            ) : gameLoaded ? (
              <iframe
                src={gameUrl}
                className="w-full h-full"
                title="Game Preview"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
                    🎮
                  </div>
                  <p>點擊開始按鈕載入遊戲</p>
                </div>
              </div>
            )}
          </div>

          {gameLoaded && (
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">URL:</span>
                <span className="text-blue-600 truncate ml-2">{gameUrl}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Game Analysis Data */}
      <div className="space-y-4">
        {/* Performance Metrics */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-medium text-gray-900 mb-4">性能指標</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{performanceData.fps}</div>
              <div className="text-sm text-gray-600">FPS</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{performanceData.memory} MB</div>
              <div className="text-sm text-gray-600">記憶體使用</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{performanceData.cpu}%</div>
              <div className="text-sm text-gray-600">CPU 使用率</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{performanceData.loadTime}s</div>
              <div className="text-sm text-gray-600">載入時間</div>
            </div>
          </div>
        </div>

        {/* Game Information */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">遊戲資訊</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">遊戲引擎:</span>
                <span className="text-gray-900">Unity WebGL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">版本:</span>
                <span className="text-gray-900">2021.3.15f1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">壓縮格式:</span>
                <span className="text-gray-900">Gzip</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">總檔案大小:</span>
                <span className="text-gray-900">17.27 MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">分析結果</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">遊戲載入正常</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">性能表現良好</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">建議啟用資源壓縮</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-700">可優化載入順序</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">優化建議</h3>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-1">載入優化</h4>
                <p className="text-sm text-blue-700">使用 Progressive Web App 技術可以提升載入速度</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h4 className="font-medium text-green-900 mb-1">資源壓縮</h4>
                <p className="text-sm text-green-700">啟用 Brotli 壓縮可以減少 15-20% 的檔案大小</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-medium text-yellow-900 mb-1">快取策略</h4>
                <p className="text-sm text-yellow-700">設定適當的 Cache-Control 標頭可以改善重複載入時間</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 