import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if(formData){
      dispatch(login(formData));
    }
  };

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {

    if(isError){
      alert('wrong credentials');
    }

    if(isSuccess){
      navigate('/');
    }

    dispatch(reset());

  }, [user, isLoading, isSuccess, isError, message]);

  return (
    <>
    <Navbar />
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6">
          <h2>Login</h2>
          <form onSubmit={onSubmit}>
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