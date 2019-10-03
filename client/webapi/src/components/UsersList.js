import React, { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'localhost:4000/api/users';

function UserList() {
  const [users, setUsers] = useState();

  useEffect(() => {
    axios(url)
    .then(data => {
      console.log(data)
      setUsers(data)
    })
    
  }, [])
  
  return (
    <>
      <h1>Hello users</h1>
      
    </>
  )
}

export default UserList;