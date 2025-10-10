import React from 'react'
import { useApp } from '../context/AppContext'
import ProductGrid from '../components/products/ProductGrid'
import './Home.css'

const Home = () => {
  const { state } = useApp()

  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1200"
          alt="Amazon Banner"
        />

        <div className="home__section">
          <h2>Today's Deals</h2>
          <ProductGrid products={state.products} />
        </div>

        <div className="home__section">
          <h2>Popular Products</h2>
          <ProductGrid products={state.products.slice(0, 4)} />
        </div>
      </div>
    </div>
  )
}

export default Home