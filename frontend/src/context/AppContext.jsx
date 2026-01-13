import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "") 
    const [userData, setUserData] = useState(false)
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
console.log(doctors)

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
                console.log(data.doctors)
                console.log(doctors)
            } else {
                toast.error(data.message, {
                    className: " !bg-[white] !text-black"
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, {
                className: " !bg-[white] !text-black"
            })
        }
    }

    const loadUserProfileData = async() =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})
            // console.log(data)
            if(data.success){
                setUserData(data.userData)
            } else{
                toast.error(data.message, {
                    className: " !bg-[white] !text-black"
                })
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message, {
                className: " !bg-[white] !text-black"
            })
        }
    }


    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData  //this is the function use any component
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider