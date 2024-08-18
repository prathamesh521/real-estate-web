import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if(formData){
      dispatch(register(formData));
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);

  useEffect(() => {

    if(isError){
      alert('You got an error: ',message);
    }

    if(isSuccess){
      navigate('/login');
    }

    dispatch(reset());

  }, [user, isLoading, isSuccess, isError, message]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>Register</h2>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label for="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  onChange={onChange}
                />
              </div>
              <div className="mb-3">
                <label for="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  onChange={onChange}
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
                  onChange={onChange}
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
                  onChange={onChange}
                />
              </div>

              <div className="mb-3">
                <label for="user-role" className="form-label">
                  User role
                </label>
                <select class="form-select" name="role" onChange={onChange}>
                  <option selected>Select User Role</option>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p>
              Already an user <Link to="/login">log in</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
