import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <h2>Login</h2>
          <form>
            <div className="mb-3">
              <label for="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label for="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
              />
            </div>

            

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
          <p>I want to <Link to="/register">register</Link></p>
        </div>
      </div>
    </div>
  </>
  )
}

export default Login