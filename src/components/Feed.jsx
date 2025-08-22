import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addFeed} from "../utils/feedSlice"
import UserCard from "./UserCard"

const Feed = () => {
    const feed = useSelector(store => store.feed)
    const dispatch = useDispatch()
    useEffect(() => {
        getFeed()
    }, [])
    const getFeed = async () => {
        try{
            const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
            dispatch(addFeed(res.data))
        }
        catch(err){

        }
        
    }
    return (
        <div>
            {feed && <UserCard user={feed[0]}/>}
            
        </div>
    )
}
export default Feed