import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests } from "../utils/requestSlice"


const Requests = () => {
  const connectionRequestData = useSelector(store => store.request)
  const dispatch = useDispatch()
  const fetchRequests = async () => {
    try{
      const res = await axios.get(BASE_URL+"/user/request/received", {withCredentials: true})
      dispatch(addRequests(res.data.connectionRequestData))
    }
    catch(err){
      console.log(err)
    }
    
  }
  useEffect(() => {
    fetchRequests()
  },[])
  console.log(connectionRequestData)
  return (
    <div>
       <h1 className='text-center my-3 font-medium text-2xl'>Requests</h1>
        <div className='border-2 border-white p-2 flex flex-col '>
            <div className="flex items-center self-center  bg-base-200 p-2 my-2">
               <img className='w-15 rounded-full' alt="user-image" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRoW8Hwq7_US6t0v3ppB7H7WK8PDY9Ds5CRKX6nDqFKAc42G8D3P8RWO8lJxkxi5CChaPj7QYszO6bGrbRmVXCatmo2PbGM9qnyzTeIblk"/>
                <p className='text-sm mx-3'><span>Elon Musk</span> <span>sent connection request, 2 days ago</span></p>
                <div className="flex justify-between min-w-[140px]">
                  <button className="btn btn-sm btn-primary">Reject</button>
                  <button className="btn btn-sm btn-secondary">Accept</button>
                </div> 
            </div>    
        </div>
    </div>
  )
}

export default Requests
