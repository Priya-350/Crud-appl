import React, { useEffect, useState } from "react"
import "./App.css"
import Crud from "./Crud";

function App(){
  const [users,setUsers]=useState([]);
  const [filteredsearch,setFilteredsearch]=useState([]);
 
    return(
        <div className="app">
          <Crud 
            users={users}
            setUsers={setUsers}
            filteredsearch={filteredsearch}
            setFilteredsearch={setFilteredsearch}
            
          />
        </div>
    )
}
export default App;