import axios from 'axios'
import  { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'

const Connections = () => {
  const connections = useSelector(store => store.connection)
  const dispatch = useDispatch()
  const fetchConnections = async () => {
    try{
        const res = await axios.get(BASE_URL+"/user/connections", {withCredentials: true})
        dispatch(addConnections(res.data))
    }
    catch(err) {
        console.log(err)
    }
  }
  useEffect(() => {
    fetchConnections()
  }, [])
  console.log(connections)
  return (
    <div>
        <h1 className='text-center my-3 font-medium text-2xl'>Connections</h1>
        {connections &&
        <div className='border-2 border-white p-2 flex flex-col '>
            {connections.map(user => {
                const {_id, firstName, lastName, age, gender, about, photoUrl} = user;
                return (
                    <div key={_id} className='flex items-center text-sm bg-base-200 m-2 p-2 rounded-lg self-center sm:w-[640px]'>
                        <div className='flex flex-col items-center mr-3'>
                            <img className='w-20 rounded-full ' alt="user-image" src={photoUrl}/>
                            <button className="btn btn-xs  btn-primary">Message</button>
                        </div>
                        <div>
                            <h2 className='text-lg'>{firstName + " " + lastName}</h2>
                            <p>{age && gender && age + " " + gender}</p>
                            <p className='text-xs'>{about}</p>
                        </div>
                    </div>
                )
            })}
            
                
           
        </div>
        }
    </div>
  )
}

export default Connections
