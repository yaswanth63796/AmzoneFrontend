import React from 'react'
import ProductCard from './ProductCard'
import './ProductGrid.css'

const ProductGrid = ({ products }) => {
  return (
    <div className="productGrid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid