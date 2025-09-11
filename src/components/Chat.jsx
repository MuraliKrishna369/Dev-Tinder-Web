import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import { createSocketConnection } from "../utils/socket"
import { FaVideo } from "@react-icons/all-files/fa/FaVideo";
import { MdCall } from "@react-icons/all-files/md/MdCall";
import { BsThreeDotsVertical } from "@react-icons/all-files/bs/BsThreeDotsVertical";

const Chat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const {targetUserId} = useParams()
  const targetUser = useSelector(store => store.chat)
  const user = useSelector(store => store.user)
  const userId = user?._id

  useEffect(() => {
      console.log(targetUser)
    if (userId === undefined) {
        return ;
    }
    const socket = createSocketConnection()
    socket.emit("joinChat", {firstName: user.firstName, userId, targetUserId})

    socket.on("receiveMessage", (message) => {
        setMessages(prev => [...prev, message])
    })
   
    return () => {
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
        <div className="border border-gray-600 rounded-lg">
            <div className="bg-base-300 p-2 rounded-lg flex justify-between">
                <div className="flex items-center">
                    <img className="w-10 rounded-full" src={targetUser.photoUrl}/>
                    <p className="ml-1 text-sm">{targetUser.firstName + " " + targetUser.lastName}</p>
                </div>
                <div className="w-25 flex items-center justify-around">
                    <MdCall />
                    <FaVideo/>
                    <BsThreeDotsVertical/>
                </div>
            </div>
            <div className="h-[70vh] text-sm">
                {messages.map((message, index) => {
                    const condtionalStyling = message.firstName === user.firstName ? "chat chat-start flex flex-col items-end" : "chat chat-start"
                    return (
                        <div key={index} className={condtionalStyling}>
                            <div className="chat-header">
                               {message.firstName === user.firstName ? "You": message.firstName}
                            </div>
                        <div className="chat-bubble">{message.text}</div>
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
