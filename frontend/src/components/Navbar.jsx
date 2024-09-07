import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe, reset, logout } from "../features/auth/authSlice"; // Adjust the import path

const Navbar = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(getMe());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset()); // Optionally reset the state after logout
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            {isLoading && <p>Loading...</p>}
            {isError && <p className="text-danger">Error: {message}</p>}
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/add-listings' className="nav-link active">
                  Add Products
                </Link>
              </li>
              {user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      {user.firstName} <FaUser />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <button className="nav-link btn" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Sign Up <FaUser />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
