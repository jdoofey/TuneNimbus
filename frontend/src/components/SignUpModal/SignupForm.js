import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css'
function SignupForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState([])
  const [displayErrors, setDisplayErrors] = useState(false)

  // if (sessionUser&&(Object.keys(sessionUser).length)) return <Redirect to="/" />;
  const validations = () => {
    let errorsArray = []
    if (password !== confirmPassword) {
      errorsArray.push("*Your passwords didn't match")
    }
    if (password.length < 6) {
      errorsArray.push("*Password must be at least 6 characters")
    }
    if (!email.includes("@")||!email.includes(".")) {

      errorsArray.push("*Please provide a valid email")
    }
    if (username.length<4) {
      errorsArray.push("*Username must be at least 4 characters")
    }
    if(username.length>20) {
      errorsArray.push("*Username must be less than 20 characters")
    }
    if (firstName.length<2) {
      errorsArray.push("*Names must be 2 characters or more")
    }
    if (lastName.length<2) {
      errorsArray.push("*Names must be 2 characters or more")
    }
    setErrors(errorsArray)
    if (errorsArray.length) setDisplayErrors(true)
    return errorsArray
  }
  useEffect(()=> {
    if(displayErrors)validations()
  }, [password,email,username,firstName,lastName])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplayErrors(false)
   let errorsArray = validations()

   if (errorsArray.length) return
   const res = await dispatch(sessionActions.signup({
      firstName, lastName, email, username, password
      }))
      .catch(async res=> {
        const data= await res.json()
        if (data&&data.errors) setErrors(Object.values(data.errors))
      })
      return res && history.push("/songs")
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id='bigbox'>
      <img style={{height:"60px"}} src='https://i.imgur.com/OHysOUL.png'></img>
      {errors.length>0 && (<div id="errors-ul">
        {errors.map((error, idx) => <li id="errors-ul" key={idx}>{error}</li>)}
      </div>)}
      <label id='email-label'>
        Email
        <input
          id='email'
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />
      </label>
      <label id='first-name-label'>
        First Name
        <input
          id='first-name'
          type="text"
          className="login-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label id='last-name-label'>
        Last Name
        <input
          id='last-name'
          type="text"
          className="login-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label id='username-label'>
        Username
        <input
          id='username'
          type="text"
          value={username}
          className="login-input"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label id='password-label'>
        Password
        <input
          id='password'
          type="password"
          value={password}
          className="login-input"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label id='confirm-password-label'>
        Confirm Password
        <input
          id='confirm-password'
          type="password"
          className="login-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <br></br>
      <button id='signup-submit-btn' type="submit">Sign Up</button>
      </div>
    </form>
  );
}

export default SignupForm;
