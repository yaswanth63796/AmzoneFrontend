import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'

const BACKEND_URL = 'https://amazonebackend-b1ma.onrender.com/api/cart'

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)

  // 🧠 Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const res = await fetch(BACKEND_URL)
      const data = await res.json()
      setCartItems(data)
    } catch (error) {
      console.error('Error fetching cart:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  // 🟢 Increment quantity
  const incrementQuantity = async (id, currentQuantity) => {
    try {
      await fetch(`${BACKEND_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: currentQuantity + 1 }),
      })
      fetchCart()
    } catch (error) {
      console.error('Error incrementing quantity:', error)
    }
  }

  // 🔻 Decrement quantity (delete if goes to 0)
  const decrementQuantity = async (id, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        await fetch(`${BACKEND_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: currentQuantity - 1 }),
        })
        fetchCart()
      } catch (error) {
        console.error('Error decrementing quantity:', error)
      }
    } else {
      removeItem(id)
    }
  }

  // ❌ Remove item
  const removeItem = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/${id}`, {
        method: 'DELETE',
      })
      fetchCart()
    } catch (error) {
      console.error('Error removing item:', error)
    }
  }

  // 🧹 Clear all items
  const clearCart = async () => {
    try {
      await fetch(BACKEND_URL, {
        method: 'DELETE',
      })
      fetchCart()
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  // 🧮 Calculate totals
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (loading) {
    return <div className="cart"><h2>Loading cart...</h2></div>
  }

  // 🛍 Empty cart message
  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart__empty">
          <div className="cart__emptyIcon">🛒</div>
          <h2>Your Amazon Cart is empty</h2>
          <p>
            Your shopping cart is waiting. Give it purpose – fill it with groceries,
            clothing, household supplies, electronics and more.
          </p>
          <div className="cart__emptyActions">
            <Link to="/" className="cart__shoppingButton">
              Continue shopping
            </Link>
            <Link to="/login" className="cart__signInButton">
              Sign in to your account
            </Link>
            <Link to="/register" className="cart__signUpButton">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart">
      <div className="cart__container">
        {/* LEFT SIDE */}
        <div className="cart__left">
          <div className="cart__header">
            <h1>Shopping Cart</h1>
            <span className="cart__priceLabel">Price</span>
          </div>

          <div className="cart__divider"></div>

          <div className="cart__items">
            {cartItems.map(item => (
              <div key={item.id} className="cart__item">
                <div className="cart__itemImage">
                  <img src={item.image} alt={item.title} />
                </div>

                <div className="cart__itemInfo">
                  <h3 className="cart__itemTitle">{item.title}</h3>
                  <p className="cart__itemStock">In Stock</p>
                  <p className="cart__itemShipping">
                    FREE delivery <strong>Tomorrow</strong>
                  </p>

                  <div className="cart__itemActions">
                    <div className="cart__quantity">
                      <label>Qty: </label>
                      <div className="cart__quantityControls">
                        <button
                          className="cart__quantityBtn"
                          onClick={() => decrementQuantity(item.id, item.quantity)}
                        >
                          −
                        </button>
                        <span className="cart__quantityDisplay">{item.quantity}</span>
                        <button
                          className="cart__quantityBtn"
                          onClick={() => incrementQuantity(item.id, item.quantity)}
                        >
                          +
                        </button>
                      </div>
                      <span className="cart__dividerVertical">|</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="cart__deleteButton"
                      >
                        Delete
                      </button>
                      <span className="cart__dividerVertical">|</span>
                      <button className="cart__saveButton">Save for later</button>
                    </div>
                  </div>
                </div>

                <div className="cart__itemPrice">
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  <span className="cart__itemPriceEach">
                    ${item.price} each
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart__subtotal">
            <div className="cart__subtotalLeft">
              Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):
              <strong> ${total.toFixed(2)}</strong>
            </div>
            <button onClick={clearCart} className="cart__clearButton">
              Clear all items
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="cart__right">
          <div className="cart__checkout">
            <div className="cart__checkoutHeader">
              <p className="cart__subtotalRight">
                Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):
                <strong> ${total.toFixed(2)}</strong>
              </p>
              <p className="cart__gift">
                <input type="checkbox" id="gift" />
                <label htmlFor="gift">This order contains a gift</label>
              </p>
            </div>

            <Link to="/checkout" className="cart__checkoutButton">
              Proceed to Checkout
            </Link>

            <div className="cart__secureCheckout">
              <span>🔒</span>
              <span>Secure checkout</span>
            </div>

            <div className="cart__benefits">
              <h4>Benefits of your account</h4>
              <ul>
                <li>✔️ Faster checkout</li>
                <li>✔️ Order tracking</li>
                <li>✔️ Purchase history</li>
                <li>✔️ Wish list</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

