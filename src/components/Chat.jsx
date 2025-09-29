import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { createSocketConnection } from "../utils/socket"
import { FaVideo } from "@react-icons/all-files/fa/FaVideo";
import { MdCall } from "@react-icons/all-files/md/MdCall";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const {targetUserId} = useParams()
  const targetUser = useSelector(store => store.chat)
  const user = useSelector(store => store.user)
  const userId = user?._id
  const [status, setStatus] = useState("")
  const fetchChat = async () => {
        try{
            const chat = await axios.get(BASE_URL+"/chat/"+targetUserId, {withCredentials: true})
            setMessages(chat?.data?.messages)  
            
        }
        catch(err){
            console.log(err)
        }
        
       
        
  }

  useEffect(() => {
    
    
      fetchChat()

    
  }, [])

  useEffect(() => {
    if (userId === undefined) {
        return ;
    }
    const socket = createSocketConnection()
    socket.emit("joinChat", {firstName: user.firstName, userId, targetUserId})
    
    // socket.emit("sendStatus", {firstName: user.firstName, userId, targetUserId, status: "online"})

    // socket.on("receiveStatus", (obj) => {
    //     console.log(obj)
    //     if (obj.targetUserStatus.userId !== userId){
    //         setStatus(obj.targetUserStatus.status)
    //     }
        
       
    // })


    socket.on("receiveMessage", (message) => {
        console.log(message)
        setMessages(prev => [...prev, message])
    })
   
    return () => {
        //socket.emit("sendStatus", {firstName: user.firstName, userId, targetUserId, status: Date()})
        socket.disconnect()
    }
  }, [userId, targetUserId, targetUser])

  const sendMessage = () => {
    const socket = createSocketConnection()
    socket.emit("sendMessage", {firstName: user.firstName, userId, targetUserId, text: newMessage})
    setNewMessage("")
 
  }
 
  return (
    <div className="flex justify-center p-2">
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press Confirm To Clear Chat</p>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn">Confirm</button>
                </form>
                </div>
            </div>
        </dialog>
        <div className="border border-gray-600 rounded-lg">
            <div className="bg-base-300 p-2 rounded-lg flex justify-between">
                <div className="flex items-center">
                    <img className="w-10 rounded-full" src={targetUser.photoUrl}/>
                    <div className="ml-1 mt-2 flex flex-col">
                        <p className="text-xs">{targetUser.firstName + " " + targetUser.lastName}</p>
                        <p className="text-[8px] mt-1">{status !== "" ? status : ""}</p>
                    </div>
                </div>
                <div className="w-25 flex items-center justify-around">
                    <MdCall />
                    <FaVideo/>
                    
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <BsThreeDotsVertical/>
                        </div>
                        <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 w-26 p-2 shadow text-xs cursor-pointer">
                            <li className="p-2 hover:bg-base-300 rounded-lg" onClick={()=>document.getElementById('my_modal_5').showModal()}>clear chat</li>
                            <li className="p-2 hover:bg-base-300 rounded-lg">export chat</li>
                            
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div className="h-[70vh] text-xs overflow-auto">
                {messages.map((message, index) => {
                    return (
                        <div key={message._id || index} className={message.senderId === user._id ? "chat chat-end" : "chat chat-start"}>
                            <div className="chat-header">
                               {message.senderId === user._id ? "You": targetUser.firstName}
                            </div>
                        <div className="chat-bubble">{message.message}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    )
                })}
                

            </div>
            <div className="flex justify-center">
                <>
                    <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type here" className="input" />
                    <button className="btn btn-secondary" onClick={() => sendMessage()}>Send</button>
                </>
            </div>
        </div>
    </div>
  )
}

export default Chat
