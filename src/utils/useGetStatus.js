import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "./constants"

const useGetStatus = () => {
  const [status, setStatus] = useState(navigator.onLine ? "online" : "offline")
  

  useEffect(() => {
    const handleOffline = async () => {
        const date = new Date();
        // Format: Sun Sep 14 2025 18:35
        const formatted = date.toDateString() + " " + 
                        date.getHours().toString().padStart(2, "0") + ":" + 
                        date.getMinutes().toString().padStart(2, "0");

        console.log(formatted);
        try {
            const res = await axios.post(BASE_URL+"/chat/"+status, {}, {withCredentials: true})
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        
    }
    window.addEventListener("offline", handleOffline)

    // cleanup
    return () => {
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return status
}

export default useGetStatus
