import './login.scss'

const Login = () => {
  return (
    <div className='login'>
        
    <div className="card">
        <div className="left">
        </div>
        <div className="right">
            <h1>Login.</h1>
            <form >
                <input type="email" />
                <input type="password" />
                <button>Login</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Login