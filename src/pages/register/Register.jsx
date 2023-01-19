import './register.scss'

const Register = () => {
  return (
    <div className='register'>
        
    <div className="card">
        <div className="left">
        </div>
        <div className="right">
            <h1>Register.</h1>
            <form >
                <input type="text" placeholder='Full Name' />
                <input type="email" placeholder='Email' />
                <input type="text" placeholder='City' />
                <input type="text" placeholder='Are you a seller ?' />
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm Password" />
                <button>Register</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Register