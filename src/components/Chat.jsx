import { useState } from "react"

const Chat = () => {
  const [messages, setMessages] = useState([{text: "Hello World!"}])
  return (
    <div className="flex justify-center p-2">
        <div className="border border-gray-600 rounded-lg">
            <div className="bg-base-300 p-2 rounded-lg">
                <img className="w-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9aFLDpi_7Mu8qHeocIpOIO_aqAWvktLZ8WQ&s"/>
            </div>
            <div className="h-[70vh] text-sm">
                {messages.map((message, index) => {
                    return (
                        <div key={index} className="chat chat-start">
                            <div className="chat-header">
                                Anushka
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                        <div className="chat-bubble">{message.text}</div>
                        <div className="chat-footer opacity-50">Seen</div>
                        </div>
                    )
                })}
                

            </div>
            <div className="flex justify-center">
                <>
                    <input type="text" placeholder="Type here" className="input" />
                    <button className="btn btn-secondary">Send</button>
                </>
            </div>
        </div>
    </div>
  )
}

export default Chat
