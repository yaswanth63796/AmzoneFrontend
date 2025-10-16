import React from 'react';
import './ProductCard.css';

const BACKEND_URL = 'https://amazonebackend-b1ma.onrender.com/api/cart';

const ProductCard = ({ product }) => {

  // ✅ Add product to backend cart
  const handleAddToCart = async () => {
    try {
      await fetch(BACKEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id.toString(),
          title: product.title,
          price: product.price,
          image: product.image,
          quantity: 1
        }),
      });
      alert(`${product.title} added to cart! 🛒`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star'}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="productCard">
      <div className="productCard__image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="productCard__info">
        <h3 className="productCard__title">{product.title}</h3>

        <div className="productCard__rating">
          <div className="productCard__stars">{renderStars(product.rating)}</div>
          <span className="productCard__reviews">({product.reviews})</span>
        </div>

        <div className="productCard__price">
          <strong>${product.price}</strong>
        </div>

        <div className="productCard__shipping">FREE delivery</div>

        <button
          id={`product-${product.id}`}
          className="productCard__addButton"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
