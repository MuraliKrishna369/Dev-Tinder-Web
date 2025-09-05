import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import {addUser} from "../utils/userSlice"
import { useNavigate } from "react-router"
import { BASE_URL } from "../utils/constants"


const Login = () => {
  const [emailId, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [error, setError] = useState("")
  const [isLoginForm, setIsLoginForm] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmitForm = async (event) => {
      event.preventDefault()
      try {
        if(isLoginForm){
          const res = await axios.post(BASE_URL + "/login", {
            emailId,
            password
          }, {withCredentials: true})
          dispatch(addUser(res.data))
          navigate("/")
          return 
        }
        const res = await axios.post(BASE_URL + "/signup", {
          firstName,
          lastName,
          emailId,
          password
        }, {withCredentials: true})
        dispatch(addUser(res.data))
        navigate("/")
      } catch (error) {
        setError(error?.res?.data || "Somthing went wrong")
      }
      
  }
  return (
      <div className="hero bg-base-200 min-h-screen">
        <div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmitForm} className="card-body">
              <fieldset className="fieldset">
                {
                  !isLoginForm && 
                  <>
                    <label className="label">First name</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className="input" placeholder="First name" />
                    <label className="label">Last name</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" placeholder="Last name" />
                  </>
                }
                <label className="label">Email</label>
                <input value={emailId} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />
                
                <div><a className="link link-hover">{isLoginForm && "Forgot password?" }</a></div>
                <p className="text-red-500">{error}</p>
                <button type="submit" className="btn btn-neutral mt-4">{isLoginForm? "Login": "SignUp"}</button>
                <a className="mt-1 link link-hover" onClick={() => setIsLoginForm(value => !value)}>{isLoginForm ? <span>New user? Signup</span> : <span>Existing user? Login</span>}</a>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login
