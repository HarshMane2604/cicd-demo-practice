import { useEffect, useState } from "react";
import './App.css'

function App(){
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    let apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    if (apiUrl.endsWith('/')){
      apiUrl = apiUrl.slice(0,-1)
    }
    fetch(`${apiUrl}/api/message`)
    .then(response => response.json())
    .then(data => {
      setMessage(data.message)
      setLoading(false)
    })
    .catch(error=>{
      console.error('Error fetching data: ', error)
      setMessage('Error loading message from backend')
      setLoading(false)
    })
  },[])
  return (
    <div className="App">
      <h1>Full stack web app</h1>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <h2>{message}</h2>
        )}
      </div>
      <p>
        This is a simple React Frontend talking to python FastAPI Backend!
      </p>
    </div>
  )
}

export default App