import React from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Cart.css'

const Cart = () => {
  const { state, dispatch } = useApp()

  // ✅ Safe defaults
  const cartItems = state?.cart?.items || []
  const itemCount = state?.cart?.itemCount || 0
  const total = state?.cart?.total || 0

  const updateQuantity = (id, quantity) => {
    if (quantity === 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    }
  }

  const removeItem = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  const incrementQuantity = (id, currentQuantity) => {
    updateQuantity(id, currentQuantity + 1)
  }

  const decrementQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1)
    } else {
      removeItem(id)
    }
  }

  const clearCart = () => {
    cartItems.forEach(item => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })
    })
  }

  // ✅ Handle empty cart
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

  // ✅ Render cart items
  return (
    <div className="cart">
      <div className="cart__container">
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
