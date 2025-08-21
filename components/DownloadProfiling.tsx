'use client'

import { useState } from 'react'

interface FileDownload {
  id: string
  name: string
  type: string
  size: number
  compressedSize?: number
  status: 'waiting' | 'downloading' | 'completed' | 'failed' | 'cached'
  progress: number
  speed: number
  startTime?: Date
  endTime?: Date
  compression?: 'gzip' | 'brotli' | 'none'
  cacheSource?: 'browser' | 'service-worker' | 'none'
}

export function DownloadProfiling() {
  const [files, setFiles] = useState<FileDownload[]>([
    {
      id: '1',
      name: 'game.js',
      type: 'javascript',
      size: 2048000,
      compressedSize: 512000,
      status: 'completed',
      progress: 100,
      speed: 1024,
      startTime: new Date(Date.now() - 5000),
      endTime: new Date(),
      compression: 'gzip',
      cacheSource: 'none'
    },
    {
      id: '2',
      name: 'assets.png',
      type: 'image',
      size: 512000,
      status: 'downloading',
      progress: 65,
      speed: 256,
      startTime: new Date(Date.now() - 2000),
      compression: 'none',
      cacheSource: 'none'
    },
    {
      id: '3',
      name: 'styles.css',
      type: 'stylesheet',
      size: 128000,
      compressedSize: 32000,
      status: 'cached',
      progress: 100,
      speed: 0,
      compression: 'gzip',
      cacheSource: 'service-worker'
    },
    {
      id: '4',
      name: 'data.json',
      type: 'json',
      size: 64000,
      status: 'failed',
      progress: 0,
      speed: 0,
      compression: 'none',
      cacheSource: 'none'
    }
  ])

  const [cacheEnabled, setCacheEnabled] = useState(true)
  const [serviceWorkerEnabled, setServiceWorkerEnabled] = useState(true)

  // Calculate statistics
  const totalFiles = files.length
  const completedFiles = files.filter(f => f.status === 'completed' || f.status === 'cached').length
  const totalSize = files.reduce((sum, f) => sum + f.size, 0)
  const downloadedSize = files
    .filter(f => f.status === 'completed' || f.status === 'cached')
    .reduce((sum, f) => sum + f.size, 0)
  const cacheHitRate = files.filter(f => f.status === 'cached').length / totalFiles * 100
  const compressionRate = files
    .filter(f => f.compressedSize)
    .reduce((sum, f) => sum + (1 - (f.compressedSize! / f.size)) * 100, 0) / 
    files.filter(f => f.compressedSize).length || 0

  const formatSize = (bytes: number) => {
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
    if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${bytes}B`
  }

  const getStatusColor = (status: FileDownload['status']) => {
    switch (status) {
      case 'completed': return 'text-green-400'
      case 'downloading': return 'text-blue-400'
      case 'cached': return 'text-purple-400'
      case 'failed': return 'text-red-400'
      case 'waiting': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  const getStatusText = (status: FileDownload['status']) => {
    switch (status) {
      case 'completed': return '已完成'
      case 'downloading': return '下載中'
      case 'cached': return '來自快取'
      case 'failed': return '失敗'
      case 'waiting': return '等待中'
      default: return '未知'
    }
  }

  const retryFailedDownload = (fileId: string) => {
    setFiles(files.map(f => 
      f.id === fileId 
        ? { ...f, status: 'waiting' as const, progress: 0 }
        : f
    ))
  }

  const clearCache = () => {
    setFiles(files.map(f => ({ ...f, cacheSource: 'none' as const })))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Download Profiling</h1>
        
        {/* Cache Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={cacheEnabled}
                onChange={(e) => setCacheEnabled(e.target.checked)}
                className="rounded"
              />
              <span>啟用快取</span>
            </label>
          </div>
          
          <div className="flex items-center space-x-2">
            <label className="flex items-center space-x-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={serviceWorkerEnabled}
                onChange={(e) => setServiceWorkerEnabled(e.target.checked)}
                className="rounded"
              />
              <span>Service Worker</span>
            </label>
          </div>

          <button
            onClick={clearCache}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            清除快取
          </button>
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-white">{completedFiles}/{totalFiles}</div>
          <div className="text-sm text-gray-400">檔案完成率</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${(completedFiles / totalFiles) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-white">{formatSize(downloadedSize)}</div>
          <div className="text-sm text-gray-400">已下載 / {formatSize(totalSize)}</div>
          <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${(downloadedSize / totalSize) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-purple-400">{cacheHitRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">快取命中率</div>
          <div className="text-xs text-gray-500 mt-1">
            SW: {serviceWorkerEnabled ? '啟用' : '停用'}
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{compressionRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-400">平均壓縮率</div>
          <div className="text-xs text-gray-500 mt-1">
            Gzip + Brotli
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">檔案下載狀態</h2>
        </div>

        <div className="divide-y divide-gray-700">
          {files.map((file) => (
            <div key={file.id} className="p-4 hover:bg-gray-750">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* File Icon & Name */}
                  <div className="flex items-center space-x-3">
                    <div className="text-xl">
                      {file.type === 'javascript' ? '📄' : 
                       file.type === 'image' ? '🖼️' : 
                       file.type === 'stylesheet' ? '🎨' : '📋'}
                    </div>
                    <div>
                      <div className="text-white font-medium">{file.name}</div>
                      <div className="text-sm text-gray-400">{formatSize(file.size)}</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="flex-1 max-w-xs">
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className={getStatusColor(file.status)}>
                        {getStatusText(file.status)}
                      </span>
                      <span className="text-gray-400">{file.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          file.status === 'completed' ? 'bg-green-600' :
                          file.status === 'downloading' ? 'bg-blue-600' :
                          file.status === 'cached' ? 'bg-purple-600' :
                          file.status === 'failed' ? 'bg-red-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Compression Info */}
                  <div className="text-sm">
                    {file.compression && file.compression !== 'none' ? (
                      <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                        {file.compression.toUpperCase()}
                      </span>
                    ) : (
                      <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                        未壓縮
                      </span>
                    )}
                  </div>

                  {/* Cache Source */}
                  <div className="text-sm">
                    {file.cacheSource === 'service-worker' ? (
                      <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                        SW快取
                      </span>
                    ) : file.cacheSource === 'browser' ? (
                      <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                        瀏覽器快取
                      </span>
                    ) : (
                      <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
                        無快取
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  {file.status === 'failed' && (
                    <button
                      onClick={() => retryFailedDownload(file.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                    >
                      重試
                    </button>
                  )}
                  
                  {file.speed > 0 && (
                    <div className="text-sm text-gray-400">
                      {formatSize(file.speed)}/s
                    </div>
                  )}
                </div>
              </div>

              {/* Timing Information */}
              {(file.startTime || file.endTime) && (
                <div className="mt-2 text-xs text-gray-500 flex space-x-4">
                  {file.startTime && (
                    <span>開始: {file.startTime.toLocaleTimeString()}</span>
                  )}
                  {file.endTime && (
                    <span>完成: {file.endTime.toLocaleTimeString()}</span>
                  )}
                  {file.startTime && file.endTime && (
                    <span>耗時: {((file.endTime.getTime() - file.startTime.getTime()) / 1000).toFixed(1)}s</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">效能總結</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">優化建議</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 建議對 assets.png 進行壓縮 (512KB)</li>
              <li>• data.json 下載失敗，請檢查網路連線</li>
              <li>• Service Worker 快取運作正常</li>
              <li>• 總體效能評分: B+ (85/100)</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">關鍵指標</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• 平均下載速度: {formatSize(512)}/s</li>
              <li>• 最慢檔案: assets.png (8.2s)</li>
              <li>• 失敗率: {((files.filter(f => f.status === 'failed').length / totalFiles) * 100).toFixed(1)}%</li>
              <li>• 總下載時間: 12.5s</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 