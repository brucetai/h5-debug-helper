'use client'

import { useState } from 'react'

interface GamePaymentButtonProps {
  onAutoFill: () => void
  disabled?: boolean
  loading?: boolean
}

export function GamePaymentButton({ onAutoFill, disabled = false, loading = false }: GamePaymentButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  return (
    <button
      onClick={onAutoFill}
      disabled={disabled || loading}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={`
        relative
        w-full
        px-4 py-3
        bg-blue-500
        hover:bg-blue-600
        active:bg-blue-700
        disabled:bg-gray-400
        disabled:cursor-not-allowed
        text-white
        font-medium
        text-sm
        rounded-none
        border-0
        outline-none
        transition-all duration-150 ease-out
        ${isPressed ? 'scale-98' : 'scale-100'}
        ${loading ? 'cursor-wait' : 'cursor-pointer'}
        shadow-sm
        hover:shadow-md
        active:shadow-sm
      `}
    >
      {/* 按钮内容 */}
      <div className="flex items-center justify-center">
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <span>处理中...</span>
          </>
        ) : (
          <span>自動填入支付信息</span>
        )}
      </div>
      
      {/* 按钮光泽效果 */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent pointer-events-none"></div>
    </button>
  )
}
