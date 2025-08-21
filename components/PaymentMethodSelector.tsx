'use client'

import { useState } from 'react'
import { PaymentButton } from './PaymentButton'
import { PSPPaymentModal } from './PSPPaymentModal'

interface PaymentMethod {
  id: string
  name: string
  icon: string
  supportsAutoFill: boolean
  description: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'credit-card',
    name: '信用卡',
    icon: '💳',
    supportsAutoFill: true,
    description: '支持自动填入测试数据'
  },
  {
    id: 'google-pay',
    name: 'Google Pay',
    icon: '📱',
    supportsAutoFill: false,
    description: '需要手动输入'
  },
  {
    id: 'paypay',
    name: 'PayPay',
    icon: '🔴',
    supportsAutoFill: false,
    description: '需要手动输入'
  },
  {
    id: 'amazon-pay',
    name: 'Amazon Pay',
    icon: '📦',
    supportsAutoFill: false,
    description: '需要手动输入'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🔵',
    supportsAutoFill: false,
    description: '需要手动输入'
  },
  {
    id: 'paidy',
    name: '稍後付款paidy',
    icon: '🌸',
    supportsAutoFill: false,
    description: '需要手动输入'
  },
  {
    id: 'wechat-pay',
    name: '微信支付',
    icon: '💚',
    supportsAutoFill: false,
    description: '需要手动输入'
  },
  {
    id: 'bitcash',
    name: 'BitCash',
    icon: '🔷',
    supportsAutoFill: false,
    description: '需要手动输入'
  },
  {
    id: 'rakuten-pay',
    name: '樂天Pay',
    icon: '🔴',
    supportsAutoFill: false,
    description: '需要手动输入'
  }
]

interface PaymentMethodSelectorProps {
  amount: string
  currency: string
  onPaymentComplete?: (method: string, data?: any) => void
}

export function PaymentMethodSelector({ amount, currency, onPaymentComplete }: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('')
  const [showPSPModal, setShowPSPModal] = useState(false)
  const [autoFillData, setAutoFillData] = useState<any>(null)

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId)
    setShowPSPModal(true)
  }

  const handleAutoFill = () => {
    if (selectedMethod === 'credit-card') {
      const testData = {
        cardNumber: '4111111111111111',
        cardHolder: 'TEST USER',
        expiryDate: '12/25',
        cvv: '123',
        amount: amount,
        currency: currency,
        merchantId: 'TEST_MERCHANT_001',
        transactionId: `TXN_${Date.now()}`
      }
      setAutoFillData(testData)
      
      // 模拟自动填入过程
      setTimeout(() => {
        onPaymentComplete?.(selectedMethod, testData)
        setShowPSPModal(false)
      }, 1500)
    }
  }

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedMethod)

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* 自动填入按钮 */}
      <div className="p-4 border-b border-gray-200">
        <PaymentButton
          onClick={handleAutoFill}
          disabled={selectedMethod !== 'credit-card'}
          loading={autoFillData !== null}
        >
          自動填入支付信息
        </PaymentButton>
        
        {/* 状态提示 */}
        <div className="mt-2 text-sm text-gray-600">
          {selectedMethod === 'credit-card' ? (
            <span className="text-green-600">✅ 支持自动填入测试数据</span>
          ) : selectedMethod ? (
            <span className="text-yellow-600">⚠️ 当前支付方式不支持自动填入</span>
          ) : (
            <span className="text-gray-500">请先选择支付方式</span>
          )}
        </div>
      </div>

      {/* 支付方式选择 */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          支付方法①
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => handlePaymentMethodSelect(method.id)}
              className={`
                relative p-4 rounded-lg border-2 transition-all duration-200
                ${selectedMethod === method.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }
                ${method.supportsAutoFill ? 'ring-2 ring-green-200' : ''}
              `}
            >
              {/* 支付方式图标 */}
              <div className="text-2xl mb-2">{method.icon}</div>
              
              {/* 支付方式名称 */}
              <div className="text-sm font-medium text-gray-800 mb-1">
                {method.name}
              </div>
              
              {/* 自动填入支持标识 */}
              {method.supportsAutoFill && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    自动填入
                  </div>
                </div>
              )}
              
              {/* 描述 */}
              <div className="text-xs text-gray-500">
                {method.description}
              </div>
            </button>
          ))}
        </div>

        {/* 使用提示 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start">
            <div className="text-blue-600 mr-3 mt-1">💡</div>
            <div>
              <div className="font-semibold text-blue-800 mb-1">
                使用提示
              </div>
              <div className="text-sm text-blue-700">
                <ul className="space-y-1">
                  <li>• 选择"信用卡"支付方式后，可点击"自動填入支付信息"按钮</li>
                  <li>• 其他支付方式需要手动输入支付信息</li>
                  <li>• 填入的为测试数据，不会产生真实扣款</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PSP支付弹窗 */}
      <PSPPaymentModal
        isOpen={showPSPModal}
        onClose={() => setShowPSPModal(false)}
        selectedPaymentMethod={selectedMethod}
        amount={amount}
        currency={currency}
      />
    </div>
  )
}
