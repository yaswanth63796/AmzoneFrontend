
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Auth.css'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const { dispatch } = useApp()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Mock registration - in real app, this would be an API call
      dispatch({
        type: 'SET_USER',
        payload: {
          email: formData.email,
          name: formData.name
        }
      })
      navigate('/')
    }
  }

  return (
    <div className="auth">
      <Link to="/">
        <div className="auth__logo">amazon</div>
      </Link>

      <div className="auth__container">
        <h1>Create Account</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="auth__field">
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="auth__error">{errors.name}</span>}
          </div>

          <div className="auth__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="auth__error">{errors.email}</span>}
          </div>

          <div className="auth__field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="auth__error">{errors.password}</span>}
          </div>

          <div className="auth__field">
            <label htmlFor="confirmPassword">Re-enter password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && <span className="auth__error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth__button">
            Continue
          </button>
        </form>

        <p className="auth__terms">
          By creating an account, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
        </p>

        <div className="auth__divider">
          <span>Already have an account?</span>
        </div>

        <Link to="/login" className="auth__createButton">
          Sign in
        </Link>
      </div>
    </div>
  )
}

export default Register