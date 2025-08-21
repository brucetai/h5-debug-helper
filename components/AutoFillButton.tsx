import React, { useState } from 'react';

interface AutoFillButtonProps {
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const AutoFillButton: React.FC<AutoFillButtonProps> = ({
  text = '自動填入支付信息',
  onClick,
  disabled = false,
  loading = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(loading);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    
    if (onClick) {
      setIsLoading(true);
      try {
        await onClick();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <button
      className={`
        relative w-full px-4 py-3 text-white font-medium text-sm
        border-0 outline-none cursor-pointer transition-all duration-200 ease-out
        bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
        shadow-lg shadow-blue-500/30 rounded-lg
        hover:from-blue-600 hover:via-blue-700 hover:to-blue-800
        hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5
        active:from-blue-700 active:via-blue-800 active:to-blue-900
        active:shadow-md active:shadow-blue-500/30 active:translate-y-0 active:scale-98
        disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600
        disabled:shadow-none disabled:opacity-60 disabled:cursor-not-allowed
        disabled:hover:transform-none disabled:hover:shadow-none
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || isLoading}
      style={{
        background: 'linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8)',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
      }}
    >
      {/* Shine effect overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-white/15 to-transparent rounded-lg pointer-events-none"
      />
      
      {/* Border overlay */}
      <div
        className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none"
      />
      
      {/* Content */}
      <div className="relative flex items-center justify-center">
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
            <span>处理中...</span>
          </>
        ) : (
          <span>{text}</span>
        )}
      </div>
    </button>
  );
};

export default AutoFillButton;
