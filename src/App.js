import { createContext, useEffect, useState } from 'react';
import './App.css';
import Routess from './Routese/Routes';

export const userContext = createContext();

function App() {
  const [user, setUser] = useState({})

  let useEffectRenderCount = 0;

  useEffect(() => {
    const cooki = document.cookie.split("=")[1];
    useEffectRenderCount = useEffectRenderCount + 1;
    console.log("rander count", useEffectRenderCount)
    if (cooki) {
      fetch("http://localhost:8000/user", {
        method: "GET",
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          authorization: `Bearer ${cooki}`
        }
      }).then(res => res.json())
        .then(data => {
          data.password = null
          setUser(data);
        })
    }
  }, []);


  return (
    <div className="App">
      <userContext.Provider value={[user, setUser]}>
        <Routess />
      </userContext.Provider>
    </div>
  );
}

export default App;
