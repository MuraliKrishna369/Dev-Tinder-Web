import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addFeed} from "../utils/feedSlice"
import UserCard from "./UserCard"
import { useNavigate } from "react-router"

const Feed = () => {
    const feed = useSelector(store => store.feed)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        getFeed()
    }, [])
    const getFeed = async () => {
        try{
            const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
            dispatch(addFeed(res.data))
        }
        catch(err){
            console.log(err)
        } 
    }
    if (feed === null || feed.length === 0) return <h1 className="text-2xl font-medium text-center mt-2">No feed found</h1>
    return (
        <div className="flex justify-center">
            <UserCard user={feed[0]}/>
        </div>
    )
}
export default Feed