'use client'

import { useState } from 'react'
import { AutoFillButton } from './AutoFillButton'

export function ButtonDemo() {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      alert('自动填入完成！')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto space-y-8">
        {/* 标题 */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">自动填入按钮设计</h1>
          <p className="text-gray-600">工程师参考设计</p>
        </div>

        {/* 按钮演示区域 */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          {/* 正常状态 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">正常状态</h3>
            <AutoFillButton onClick={handleClick} />
          </div>

          {/* 加载状态 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">加载状态</h3>
            <AutoFillButton onClick={handleClick} loading={loading} />
          </div>

          {/* 禁用状态 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">禁用状态</h3>
            <AutoFillButton onClick={handleClick} disabled={true} />
          </div>

          {/* 控制按钮 */}
          <div className="flex space-x-4 pt-4 border-t border-gray-200">
            <button
              onClick={() => setLoading(!loading)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? '停止加载' : '开始加载'}
            </button>
            <button
              onClick={() => setDisabled(!disabled)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              {disabled ? '启用' : '禁用'}
            </button>
          </div>
        </div>

        {/* 设计说明 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">设计特点</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• 蓝色渐变背景，提供视觉深度</li>
            <li>• 悬停时按钮上浮，增加交互反馈</li>
            <li>• 按压时按钮缩小，模拟真实按钮</li>
            <li>• 光泽效果增加质感</li>
            <li>• 加载状态显示旋转动画</li>
            <li>• 禁用状态降低透明度</li>
            <li>• 响应式设计，适配移动端</li>
          </ul>
        </div>

        {/* CSS代码 */}
        <div className="bg-gray-800 text-green-400 rounded-lg p-4 font-mono text-xs overflow-x-auto">
          <div className="mb-2 text-white">CSS 样式代码：</div>
          <pre>{`
/* 按钮基础样式 */
.auto-fill-button {
  /* 基础样式 */
  position: relative;
  width: 100%;
  padding: 12px 16px;
  color: white;
  font-weight: 500;
  font-size: 14px;
  border: 0;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-out;
  
  /* 背景渐变 */
  background: linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8);
  
  /* 阴影效果 */
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
  
  /* 圆角 */
  border-radius: 8px;
}

/* 悬停效果 */
.auto-fill-button:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8, #1e40af);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

/* 按压效果 */
.auto-fill-button:active {
  background: linear-gradient(135deg, #1d4ed8, #1e40af, #1e3a8a);
  box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  transform: translateY(0) scale(0.98);
}

/* 光泽效果 */
.auto-fill-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, transparent, rgba(255,255,255,0.15), transparent);
  border-radius: 8px;
  pointer-events: none;
}
          `}</pre>
        </div>
      </div>
    </div>
  )
}
