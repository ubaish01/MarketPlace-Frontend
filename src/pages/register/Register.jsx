import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register, login, sendOtp } from '../../redux/apiCalls';
import './register.scss'

const Register = () => {
  var currentUser = useSelector ((state) => state.user.currentUser);

  const navigate = useNavigate();
  const [seller, setSeller] = useState(false);
  const [step, setStep] = useState(1);

  const [isSeller, setIsSeller] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [description, setDescription] = useState(); 
  const [address, setAddress] = useState();
  const [openingTime, setOpeningTIme] = useState();
  const [closingTime, setClosingTime] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [error, setError] = useState("");
  const dispatch = useDispatch()


  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password does not match !")
      return;
    }

    setError("")

    var body = {};

    if (isSeller) {
      console.log("inside seller body");
      body = {
        "name": name,
        "email": email,
        "phone": phone,
        "city": city,
        "address": address,
        "description": description,
        "openingTime": openingTime,
        "closingTime": closingTime,
        "isSeller": seller,
        "dp": "https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png",
        "password": password
      }
    }
    else {
      console.log("inside Nonseller body");
      body = {
        "name": name,
        "email": email,
        "phone": phone,
        "password": password,
        "city": city,
        "dp": "https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png",
        "isSeller": seller,
      }
    }

    console.log(body);

    register(body)
      .then(res => {
        console.log("inside register.then");
        const loginBody = {
          "email": email,
          "password": password,
          "isSeller": isSeller

        }
        login(dispatch, loginBody)
          .then(response => {
            console.log("inside login.then")
            setError("");
            sendOtp({
              "user_email": email,
              "user_id": response.data._id
            })
            console.log("inside otp.then")
            alert(`Account created successfully kinly verify your mail !`);
            navigate("/home")
            window.location.reload(true);
          })
          .catch((ex) => [
            console.log(ex)
          ])


        console.log("in the end")


      })
      .catch(err => {
        setError(res.data.error ? res.data.error : err.message);
      })
  }

  const resetInputs = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCity("");
    setAddress("");
    setDescription("");
    setOpeningTIme("");
    setClosingTime("");
    setPassword("");
    setConfirmPassword("");
  }


  return (
    <div className='register'>

      <div className="card">
        <div className="left">
        </div>
        <div className="right">
          <h1>Register.</h1>
          {
            isSeller
              ?
              <form >
                <label className="custom-toggle custom-toggle-primary">
                  <span>Are you a seller ? </span>
                  <input style={{ cursor: "pointer" }} type="checkbox" checked={isSeller} onClick={() => { setIsSeller(!isSeller); resetInputs(); }} />
                </label>
                {step == 1 ?
                  <>
                    <input type="text" placeholder='Seller name' value={name} onChange={(e) => { setName(e.target.value) }} />
                    <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    <input type="number" placeholder='Contact' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                    <input type="text" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} />
                    <input type="text" placeholder='Address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
                    <div>
                      <button onClick={(e) => { setStep(2); e.preventDefault() }}>Next</button>
                    </div>
                  </>
                  :
                  <>
                    <input type="text" placeholder='About the shop' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    <input type="text" placeholder='Opening time' value={openingTime} onChange={(e) => { setOpeningTIme(e.target.value) }} />
                    <input type="text" placeholder='Closing time' value={closingTime} onChange={(e) => { setClosingTime(e.target.value) }} />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    {
                      error
                      &&
                      <p style={{ color: "red", fontSize: "17px" }}>{error}</p>
                    }
                    <div>
                      <button onClick={(e) => { setStep(1); e.preventDefault() }}>Prev</button>
                      <button onClick={(e) => { handleRegister(e) }}>Register</button>
                    </div>
                  </>
                }
              </form>
              :
              <form >
                <label className="custom-toggle custom-toggle-primary">
                  <span>Are you a seller ? </span>
                  <input style={{ cursor: "pointer" }} type="checkbox" checked={isSeller} onClick={() => { setIsSeller(!isSeller); resetInputs(); }} />
                </label>
                <input type="text" placeholder='Full Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                <input type="email" placeholder='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                <input type="number" placeholder='Phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
                <input type="text" placeholder='City' value={city} onChange={(e) => { setCity(e.target.value) }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                {
                  error
                  &&
                  <p style={{ color: "red", fontSize: "17px" }}>{error}</p>
                }
                <button onClick={(e) => { handleRegister(e) }}>Register</button>
                {
                  currentUser
                  ?
                  <span>Go to home  <Link to="/home">Cick here</Link></span>
                  :
                  <span>Already have an account ? <Link to="/login">Register</Link></span>
                }
              </form>

          }
        </div>
      </div>
    </div>
  )
}

export default Register