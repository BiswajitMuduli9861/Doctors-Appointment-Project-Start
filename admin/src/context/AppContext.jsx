import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const currency = "₹"

    const calcutateAge = (dob) =>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear() - birthDate.getFullYear()
        return age
    }

    const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  //convert date
  const slotDateFormat = (slotDate) => {
    // let slotDate = "16_1_2026"
    const dateArray = slotDate.split('_')
    // console.log(dateArray)
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }


    const value={
        calcutateAge,
        slotDateFormat,
        currency
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;