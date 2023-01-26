import { useState } from 'react'
import './register.scss'

const Register = () => {
  const [seller, setSeller] = useState(false);
  const [step, setStep] = useState(1);
  return (
    <div className='register'>

      <div className="card">
        <div className="left">
        </div>
        <div className="right">
          <h1>Register.</h1>
          {
            seller
              ?
              <form >
                <label className="custom-toggle custom-toggle-primary">
                  <span>Are you a seller ? </span>
                  <input style={{ cursor: "pointer" }} type="checkbox" checked={seller} onClick={() => { setSeller(!seller) }} />
                </label>
                {step == 1 ?
                  <>
                    <input type="text" placeholder='Seller name' />
                    <input type="email" placeholder='Email' />
                    <input type="number" placeholder='Contact' />
                    <input type="text" placeholder='City' />
                    <input type="text" placeholder='Address' />
                    <div>
                      <button onClick={(e) => { setStep(2); e.preventDefault() }}>Next</button>
                    </div>
                  </>
                  :
                  <>
                    <input type="text" placeholder='About the shop ' />
                    <input type="text" placeholder='Opening time' />
                    <input type="text" placeholder='Closing time' />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Confirm Password" />
                    <div>
                      <button onClick={(e) => { setStep(1); e.preventDefault() }}>Prev</button>
                      <button onClick={(e) => { console.log("registered"); e.preventDefault() }}>Register</button>
                    </div>
                    </>
                }
              </form>
              :
              <form >
                <label className="custom-toggle custom-toggle-primary">
                  <span>Are you a seller ? </span>
                  <input style={{ cursor: "pointer" }} type="checkbox" checked={seller} onClick={() => { setSeller(!seller) }} />
                </label>
                <input type="text" placeholder='Full Name' />
                <input type="email" placeholder='Email' />
                <input type="text" placeholder='City' />
                <input type="text" placeholder='Are you a seller ?' />
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
                <button>Register</button>
              </form>

          }
        </div>
      </div>
    </div>
  )
}

export default Register