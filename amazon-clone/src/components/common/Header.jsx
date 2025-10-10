import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import './Header.css'

const Header = () => {
  const { state, dispatch } = useApp()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/')
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search functionality would go here
    console.log('Searching for:', searchTerm)
  }

  return (
    <header className="header">
      <div className="header__top">
        <Link to="/" className="header__logo">
          <span className="header__logoText">DRV STORE</span>
        </Link>

        <div className="header__delivery">
          <span className="header__lineOne">DEVANDOODY</span>
          <span className="header__lineTwo">ANCHETTY </span>
        </div>

        <form className="header__search" onSubmit={handleSearch}>
          <select className="header__searchSelect">
            <option>All</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Home</option>
          </select>
          <input
            type="text"
            className="header__searchInput"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="header__searchButton">
            🔍
          </button>
        </form>

        <div className="header__nav">
          <div className="header__option">
            <span className="header__lineOne">Hello,</span>
            {state.user ? (
              <span className="header__lineTwo" onClick={handleLogout}>
                Sign Out
              </span>
            ) : (
              <Link to="/login" className="header__lineTwo">
                Sign In
              </Link>
            )}
          </div>

          <div className="header__option">
            <span className="header__lineOne">Returns</span>
            <span className="header__lineTwo">& Orders</span>
          </div>

          <div className="header__option">
            <span className="header__lineOne">Your</span>
            <span className="header__lineTwo">Prime</span>
          </div>

          <Link to="/cart" className="header__optionBasket">
            🛒
            <span className="header__basketCount">{state.cart.itemCount}</span>
          </Link>
        </div>
      </div>

      <div className="header__bottom">
        <div className="header__bottomLeft">
          <span>All</span>
          <span>Today's Deals</span>
          <span>Customer Service</span>
          <span>Registry</span>
          <span>Gift Cards</span>
          <span>Sell</span>
        </div>
        <div className="header__bottomRight">
          <span>Shop deals in Electronics</span>
        </div>
      </div>
    </header>
  )
}

export default Header