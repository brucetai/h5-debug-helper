'use client'

interface Session {
  id: string
  name: string
  status: string
  players: number
  startTime: Date
}

interface SidebarProps {
  activeTab: 'download' | 'resource' | 'sessions'
  setActiveTab: (tab: 'download' | 'resource' | 'sessions') => void
  sessions: Session[]
  activeSession: string
  setActiveSession: (id: string) => void
  isMultiSession: boolean
}

export function Sidebar({ 
  activeTab, 
  setActiveTab, 
  sessions, 
  activeSession, 
  setActiveSession, 
  isMultiSession 
}: SidebarProps) {
  
  const navigationItems = [
    {
      id: 'download' as const,
      name: 'Download Profiling',
      icon: '📊',
      description: '下載效能分析'
    },
    {
      id: 'resource' as const,
      name: 'Resource Usage',
      icon: '⚡',
      description: '資源使用監控'
    },
    {
      id: 'sessions' as const,
      name: 'Session Manager',
      icon: '🔄',
      description: '會話管理'
    }
  ]

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
          主要功能
        </h2>
        
        <div className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {item.name}
                </div>
                <div className="text-xs opacity-75 truncate">
                  {item.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      </nav>

      {/* Session List (only in multi-session mode) */}
      {isMultiSession && (
        <div className="border-t border-gray-700 p-4">
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">
            會話列表
          </h3>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={`w-full flex items-center justify-between p-3 rounded text-left transition-colors ${
                  activeSession === session.id
                    ? 'bg-gray-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {session.name}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span className={`w-2 h-2 rounded-full ${
                      session.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></span>
                    <span>👥 {session.players}</span>
                    <span>{session.startTime.toLocaleTimeString()}</span>
                  </div>
                </div>
                
                {activeSession === session.id && (
                  <div className="w-2 h-2 bg-blue-400 rounded-full ml-2"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        <div className="text-xs text-gray-400 space-y-1">
          <div>版本: v1.0.0</div>
          <div>活動會話: {sessions.find(s => s.id === activeSession)?.name || 'None'}</div>
          <div>總會話數: {sessions.length}</div>
        </div>
      </div>
    </aside>
  )
} 