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
          src="https://media.istockphoto.com/id/1279960855/photo/woman-diwali-celebrate-stock-photo.jpg?s=2048x2048&w=is&k=20&c=DbKd0P-hsVV9ZqC4rEaH9pWTInCcYQbIvKjEY5lca-8="
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