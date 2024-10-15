import React, { useEffect, useState } from 'react'
import "./Crud.css"
import axios from "axios"
const Crud = ({users,setUsers,filteredsearch,setFilteredsearch}) => {

   const [openmodal,setOpenmodal]=useState(false)
   const [UsersData,setUsersData]=useState({name:"",age:"",city:""})
   
   const getUsers=async()=>{
      try{
         await axios.get("http://localhost:3500/users").then((res)=>{
         
          setUsers(res.data)
          
         });
        
      }
      catch(err){
        console.log(err.message);
      }
    }
    
     const handleSearch=(e)=>{
     const searchText=e.target.value;
      const filter=users.filter((user)=>{
         return (
            (user.name.toLowerCase()).includes(searchText.toLowerCase())||(user.city.toLowerCase()).includes(searchText.toLowerCase())
            
         )
        
      })
      setFilteredsearch(filter)
   }
   

   const handleDelete=async(id)=>{
      try{
         const deleted=window.confirm("are you sure to delete ???")
         console.log(id)
        if(deleted) {await axios.delete(`http://localhost:3500/users/${id}`).then((res)=>{
         
       getUsers()
         })};
        
      }
      catch(err){
        console.log(err.message);
      }
   }
   const addRecord=()=>{
      
      setUsersData({name:"",age:"",city:""})
      setOpenmodal(true)
   }
   const closemodal=()=>{
      setOpenmodal(false)
    getUsers()
   }
  const handleRecord= (e)=>{
     setUsersData({...UsersData,[e.target.name]:e.target.value});
  }
  const handleSubmit=async()=>{
   setOpenmodal(false)
  
     if(UsersData._id){
      
      await axios.patch(`http://localhost:3500/users/${UsersData._id}`,UsersData).then(res=>{
        
      })
     
     }
     
     else{
      await axios.post("http://localhost:3500/users",UsersData).then((res)=>{
        
         
        })
     }
     
    
     
   
  }
 const handleEdit=(user)=>{
    setUsersData(user);
    setOpenmodal(true);

 }

 useEffect(()=>{
      
   getUsers();
  },[handleSubmit,handleDelete])



  return (
    <div className='crud'>
        
       <h1>CRUD Application</h1>
       <form onSubmit={(e)=>e.preventDefault()} >
        <input type='text' name='search' id='search' placeholder='Search Text Here'  onChange={handleSearch} autoComplete='off'/>
        <button onClick={addRecord}> Add Record</button>
       </form>
       <table>
         <thead>
        <tr>
            <th>S.No</th>
            <th className='name'>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        </thead>
        {filteredsearch? filteredsearch.map((user,index)=>{
         return (
            <tbody key={user._id}>
               <tr >
           <td>{index+1}</td>
           <td ><p className='name'>{user.name}</p></td>
           <td>{user.age}</td>
           <td>{user.city}</td>
           <td><button className='edit' onClick={()=>{handleEdit(user)}}>Edit</button></td>
           <td><button className='del' onClick={()=>{handleDelete(user._id)}} >Delete</button></td>
        </tr>
        </tbody>
            
         )
        }):""}
       
        
       </table>
      {openmodal && <div className='modal'>
         <div className='modal1'>
            <div className='record'>
         <h2>User Record</h2>
         <p onClick={closemodal} className='time'>&times;</p>
         </div>
         <form onSubmit={(e)=>e.preventDefault()}>
            <label>Full Name</label>
            <input type='text' name='name' id='name' value={UsersData.name} onChange={handleRecord} />
            <label>Age</label>
            <input type='text' name='age' id='age' value={UsersData.age} onChange={handleRecord} />
            <label>City</label>
            <input type='text' name='city' id='city' value={UsersData.city}onChange={handleRecord}/>
            <button className='btt' onClick={handleSubmit}>Add User</button>
         </form>
        
         </div>
       </div>}
    </div>
   
  )
}

export default Crud