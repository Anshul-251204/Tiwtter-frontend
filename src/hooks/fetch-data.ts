import axios from "axios"
import { useState } from "react";

const useFetchData = async(url:string)=>{
    const [loading , setloading] = useState<boolean>(true);
    const [data, setData] = useState<any>();
    
    

    try {
        const response = await axios.get(url);
        setData(response.data.data);
        setloading(false);
        return {data, loading};
    } catch (error) {
        // toast a message 
    }

}

export default useFetchData;