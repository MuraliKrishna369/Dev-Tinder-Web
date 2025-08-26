import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUserFromFeed} from "../utils/feedSlice"

const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender, about, _id} = user
    const dispatch = useDispatch()
    const requestSendHandler = async (status, toUserId) => {
        try {
            const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+toUserId, {}, {withCredentials: true})
            console.log(res)
            dispatch(removeUserFromFeed(toUserId))
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <div className="card bg-base-300 max-w-72 shadow-sm my-10 w-[250px]">
            <figure>
                <img
                src={photoUrl}
                alt="user-image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                <p>
                    {age &&<span>{age}</span>}
                    {gender && <span>{" " + gender}</span>}
                    
                </p>
                <p>{about}</p>
                <div className="flex justify-around my-5">
                <button className="btn btn-primary" onClick={() => requestSendHandler("igonred",_id)}>Ignored</button>
                <button className="btn btn-secondary" onClick={() => requestSendHandler("intrested",_id)}>Intrested</button>
                </div>
            </div>
        </div>
    )
}
export default UserCard