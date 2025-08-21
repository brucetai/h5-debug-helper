'use client'

import { useState } from 'react'

interface Session {
  id: string
  name: string
  status: string
  players: number
  startTime: Date
}

interface HeaderProps {
  sessions: Session[]
  setSessions: (sessions: Session[]) => void
  activeSession: string
  setActiveSession: (id: string) => void
  isMultiSession: boolean
  setIsMultiSession: (multi: boolean) => void
}

export function Header({ 
  sessions, 
  setSessions, 
  activeSession, 
  setActiveSession, 
  isMultiSession, 
  setIsMultiSession 
}: HeaderProps) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSessionName, setNewSessionName] = useState('')

  const currentSession = sessions.find(s => s.id === activeSession)

  const createSession = () => {
    if (newSessionName.trim()) {
      const newSession = {
        id: `session-${Date.now()}`,
        name: newSessionName.trim(),
        status: 'active',
        players: 1,
        startTime: new Date()
      }
      setSessions([...sessions, newSession])
      setNewSessionName('')
      setShowCreateModal(false)
      setActiveSession(newSession.id)
    }
  }



  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        {/* Left: App Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-white">H5 Debug Helper</h1>
          
          {/* Session Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-300">模式:</span>
            <button
              onClick={() => setIsMultiSession(false)}
              className={`px-3 py-1 text-xs rounded ${
                !isMultiSession 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              單一
            </button>
            <button
              onClick={() => setIsMultiSession(true)}
              className={`px-3 py-1 text-xs rounded ${
                isMultiSession 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
              }`}
            >
              多會話
            </button>
          </div>
        </div>

        {/* Right: Session Management */}
        <div className="flex items-center space-x-4">
          {/* Current Session Info */}
          {currentSession && (
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-300">活動會話:</span>
              <span className="text-white font-medium">{currentSession.name}</span>
              <span className={`px-2 py-1 text-xs rounded ${
                currentSession.status === 'active' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-yellow-600 text-white'
              }`}>
                {currentSession.status === 'active' ? '進行中' : '暫停'}
              </span>
              <span className="text-gray-400">👥 {currentSession.players}</span>
            </div>
          )}

          {/* Session Selector */}
          {isMultiSession && (
            <select
              value={activeSession}
              onChange={(e) => setActiveSession(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 text-sm"
            >
              {sessions.map(session => (
                <option key={session.id} value={session.id}>
                  {session.name}
                </option>
              ))}
            </select>
          )}

          {/* Create Session Button */}
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
          >
            + 新會話
          </button>
        </div>
      </div>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 w-96">
            <h2 className="text-lg font-bold text-white mb-4">創建新會話</h2>
            
            <div className="mb-4">
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

            <div className="flex justify-end space-x-3">
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
    </header>
  )
} 