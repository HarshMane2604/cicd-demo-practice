import { useState, useEffect } from "react";

import './App.css'

function app(){
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    
    if(apiUrl.endsWith('/')){
      apiUrl = apiUrl.slice(0, -1)
    }

    fetch(`${apiUrl}/api/message`)
    .then(response => response.json())
    .then(data => {
      setMessage(data.message)
    })
    .catch(error => {
      console.log('Error Fetching message' , error)
      setMessage(error.message)
    })
    .finally(() => {
      setLoading(false)
    })

  },[])

  if(loading){
    return (
      <div className="container">
        <p>Loading message from API</p>
      </div>
    )
  }

  return(
    <div className="container">
      <h1>React + FastAPI </h1>
      <p>{message}</p>
    </div>
  )
}

export default app

