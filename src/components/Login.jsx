import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import {addUser} from "../utils/userSlice"
import { useNavigate } from "react-router"


const Login = () => {
  const [emailId, setEmail] = useState("murali@gmail.com")
  const [password, setPassword] = useState("Murali@123")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmitForm = async (event) => {
      event.preventDefault()
      try {
        const response = await axios.post("http://localhost:7777/login", {
          emailId,
          password
        }, {mode: 'cors', withCredentials: true})
        
        dispatch(addUser(response.data.user))
        navigate("/feed")
      } catch (error) {
         console.error(error.message)
      }
      
  }
  return (
      <div className="hero bg-base-200 min-h-screen">
        <div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmitForm} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input value={emailId} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />
                <div><a className="link link-hover">Forgot password?</a></div>
                <button type="submit" className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
  )
}

export default Login
