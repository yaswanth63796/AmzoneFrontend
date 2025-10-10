import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import './Auth.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Mock login - in real app, this would be an API call
      dispatch({
        type: 'SET_USER',
        payload: {
          email: formData.email,
          name: formData.email.split('@')[0]
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
        <h1>Sign-In</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="auth__field">
            <label htmlFor="email">Email or mobile phone number</label>
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
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="auth__error">{errors.password}</span>}
          </div>

          <button type="submit" className="auth__button">
            Continue
          </button>
        </form>

        <p className="auth__terms">
          By continuing, you agree to Amazon's <a href="#">Conditions of Use</a> and <a href="#">Privacy Notice</a>.
        </p>

        <div className="auth__divider">
          <span>New to Amazon?</span>
        </div>

        <Link to="/register" className="auth__createButton">
          Create your Amazon account
        </Link>
      </div>
    </div>
  )
}

export default Login