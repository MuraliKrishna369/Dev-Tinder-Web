import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequests } from "../utils/requestSlice"


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
  const reviewReqeust = async (status, id) => {
    try{
      const res = await axios.post(BASE_URL+"/request/review"+"/"+status+"/"+id, {}, {withCredentials: true})
      if(res.status === 200){
         dispatch(removeRequests(id))
      }
    }
    catch(err) {
      console.log(err)
    }
    
  }
  return (
    <div>
       <h1 className='text-center my-3 font-medium text-2xl'>Requests</h1>
        <div className='border-2 border-white p-2 flex flex-col '>
          {connectionRequestData && connectionRequestData.map(request => {
            const {firstName, lastName, photoUrl, _id} = request.fromUserId
            return (
              <div key={_id} className="flex items-center justify-between self-center  bg-base-200 p-2 my-2 sm:w-[640px]">
                <div className="flex items-center">
                  <img className='w-15 rounded-full' alt="user-image" src={photoUrl}/>
                  <p className='text-sm mx-3'><span>{firstName + " " + lastName}</span> <span>sent connection request</span></p>
                </div>
                <div className="flex justify-between min-w-[140px]">
                  <button className="btn btn-sm btn-primary">Reject</button>
                  <button className="btn btn-sm btn-secondary" onClick={() => {reviewReqeust("accepted", request._id)}}>Accept</button>
                </div> 
             </div>    
            )
          })}
            
        </div>
    </div>
  )
}

export default Requests
