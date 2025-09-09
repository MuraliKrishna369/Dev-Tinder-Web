import { useReducer, useRef, useState } from "react"
import UserCard from "./UserCard"
import axios from "axios";
import {BASE_URL} from "../utils/constants"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({user}) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [about, setAbout] = useState(user.about)
    const [showToast, setShowToast] = useState(false)
    

    const dispatch = useDispatch()

    const handleEditProfileForm = async (event) => {
        event.preventDefault()
        try{
          const res = await axios.put(BASE_URL+"/profile/edit", {
          firstName, lastName, age, gender, photoUrl, about
          }, {withCredentials: true})
          dispatch(addUser(res.data))
          setTimeout(() => {
            setShowToast(false)
          }, 3000)
          setShowToast(true)
        }
        catch(err){
          console.log(err)
        }
        
    }
    return(
    <div className="flex flex-col p-2">
      {showToast &&
      <div className="max-w-1/2 self-center bg-success rounded-lg p-2 my-2">
          <span className="text-sm font-medium">Profile updated successfully</span>
      </div>
      }
      <div className="flex flex-wrap justify-around items-center ">
        <div className="bg-base-300 rounded-2xl">    
            <form onSubmit={handleEditProfileForm} className="card-body">
              <h1 className="text-center">Edit Profile</h1>
              <fieldset className="fieldset">
                <label className="label">First name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)}  type="text" className="input" />
                <label className="label">Last name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="input" />
                <label className="label">photoUrl</label>
                <input onChange={(e) => setPhotoUrl(e.target.value)}  type="file" className="input h-6" />
                <label className="label">About</label>
                <textarea value={about} onChange={(e) => setAbout(e.target.value)} className="textarea" placeholder="Bio"></textarea>
                <label className="label">age</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} type="text" className="input" />
                <label className="label">gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="input">
                  <option></option>
                  <option>male</option>
                  <option>female</option>
                  <option>other</option>
                </select>
                <div><a className="link link-hover">Forgot password?</a></div>
                <button type="submit" className="btn btn-neutral mt-4">Save</button>
              </fieldset>
            </form>
        </div>
      
        <UserCard user={{firstName, lastName, age, gender, photoUrl, about}}/>
      
      </div>
    </div>   
  )
}

export default EditProfile