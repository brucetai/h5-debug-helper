'use client'

import { useState, useEffect } from 'react'

interface PaymentData {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
  amount: string
  currency: string
  merchantId: string
  transactionId: string
}

interface PaymentTemplate {
  id: string
  name: string
  description: string
  data: Partial<PaymentData>
  category: 'test' | 'production' | 'custom'
  lastUsed: Date
}

interface PaymentAutoFillProps {
  isActive: boolean
  onPaymentComplete?: (data: PaymentData) => void
}

export function PaymentAutoFill({ isActive, onPaymentComplete }: PaymentAutoFillProps) {
  // 支付表单状态
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    amount: '',
    currency: 'JPY',
    merchantId: '',
    transactionId: ''
  })

  // 支付模板
  const [templates] = useState<PaymentTemplate[]>([
    {
      id: 'test-1',
      name: '測試支付 ¥1000',
      description: '標準測試支付模板',
      data: {
        cardNumber: '4111111111111111',
        cardHolder: 'TEST USER',
        expiryDate: '12/25',
        cvv: '123',
        amount: '1000',
        currency: 'JPY',
        merchantId: 'TEST_MERCHANT_001',
        transactionId: 'TXN_' + Date.now()
      },
      category: 'test',
      lastUsed: new Date(Date.now() - 3600000)
    },
    {
      id: 'test-2',
      name: '高額測試 ¥50000',
      description: '高額度測試支付',
      data: {
        cardNumber: '5555555555554444',
        cardHolder: 'HIGH VALUE TEST',
        expiryDate: '12/26',
        cvv: '456',
        amount: '50000',
        currency: 'JPY',
        merchantId: 'TEST_MERCHANT_002',
        transactionId: 'TXN_' + (Date.now() + 1)
      },
      category: 'test',
      lastUsed: new Date(Date.now() - 7200000)
    },
    {
      id: 'production-1',
      name: '生產環境支付',
      description: '真實支付環境模板',
      data: {
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        amount: '1000',
        currency: 'JPY',
        merchantId: 'PROD_MERCHANT_001',
        transactionId: 'PROD_' + Date.now()
      },
      category: 'production',
      lastUsed: new Date(Date.now() - 86400000)
    }
  ])

  // UI 状态
  const [selectedTemplate, setSelectedTemplate] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle')
  const [autoFillMode, setAutoFillMode] = useState<'manual' | 'template' | 'smart'>('manual')

  // 自动生成交易ID
  useEffect(() => {
    if (!paymentData.transactionId) {
      setPaymentData(prev => ({
        ...prev,
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }))
    }
  }, [paymentData.transactionId])

  // 应用模板数据
  const applyTemplate = (template: PaymentTemplate) => {
    setPaymentData(prev => ({
      ...prev,
      ...template.data
    }))
    setSelectedTemplate(template.id)
    setShowTemplates(false)
  }

  // 智能自动填入
  const smartAutoFill = () => {
    // 根据当前时间和金额智能选择模板
    const now = new Date()
    const hour = now.getHours()
    
    let template: PaymentTemplate | null = null
    
    if (hour >= 9 && hour <= 17) {
      // 工作时间，使用高额模板
      template = templates.find(t => t.id === 'test-2') || null
    } else {
      // 非工作时间，使用标准模板
      template = templates.find(t => t.id === 'test-1') || null
    }
    
    if (template) {
      applyTemplate(template)
    }
  }

  // 处理支付提交
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setPaymentStatus('processing')

    try {
      // 模拟支付处理
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 模拟成功或失败
      const isSuccess = Math.random() > 0.2 // 80% 成功率
      
      if (isSuccess) {
        setPaymentStatus('success')
        onPaymentComplete?.(paymentData)
        
        // 重置表单
        setTimeout(() => {
          setPaymentData({
            cardNumber: '',
            cardHolder: '',
            expiryDate: '',
            cvv: '',
            amount: '',
            currency: 'JPY',
            merchantId: '',
            transactionId: ''
          })
          setPaymentStatus('idle')
        }, 3000)
      } else {
        setPaymentStatus('failed')
      }
    } catch {
      setPaymentStatus('failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // 格式化卡号显示
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  if (!isActive) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">💳 支付自动填入</h2>
            <p className="text-sm opacity-90">智能支付表单自动填入与测试</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              paymentStatus === 'processing' ? 'bg-yellow-400 animate-pulse' :
              paymentStatus === 'success' ? 'bg-green-400' :
              paymentStatus === 'failed' ? 'bg-red-400' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm">
              {paymentStatus === 'processing' ? '处理中' :
               paymentStatus === 'success' ? '成功' :
               paymentStatus === 'failed' ? '失败' : '就绪'}
            </span>
          </div>
        </div>
      </div>

      {/* 自动填入模式选择 */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">自动填入模式:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => setAutoFillMode('manual')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                autoFillMode === 'manual'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              手动
            </button>
            <button
              onClick={() => setAutoFillMode('template')}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                autoFillMode === 'template'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              模板
            </button>
            <button
              onClick={smartAutoFill}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                autoFillMode === 'smart'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              智能
            </button>
          </div>
        </div>
      </div>

      {/* 模板选择器 */}
      {autoFillMode === 'template' && (
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">支付模板</h3>
            <button
              onClick={() => setShowTemplates(!showTemplates)}
              className="text-xs text-blue-600 hover:text-blue-800"
            >
              {showTemplates ? '隐藏' : '选择模板'}
            </button>
          </div>
          
          {showTemplates && (
            <div className="space-y-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className={`w-full p-3 rounded-lg border text-left transition-colors ${
                    selectedTemplate === template.id
                      ? 'bg-blue-50 border-blue-200 text-blue-900'
                      : 'bg-white border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-gray-500">{template.description}</div>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded ${
                      template.category === 'test' ? 'bg-yellow-100 text-yellow-800' :
                      template.category === 'production' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {template.category === 'test' ? '测试' :
                       template.category === 'production' ? '生产' : '自定义'}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 支付表单 */}
      <form onSubmit={handlePaymentSubmit} className="p-6 space-y-6">
        {/* 支付状态提示 */}
        {paymentStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-green-600 mr-3">✓</div>
              <div>
                <div className="text-green-800 font-medium">支付成功</div>
                <div className="text-green-600 text-sm">交易ID: {paymentData.transactionId}</div>
              </div>
            </div>
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-600 mr-3">✗</div>
              <div>
                <div className="text-red-800 font-medium">支付失败</div>
                <div className="text-red-600 text-sm">请检查支付信息后重试</div>
              </div>
            </div>
          </div>
        )}

        {/* 卡片信息 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">💳 卡片信息</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">卡号</label>
              <input
                type="text"
                value={formatCardNumber(paymentData.cardNumber)}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  cardNumber: e.target.value.replace(/\s/g, '')
                }))}
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={19}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">持卡人</label>
              <input
                type="text"
                value={paymentData.cardHolder}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  cardHolder: e.target.value.toUpperCase()
                }))}
                placeholder="JOHN DOE"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">有效期</label>
              <input
                type="text"
                value={paymentData.expiryDate}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  expiryDate: e.target.value
                }))}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={5}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                value={paymentData.cvv}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  cvv: e.target.value.replace(/\D/g, '')
                }))}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={4}
              />
            </div>
          </div>
        </div>

        {/* 支付金额 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">💰 支付金额</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">金额</label>
              <input
                type="number"
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  amount: e.target.value
                }))}
                placeholder="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">货币</label>
              <select
                value={paymentData.currency}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  currency: e.target.value
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="JPY">JPY (日元)</option>
                <option value="USD">USD (美元)</option>
                <option value="EUR">EUR (欧元)</option>
                <option value="CNY">CNY (人民币)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">商户ID</label>
              <input
                type="text"
                value={paymentData.merchantId}
                onChange={(e) => setPaymentData(prev => ({
                  ...prev,
                  merchantId: e.target.value
                }))}
                placeholder="MERCHANT_001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* 交易信息 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">📋 交易信息</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">交易ID</label>
            <input
              type="text"
              value={paymentData.transactionId}
              onChange={(e) => setPaymentData(prev => ({
                ...prev,
                transactionId: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">自动生成的唯一交易标识符</p>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={() => {
              setPaymentData({
                cardNumber: '',
                cardHolder: '',
                expiryDate: '',
                cvv: '',
                amount: '',
                currency: 'JPY',
                merchantId: '',
                transactionId: ''
              })
              setSelectedTemplate('')
              setPaymentStatus('idle')
            }}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            重置
          </button>
          
          <button
            type="submit"
            disabled={isProcessing || !paymentData.cardNumber || !paymentData.amount}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                处理中...
              </div>
            ) : (
              '提交支付'
            )}
          </button>
        </div>
      </form>

      {/* 快速操作 */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <h4 className="text-sm font-medium text-gray-700 mb-3">⚡ 快速操作</h4>
        <div className="flex space-x-2">
          <button
            onClick={() => applyTemplate(templates[0])}
            className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors"
          >
            测试支付 ¥1000
          </button>
          <button
            onClick={() => applyTemplate(templates[1])}
            className="px-3 py-1 text-xs bg-orange-100 text-orange-800 rounded hover:bg-orange-200 transition-colors"
          >
            高额测试 ¥50000
          </button>
          <button
            onClick={smartAutoFill}
            className="px-3 py-1 text-xs bg-purple-100 text-purple-800 rounded hover:bg-purple-200 transition-colors"
          >
            智能填入
          </button>
        </div>
      </div>
    </div>
  )
}
