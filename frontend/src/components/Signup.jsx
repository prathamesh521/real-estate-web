import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>Register</h2>
            <form>
              <div className="mb-3">
                <label for="first-name" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="first-name"
                  name="first-name"
                />
              </div>
              <div className="mb-3">
                <label for="last-name" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="last-name"
                  name="last-name"
                />
              </div>
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

              <div className="mb-3">
                <label for="user-role" className="form-label">
                  User role
                </label>
                <select class="form-select">
                  <option selected>Select User Role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p>Already an user <Link to="/login">log in</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
