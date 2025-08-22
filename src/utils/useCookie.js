import Cookies from 'js-cookie'
import { useState } from 'react'
import { useNavigate } from 'react-router'
const useCookie = () => {
    const [token, setToken] = useState(Cookies.get('token'))
    const navigate = useNavigate()
   
    if (!token){
        navigate("/login")
    }
    

}

export default useCookie