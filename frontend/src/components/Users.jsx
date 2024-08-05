import React, { useState, useEffect } from 'react'
import { fetchUsers } from '../services/api'

const Preferences = () => {
  const [users, setUsers] = useState([])


  useEffect(() => {
    getUsers()
  }, [])


  const getUsers = async () => {
    try {
      const response = await fetchUsers()
      setUsers(response.data)
    } catch (error) {
      console.error('There was an error fetching the subscriptions!', error)
    }
  }

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default Preferences