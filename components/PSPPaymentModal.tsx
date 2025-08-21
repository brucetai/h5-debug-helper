'use client'

import { useState, useEffect } from 'react'

interface PSPPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  selectedPaymentMethod: string
  amount: string
  currency: string
}

export function PSPPaymentModal({ 
  isOpen, 
  onClose, 
  selectedPaymentMethod, 
  amount, 
  currency 
}: PSPPaymentModalProps) {
  const [showAutoFillTip, setShowAutoFillTip] = useState(false)
  const [autoFillSupported, setAutoFillSupported] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // 检查是否支持自动填入
      const isCreditCard = selectedPaymentMethod === 'credit-card'
      setAutoFillSupported(isCreditCard)
      
      // 如果是信用卡，延迟显示提示
      if (isCreditCard) {
        setTimeout(() => setShowAutoFillTip(true), 1000)
      }
    } else {
      setShowAutoFillTip(false)
    }
  }, [isOpen, selectedPaymentMethod])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 relative">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>

        {/* 支付弹窗内容 */}
        <div className="p-6">
          {/* G123 Logo */}
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-blue-600">G123</div>
          </div>

          {/* 支付金额 */}
          <div className="text-center mb-6">
            <div className="text-3xl font-bold text-gray-800">
              {amount} {currency}
            </div>
            <div className="flex items-center justify-center mt-2 text-gray-600">
              <span className="text-lg">🛍️</span>
              <span className="ml-2">鑽石</span>
            </div>
          </div>

          <hr className="mb-6" />

          {/* 支付方式 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              支付方法①
            </h3>
            
            {/* 当前选择的支付方式 */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">
                  {selectedPaymentMethod === 'credit-card' ? '💳' : 
                   selectedPaymentMethod === 'google-pay' ? '📱' :
                   selectedPaymentMethod === 'paypay' ? '🔴' :
                   selectedPaymentMethod === 'amazon-pay' ? '📦' :
                   selectedPaymentMethod === 'paypal' ? '🔵' :
                   selectedPaymentMethod === 'paidy' ? '🌸' :
                   selectedPaymentMethod === 'wechat-pay' ? '💚' :
                   selectedPaymentMethod === 'bitcash' ? '🔷' :
                   selectedPaymentMethod === 'rakuten-pay' ? '🔴' : '💳'}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {selectedPaymentMethod === 'credit-card' ? '信用卡' :
                     selectedPaymentMethod === 'google-pay' ? 'Google Pay' :
                     selectedPaymentMethod === 'paypay' ? 'PayPay' :
                     selectedPaymentMethod === 'amazon-pay' ? 'Amazon Pay' :
                     selectedPaymentMethod === 'paypal' ? 'PayPal' :
                     selectedPaymentMethod === 'paidy' ? '稍後付款paidy' :
                     selectedPaymentMethod === 'wechat-pay' ? '微信支付' :
                     selectedPaymentMethod === 'bitcash' ? 'BitCash' :
                     selectedPaymentMethod === 'rakuten-pay' ? '樂天Pay' : '信用卡'}
                  </div>
                  <div className="text-sm text-gray-600">
                    {autoFillSupported ? '支持自动填入' : '手动输入支付信息'}
                  </div>
                </div>
              </div>
            </div>

            {/* 自动填入提示 */}
            {showAutoFillTip && autoFillSupported && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 animate-fade-in">
                <div className="flex items-start">
                  <div className="text-green-600 mr-3 mt-1">��</div>
                  <div>
                    <div className="font-semibold text-green-800 mb-1">
                      自动填入提示
                    </div>
                    <div className="text-sm text-green-700">
                      检测到您选择了信用卡支付，可以点击页面左上角的"自動填入支付信息"按钮快速填入测试数据。
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 不支持自动填入的提示 */}
            {!autoFillSupported && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start">
                  <div className="text-yellow-600 mr-3 mt-1">⚠️</div>
                  <div>
                    <div className="font-semibold text-yellow-800 mb-1">
                      手动输入
                    </div>
                    <div className="text-sm text-yellow-700">
                      当前支付方式不支持自动填入，请手动输入支付信息。
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 操作按钮 */}
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              确认支付
            </button>
          </div>
        </div>

        {/* 自动填入按钮提示 */}
        {autoFillSupported && (
          <div className="absolute -top-12 left-0 right-0 text-center">
            <div className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg inline-block">
              <div className="flex items-center space-x-2">
                <span>🔧</span>
                <span>点击"自動填入支付信息"快速填入</span>
                <span>⬆️</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


