import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import './Checkout.css'

const Checkout = () => {
  const { state } = useApp()
  const [selectedPayment, setSelectedPayment] = useState('visa')
  const [selectedDelivery, setSelectedDelivery] = useState('standard')
  const [isGift, setIsGift] = useState(false)
  const [promoCode, setPromoCode] = useState('')

  const tax = state.cart.total * 0.08
  const orderTotal = state.cart.total + tax

  const handlePlaceOrder = () => {
    // In a real app, this would process the order
    alert('Order placed successfully! This is a demo.')
  }

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      alert(`Promo code "${promoCode}" applied! (This is a demo)`)
    }
  }

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__left">
          <h1>Checkout (<span>{state.cart.itemCount} items</span>)</h1>
          
          {/* Progress Steps */}
          <div className="checkout__progress">
            <div className="checkout__progressStep active">
              <div className="checkout__progressNumber">1</div>
              <div className="checkout__progressLabel">Shipping</div>
            </div>
            <div className="checkout__progressStep active">
              <div className="checkout__progressNumber">2</div>
              <div className="checkout__progressLabel">Payment</div>
            </div>
            <div className="checkout__progressStep">
              <div className="checkout__progressNumber">3</div>
              <div className="checkout__progressLabel">Place Order</div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="checkout__section">
            <h2>1. Delivery Address</h2>
            <div className="checkout__address">
              <p><strong>John Doe</strong></p>
              <p>123 Main Street</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
              <p>📞 Phone: +1 (555) 123-4567</p>
            </div>
            <div className="checkout__addressActions">
              <button className="checkout__addressButton">Change address</button>
              <button className="checkout__addressButton">Add delivery instructions</button>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="checkout__section">
            <h2>2. Delivery Options</h2>
            <div className="checkout__deliveryOptions">
              <div 
                className={`checkout__deliveryOption ${selectedDelivery === 'standard' ? 'selected' : ''}`}
                onClick={() => setSelectedDelivery('standard')}
              >
                <input 
                  type="radio" 
                  name="delivery" 
                  checked={selectedDelivery === 'standard'}
                  onChange={() => setSelectedDelivery('standard')}
                />
                <div className="checkout__deliveryInfo">
                  <div className="checkout__deliveryDate">Tomorrow</div>
                  <div className="checkout__deliveryType">FREE Standard Delivery</div>
                </div>
                <div className="checkout__deliveryPrice">FREE</div>
              </div>
              
              <div 
                className={`checkout__deliveryOption ${selectedDelivery === 'express' ? 'selected' : ''}`}
                onClick={() => setSelectedDelivery('express')}
              >
                <input 
                  type="radio" 
                  name="delivery" 
                  checked={selectedDelivery === 'express'}
                  onChange={() => setSelectedDelivery('express')}
                />
                <div className="checkout__deliveryInfo">
                  <div className="checkout__deliveryDate">Today by 10 PM</div>
                  <div className="checkout__deliveryType">Express Delivery</div>
                </div>
                <div className="checkout__deliveryPrice">$9.99</div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="checkout__section">
            <h2>3. Payment Method</h2>
            <div className="checkout__paymentMethods">
              <div 
                className={`checkout__paymentMethod ${selectedPayment === 'visa' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('visa')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedPayment === 'visa'}
                  onChange={() => setSelectedPayment('visa')}
                />
                <span className="checkout__paymentIcon">💳</span>
                <div>
                  <div>Visa ending in 1234</div>
                  <div style={{ fontSize: '12px', color: '#565959' }}>Expires 12/2025</div>
                </div>
              </div>
              
              <div 
                className={`checkout__paymentMethod ${selectedPayment === 'paypal' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('paypal')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedPayment === 'paypal'}
                  onChange={() => setSelectedPayment('paypal')}
                />
                <span className="checkout__paymentIcon">🔵</span>
                <div>PayPal</div>
              </div>
              
              <div 
                className={`checkout__paymentMethod ${selectedPayment === 'amazon' ? 'selected' : ''}`}
                onClick={() => setSelectedPayment('amazon')}
              >
                <input 
                  type="radio" 
                  name="payment" 
                  checked={selectedPayment === 'amazon'}
                  onChange={() => setSelectedPayment('amazon')}
                />
                <span className="checkout__paymentIcon">📦</span>
                <div>Amazon Pay</div>
              </div>
            </div>
            <div className="checkout__addressActions">
              <button className="checkout__addressButton">Add payment method</button>
            </div>
          </div>

          {/* Items Review */}
          <div className="checkout__section">
            <h2>4. Review items and delivery</h2>
            <div className="checkout__items">
              {state.cart.items.map(item => (
                <div key={item.id} className="checkout__item">
                  <img src={item.image} alt={item.title} />
                  <div className="checkout__itemInfo">
                    <p className="checkout__itemTitle">{item.title}</p>
                    <p className="checkout__itemQuantity">Quantity: {item.quantity}</p>
                    <p className="checkout__itemPrice">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gift Options */}
          <div className="checkout__section">
            <h2>Gift options</h2>
            <div className="checkout__giftOptions">
              <div className="checkout__giftOption">
                <input 
                  type="checkbox" 
                  id="gift" 
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                />
                <label htmlFor="gift">This is a gift</label>
              </div>
              
              {isGift && (
                <div className="checkout__giftMessage">
                  <label htmlFor="giftMessage">Add a gift message (optional):</label>
                  <textarea 
                    id="giftMessage" 
                    placeholder="Enter your gift message here..."
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="checkout__right">
          <div className="checkout__orderSummary">
            <h3>Order Summary</h3>
            
            <div className="checkout__summaryRow">
              <span>Items ({state.cart.itemCount}):</span>
              <span>${state.cart.total.toFixed(2)}</span>
            </div>
            
            <div className="checkout__summaryRow">
              <span>Shipping & handling:</span>
              <span>$0.00</span>
            </div>
            
            <div className="checkout__summaryRow">
              <span>Total before tax:</span>
              <span>${state.cart.total.toFixed(2)}</span>
            </div>
            
            <div className="checkout__summaryRow">
              <span>Estimated tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            <div className="checkout__summaryTotal">
              <span>Order total:</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>

            <button 
              className="checkout__placeOrderButton"
              onClick={handlePlaceOrder}
            >
              Place your order
            </button>
            
            <div className="checkout__secureCheckout">
              <span>🔒</span>
              <span>Secure checkout</span>
            </div>

            {/* Promo Code */}
            <div className="checkout__promoCode">
              <h4>Apply promo code</h4>
              <div className="checkout__promoInput">
                <input 
                  type="text" 
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button 
                  className="checkout__promoButton"
                  onClick={applyPromoCode}
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Return Policy */}
            <div className="checkout__returnPolicy">
              <p>
                <a href="#">Amazon.com Return Policy</a> applies. By placing your order, you agree to 
                Amazon's <a href="#">Privacy Notice</a> and <a href="#">Conditions of Use</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout