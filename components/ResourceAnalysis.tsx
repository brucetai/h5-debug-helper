'use client'

import { useState, useEffect } from 'react'

interface ResourceAnalysisProps {
  gameUrl: string
  isAnalyzing: boolean
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

export function ResourceAnalysis({ gameUrl, isAnalyzing }: ResourceAnalysisProps) {
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
      fileName: 'ac6913f1-9608-4dc8-9d23-e27e2dbb6eb6.bcac1.webp',
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
      fileName: '1ffe1067-eaa1-4647-9351-55ac2c5bf90a.a0799.bin',
      status: 200,
      contentType: 'text/plain',
      compression: 'gzip',
      cache: 'RefreshHit',
      size: '1.21 MB',
      time: '1546ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '6',
      fileName: 'b121035d-ec0e-4e41-85cd-230e7e8fc12d.de6c7.manifest',
      status: 200,
      contentType: 'binary/octet-stream',
      compression: '-',
      cache: 'Hit',
      size: '319 KB',
      time: '313ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '7',
      fileName: '5942f58b-ea8f-48f5-8fd5-1ed04806a13e.a6519.webp',
      status: 200,
      contentType: 'binary/octet-stream',
      compression: '-',
      cache: 'RefreshHit',
      size: '316 KB',
      time: '621ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '8',
      fileName: 'fonts.ttf',
      status: 200,
      contentType: 'font/ttf',
      compression: 'gzip',
      cache: 'RefreshHit',
      size: '293 KB',
      time: '70ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '9',
      fileName: '33a4a707-666e-4e43-a233-5c70099f78d6.c719c.webp',
      status: 200,
      contentType: 'binary/octet-stream',
      compression: '-',
      cache: 'RefreshHit',
      size: '290 KB',
      time: '397ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    },
    {
      id: '10',
      fileName: 'f067086e-d7d6-4d98-bcb5-a4bfebdf2bd4.6d5a2.webp',
      status: 200,
      contentType: 'binary/octet-stream',
      compression: '-',
      cache: 'RefreshHit',
      size: '276 KB',
      time: '519ms',
      url: 'https://slime.stg.g123-cpp.com/slime/assets/...'
    }
  ])

  const [onlyShowOptimizations, setOnlyShowOptimizations] = useState(false)
  const [gameLoaded, setGameLoaded] = useState(false)

  // Statistics
  const totalRequests = 135
  const totalSize = '17.27 MB'
  const totalTime = '21.61s'

  const getStatusColor = (status: number) => {
    if (status === 200) return 'text-green-600'
    if (status >= 400) return 'text-red-600'
    return 'text-yellow-600'
  }

  const getCacheColor = (cache: string) => {
    if (cache === 'Hit') return 'bg-blue-100 text-blue-800'
    if (cache === 'RefreshHit') return 'bg-yellow-100 text-yellow-800'
    return 'bg-gray-100 text-gray-800'
  }

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

      {/* Right Side - Analysis Data */}
      <div className="space-y-4">
        {/* Statistics Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{totalRequests}</div>
              <div className="text-sm text-gray-600">請求數量</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{totalSize}</div>
              <div className="text-sm text-gray-600">總大小</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{totalTime}</div>
              <div className="text-sm text-gray-600">總時間</div>
            </div>
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">改善建議</h3>
          </div>
          <div className="p-4">
            <div className="text-sm text-gray-700 space-y-2">
              <p>目前加載資源數量 135 個，總大小 17.27 MB，總時間 21.61s</p>
              <p>這些檔案類型沒有配置 CDN 緩存：webp, bin, ttf, json, wasm, cconb</p>
              <p className="flex items-center">
                這些檔案類型沒有 gzip 壓縮，請在上傳時配置 content-type：ttf, manifest
                <button className="ml-2 text-blue-600 hover:text-blue-800">
                  📋
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={onlyShowOptimizations}
              onChange={(e) => setOnlyShowOptimizations(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">只列出優化建議</span>
          </label>
        </div>

        {/* File List Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    檔案名稱
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    狀態
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Content Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Compression
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cache
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    大小
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    時間
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">
                      <div className="text-blue-600 hover:text-blue-800 cursor-pointer truncate max-w-xs">
                        {resource.fileName}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`font-medium ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {resource.contentType}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {resource.compression === 'gzip' ? (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                          gzip
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs ${getCacheColor(resource.cache)}`}>
                        {resource.cache}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {resource.size}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {resource.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 