'use client'

import { useState, useEffect } from 'react'
import { GamePaymentButton } from './GamePaymentButton'

interface GamePaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  currency: string
  itemName: string
  onPaymentComplete?: (data: {
    cardNumber: string
    expiryDate: string
    securityCode: string
    amount: string
    currency: string
    itemName: string
    transactionId: string
  }) => void
}

export function GamePaymentModal({ 
  isOpen, 
  onClose, 
  amount, 
  currency, 
  itemName,
  onPaymentComplete 
}: GamePaymentModalProps) {
  const [showAutoFillButton, setShowAutoFillButton] = useState(false)
  const [isAutoFilling, setIsAutoFilling] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    securityCode: ''
  })

  useEffect(() => {
    if (isOpen) {
      // 延迟显示自动填入按钮，模拟PSP弹窗加载
      setTimeout(() => setShowAutoFillButton(true), 500)
    } else {
      setShowAutoFillButton(false)
      setIsAutoFilling(false)
    }
  }, [isOpen])

  const handleAutoFill = () => {
    setIsAutoFilling(true)
    
    // 模拟自动填入过程
    setTimeout(() => {
      setFormData({
        cardNumber: '4111 1111 1111 1111',
        expiryDate: '12/25',
        securityCode: '123'
      })
      setIsAutoFilling(false)
      
      // 模拟支付完成
      setTimeout(() => {
        onPaymentComplete?.({
          cardNumber: '4111 1111 1111 1111',
          expiryDate: '12/25',
          securityCode: '123',
          amount,
          currency,
          itemName,
          transactionId: `TXN_${Date.now()}`
        })
        onClose()
      }, 1000)
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-sm w-full mx-4 relative">
        {/* 自动填入按钮 - 在弹窗顶部 */}
        {showAutoFillButton && (
          <div className="absolute -top-12 left-0 right-0">
            <GamePaymentButton
              onAutoFill={handleAutoFill}
              loading={isAutoFilling}
            />
          </div>
        )}

        {/* 弹窗头部 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ←
          </button>
          <h2 className="text-lg font-semibold">付款</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        </div>

        {/* 弹窗内容 */}
        <div className="p-4">
          {/* 支付金额 */}
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {amount} ({currency})
            </div>
            <div className="flex items-center justify-center text-gray-600">
              <span className="text-lg mr-2">🛍️</span>
              <span>{itemName}</span>
            </div>
          </div>

          {/* 说明文字 */}
          <div className="text-sm text-gray-600 mb-6 text-center">
            除非另有標示,否則必須填寫所有欄位。
          </div>

          {/* 信用卡表单 */}
          <div className="space-y-4">
            {/* 信用卡号码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                信用卡號碼
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  💳
                </div>
              </div>
              
              {/* 信用卡品牌图标 */}
              <div className="flex space-x-2 mt-2">
                <span className="text-xs text-gray-500">AMEX</span>
                <span className="text-xs text-gray-500">UnionPay</span>
                <span className="text-xs text-gray-500">JCB</span>
                <span className="text-xs text-gray-500">Discover</span>
                <span className="text-xs text-gray-500">Mastercard</span>
                <span className="text-xs text-gray-500">Visa</span>
              </div>
            </div>

            {/* 到期日期 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                到期日期
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  📅
                </div>
              </div>
            </div>

            {/* 安全码 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                安全碼
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.securityCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, securityCode: e.target.value }))}
                  placeholder="3 位數"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  🔒
                </div>
              </div>
            </div>
          </div>

          {/* 安全提示 */}
          <div className="flex items-center mt-6 p-3 bg-yellow-50 rounded-md">
            <span className="text-yellow-600 mr-2">🛡️</span>
            <span className="text-sm text-yellow-800">
              為了交易安全,已經進行了加密。
            </span>
          </div>

          {/* 支付按钮 */}
          <button
            className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!formData.cardNumber || !formData.expiryDate || !formData.securityCode}
          >
            付款
          </button>
        </div>
      </div>
    </div>
  )
}
