import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props)=>{

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')
    const [doctors, setDoctors] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL


    const getAllDoctors = async(req,res) =>{
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/all-doctors',{headers:{aToken}})
            if(data.success){
                setDoctors(data.doctors)
                // console.log(data.doctors)
            }else{
                toast.error(data.message,{
                    className:" !bg-[white] !text-black"
                })
            }
        } catch (error) {
            toast.error(error.message,{
                    className:" !bg-[white] !text-black"
                })
        }
    }

    const changeAvailability = async (docId) =>{
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId},{headers:{aToken}})
            if(data.success){
                toast.success(data.message,{className:"!bg-[white] !text-black"})
                getAllDoctors()
            }else{
                toast.error(data.message,{
                    className:" !bg-[white] !text-black "
                })
            }
        } catch (error) {
            toast.error(error.message,{
                    className:" !bg-[white] !text-black "
                })
        }
    }

    const value={
        aToken,setAToken,
        backendUrl,doctors,
        getAllDoctors, changeAvailability
    }

    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;