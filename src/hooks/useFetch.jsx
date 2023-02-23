import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

export const useFetch = (url) =>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const apiTest = async() =>{
      try
      {
        const movies =await fetchDataFromApi(url)
        setLoading(false)
        setData(movies)
      //   dispatch(getApiConfig(movies))
      }
      catch(e)
      {
            setLoading(false)
            setError("Something went wrong!")
            console.log(e)
      }
    }

    useEffect(()=>{
      setLoading("loading...");
      setData(null);
      setError(null);

      apiTest()
    },[url])

    return {data,loading,error}

}