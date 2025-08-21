'use client'

import { useState } from 'react'

interface Session {
  id: string
  name: string
  status: string
  players: number
  startTime: Date
}

interface SessionManagerProps {
  sessions: Session[]
  setSessions: (sessions: Session[]) => void
  activeSession: string
  setActiveSession: (id: string) => void
}

interface Player {
  id: string
  name: string
  sessionId: string
  joinTime: Date
  status: 'online' | 'offline'
  sdkVersion: string
}

export function SessionManager({ sessions, setSessions, activeSession, setActiveSession }: SessionManagerProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSessionName, setNewSessionName] = useState('')
  const [gameUrl, setGameUrl] = useState('https://h5.stg.g123.jp/game/example')
  
  const [players] = useState<Player[]>([
    {
      id: 'player-1',
      name: 'Test Player 1',
      sessionId: 'session-1',
      joinTime: new Date(Date.now() - 300000),
      status: 'online',
      sdkVersion: 'v2.1.3'
    },
    {
      id: 'player-2',
      name: 'Test Player 2',
      sessionId: 'session-2',
      joinTime: new Date(Date.now() - 180000),
      status: 'online',
      sdkVersion: 'v2.1.3'
    },
    {
      id: 'player-3',
      name: 'Test Player 3',
      sessionId: 'session-2',
      joinTime: new Date(Date.now() - 120000),
      status: 'offline',
      sdkVersion: 'v2.0.8'
    }
  ])

  const createSession = () => {
    if (newSessionName.trim()) {
      const newSession: Session = {
        id: `session-${Date.now()}`,
        name: newSessionName.trim(),
        status: 'active',
        players: 0,
        startTime: new Date()
      }
      setSessions([...sessions, newSession])
      setNewSessionName('')
      setShowCreateModal(false)
      setActiveSession(newSession.id)
    }
  }

  const deleteSession = (sessionId: string) => {
    const updatedSessions = sessions.filter(s => s.id !== sessionId)
    setSessions(updatedSessions)
    if (activeSession === sessionId && updatedSessions.length > 0) {
      setActiveSession(updatedSessions[0].id)
    }
  }

  const pauseSession = (sessionId: string) => {
    setSessions(sessions.map(s => 
      s.id === sessionId 
        ? { ...s, status: s.status === 'active' ? 'paused' : 'active' }
        : s
    ))
  }

  const duplicateSession = (sessionId: string) => {
    const originalSession = sessions.find(s => s.id === sessionId)
    if (originalSession) {
      const newSession: Session = {
        id: `session-${Date.now()}`,
        name: `${originalSession.name} (複製)`,
        status: 'active',
        players: 0,
        startTime: new Date()
      }
      setSessions([...sessions, newSession])
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'paused': return 'bg-yellow-500'
      case 'stopped': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '進行中'
      case 'paused': return '暫停'
      case 'stopped': return '已停止'
      default: return '未知'
    }
  }

  const getPlayersForSession = (sessionId: string) => {
    return players.filter(p => p.sessionId === sessionId)
  }

  const formatDuration = (startTime: Date) => {
    const diff = Date.now() - startTime.getTime()
    const minutes = Math.floor(diff / 60000)
    const seconds = Math.floor((diff % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Session Manager</h1>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-300">
            總會話數: <span className="text-white">{sessions.length}</span>
          </div>
          <div className="text-sm text-gray-300">
            活動會話: <span className="text-white">{sessions.filter(s => s.status === 'active').length}</span>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
          >
            + 新建會話
          </button>
        </div>
      </div>

      {/* Game URL Configuration */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h2 className="text-lg font-semibold text-white mb-4">遊戲設定</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">遊戲 URL</label>
            <input
              type="url"
              value={gameUrl}
              onChange={(e) => setGameUrl(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
              placeholder="https://h5.stg.g123.jp/game/example"
            />
          </div>
          
          <div>
            <label className="block text-sm text-gray-300 mb-2">環境</label>
            <select className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2">
              <option value="stg">測試環境</option>
              <option value="prod">正式環境</option>
            </select>
          </div>
        </div>
      </div>

      {/* Session Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.map((session) => {
          const sessionPlayers = getPlayersForSession(session.id)
          const onlinePlayers = sessionPlayers.filter(p => p.status === 'online')
          
          return (
            <div
              key={session.id}
              className={`bg-gray-800 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                activeSession === session.id 
                  ? 'border-blue-500 bg-gray-750' 
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => setActiveSession(session.id)}
            >
              {/* Session Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`}></div>
                  <h3 className="text-white font-medium truncate">{session.name}</h3>
                </div>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      pauseSession(session.id)
                    }}
                    className="text-gray-400 hover:text-white p-1"
                    title={session.status === 'active' ? '暫停' : '恢復'}
                  >
                    {session.status === 'active' ? '⏸️' : '▶️'}
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateSession(session.id)
                    }}
                    className="text-gray-400 hover:text-white p-1"
                    title="複製會話"
                  >
                    📋
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSession(session.id)
                    }}
                    className="text-gray-400 hover:text-red-400 p-1"
                    title="刪除會話"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Session Stats */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">狀態</span>
                  <span className={`font-medium ${
                    session.status === 'active' ? 'text-green-400' : 
                    session.status === 'paused' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {getStatusText(session.status)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">玩家</span>
                  <span className="text-white">
                    {onlinePlayers.length} / {sessionPlayers.length}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">運行時間</span>
                  <span className="text-white">
                    {formatDuration(session.startTime)}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">開始時間</span>
                  <span className="text-white">
                    {session.startTime.toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Session Players */}
              {sessionPlayers.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-2">玩家列表</div>
                  <div className="space-y-1">
                    {sessionPlayers.slice(0, 3).map((player) => (
                      <div key={player.id} className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 truncate">{player.name}</span>
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${
                            player.status === 'online' ? 'bg-green-400' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-gray-500">{player.sdkVersion}</span>
                        </div>
                      </div>
                    ))}
                    {sessionPlayers.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{sessionPlayers.length - 3} 更多...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Active Session Details */}
      {activeSession && (
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">
              會話詳情 - {sessions.find(s => s.id === activeSession)?.name}
            </h2>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Session Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">會話資訊</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">會話 ID</span>
                    <span className="text-white font-mono text-sm">{activeSession}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">SDK 版本</span>
                    <span className="text-white">v2.1.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">遊戲 URL</span>
                    <span className="text-white text-sm truncate">{gameUrl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">資料隔離</span>
                    <span className="text-green-400">✓ 啟用</span>
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-3">效能摘要</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">記憶體使用</span>
                    <span className="text-white">45.2MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">CPU 使用率</span>
                    <span className="text-white">12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">網路延遲</span>
                    <span className="text-white">150ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">錯誤數</span>
                    <span className="text-green-400">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Players Detail */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-300 mb-3">玩家詳情</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-400 py-2">玩家名稱</th>
                      <th className="text-left text-gray-400 py-2">狀態</th>
                      <th className="text-left text-gray-400 py-2">SDK 版本</th>
                      <th className="text-left text-gray-400 py-2">加入時間</th>
                      <th className="text-left text-gray-400 py-2">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPlayersForSession(activeSession).map((player) => (
                      <tr key={player.id} className="border-b border-gray-700">
                        <td className="py-2 text-white">{player.name}</td>
                        <td className="py-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            player.status === 'online' 
                              ? 'bg-green-600 text-white' 
                              : 'bg-gray-600 text-white'
                          }`}>
                            {player.status === 'online' ? '在線' : '離線'}
                          </span>
                        </td>
                        <td className="py-2 text-white">{player.sdkVersion}</td>
                        <td className="py-2 text-white">{player.joinTime.toLocaleTimeString()}</td>
                        <td className="py-2">
                          <button className="text-red-400 hover:text-red-300 text-xs">
                            踢出
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-96">
            <h2 className="text-lg font-bold text-white mb-4">創建新會話</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">會話名稱</label>
                <input
                  type="text"
                  value={newSessionName}
                  onChange={(e) => setNewSessionName(e.target.value)}
                  placeholder="例如: Game Test #3"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
                  onKeyPress={(e) => e.key === 'Enter' && createSession()}
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">遊戲 URL</label>
                <input
                  type="url"
                  value={gameUrl}
                  onChange={(e) => setGameUrl(e.target.value)}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded px-3 py-2"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">配置選項</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-300">啟用效能監控</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm text-gray-300">啟用資料隔離</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-gray-300">自動記錄日誌</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setNewSessionName('')
                }}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                取消
              </button>
              <button
                onClick={createSession}
                disabled={!newSessionName.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
              >
                創建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 