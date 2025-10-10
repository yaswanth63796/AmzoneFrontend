import React from 'react'
import { useApp } from '../../context/AppContext'
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { dispatch } = useApp()

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
    
    // Add to cart animation
    const button = document.querySelector(`#product-${product.id}`)
    if (button) {
      button.classList.add('adding')
      setTimeout(() => button.classList.remove('adding'), 600)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        {i < rating ? '★' : '☆'}
      </span>
    ))
  }

  return (
    <div className="productCard">
      <div className="productCard__image">
        <img src={product.image} alt={product.title} />
      </div>
      
      <div className="productCard__info">
        <h3 className="productCard__title">{product.title}</h3>
        
        <div className="productCard__rating">
          <div className="productCard__stars">
            {renderStars(product.rating)}
          </div>
          <span className="productCard__reviews">({product.reviews})</span>
        </div>
        
        <div className="productCard__price">
          <strong>${product.price}</strong>
        </div>
        
        <div className="productCard__shipping">
          FREE delivery
        </div>
        
        <button
          id={`product-${product.id}`}
          className="productCard__addButton"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard