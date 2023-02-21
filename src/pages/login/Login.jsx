import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './login.scss'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/apiCalls';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);
  const { isFetching, error } = useSelector((state) => state.user);
  const [showError,setShowError] = useState();
  var currentUser = useSelector((state) => state.user.currentUser);


  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault();
    const body = {
      "email": email,
      "password": password,
      "isSeller": isSeller
    }

    login(dispatch, body)
    setShowError(error);
    console.log("HERE");
  }
  return (
    <div className='login'>
      {
        !currentUser
          ?

          <div className="card">
            <div className="left">
            </div>
            <div className="right">
              <h1>Login.</h1>
              <form >
                <label className="custom-toggle custom-toggle-primary">
                  <span>Are you a seller ? </span>
                  <input style={{ cursor: "pointer" }} type="checkbox" checked={isSeller} onClick={() => { setIsSeller(!isSeller) }} />
                </label>
                <input type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} />
                <input type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} />
                <button disabled={isFetching} onClick={(e) => { handleLogin(e) }}>Login</button>
                {
                  showError ?
                <span className="error">Incorrect email or password</span>
                  :''
                }
                <span>Don't have account ? <Link to="/register">Register</Link></span>
              </form>
            </div>
          </div> :
          <Navigate to="/home" />
      }
    </div>

  )
}

export default Login