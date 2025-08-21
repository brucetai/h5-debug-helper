'use client'

import { useState } from 'react'
import { GamePaymentModal } from './GamePaymentModal'

export function GamePaymentDemo() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentResult, setPaymentResult] = useState<{
    cardNumber: string
    expiryDate: string
    securityCode: string
    amount: string
    currency: string
    itemName: string
    transactionId: string
  } | null>(null)

  const handlePaymentComplete = (data: {
    cardNumber: string
    expiryDate: string
    securityCode: string
    amount: string
    currency: string
    itemName: string
    transactionId: string
  }) => {
    setPaymentResult(data)
    console.log('Payment completed:', data)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold">🎮 游戏支付演示</h2>
        <p className="text-sm opacity-90">模拟游戏内支付流程</p>
      </div>

      {/* 内容 */}
      <div className="p-6 space-y-6">
        {/* 游戏界面模拟 */}
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-center mb-4">
            <div className="text-2xl mb-2">🎮</div>
            <div className="text-lg font-semibold">游戏界面</div>
          </div>
          
          {/* 游戏内支付按钮 */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
            >
              NT$22
            </button>
          </div>
          
          <div className="text-center mt-2 text-sm text-gray-600">
            点击游戏内支付按钮
          </div>
        </div>

        {/* 操作说明 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">操作流程</h3>
          <ol className="text-sm text-blue-700 space-y-1">
            <li>1. 点击上方的&quot;NT$22&quot;按钮模拟游戏内支付</li>
            <li>2. 等待PSP支付弹窗出现</li>
            <li>3. 点击弹窗顶部的&quot;自動填入支付信息&quot;按钮</li>
            <li>4. 观察自动填入过程和支付完成</li>
          </ol>
        </div>

        {/* 支付结果 */}
        {paymentResult && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-800 mb-2">✅ 支付成功</h3>
            <div className="text-sm text-green-700 space-y-1">
              <div>交易ID: {paymentResult.transactionId}</div>
              <div>金额: {paymentResult.amount} {paymentResult.currency}</div>
              <div>商品: {paymentResult.itemName}</div>
              <div>卡号: {paymentResult.cardNumber}</div>
            </div>
          </div>
        )}

        {/* 重置按钮 */}
        {paymentResult && (
          <button
            onClick={() => {
              setPaymentResult(null)
              setShowPaymentModal(false)
            }}
            className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            重置演示
          </button>
        )}
      </div>

      {/* 游戏支付弹窗 */}
      <GamePaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount="100"
        currency="JPY"
        itemName="鑽石"
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  )
}
