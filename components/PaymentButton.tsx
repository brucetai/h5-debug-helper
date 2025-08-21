'use client'

import { useState } from 'react'

interface PaymentButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
}

export function PaymentButton({ onClick, disabled = false, loading = false, children }: PaymentButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        relative
        px-6 py-3
        bg-gradient-to-r from-blue-500 to-blue-600
        hover:from-blue-600 hover:to-blue-700
        active:from-blue-700 active:to-blue-800
        disabled:from-gray-400 disabled:to-gray-500
        disabled:cursor-not-allowed
        text-white font-semibold text-sm
        rounded-lg
        shadow-lg
        hover:shadow-xl
        active:shadow-md
        transform
        hover:-translate-y-0.5
        active:translate-y-0
        transition-all duration-200 ease-out
        border-0
        outline-none
        focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
        ${isPressed ? 'scale-95' : 'scale-100'}
        ${loading ? 'cursor-wait' : 'cursor-pointer'}
      `}
    >
      {/* 按钮内容 */}
      <div className="flex items-center justify-center space-x-2">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <span>处理中...</span>
          </>
        ) : (
          <>
            <span className="text-lg">🔧</span>
            <span>{children}</span>
          </>
        )}
      </div>
      
      {/* 按钮光泽效果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent rounded-lg pointer-events-none"></div>
      
      {/* 按钮边框高光 */}
      <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"></div>
    </button>
  )
}
