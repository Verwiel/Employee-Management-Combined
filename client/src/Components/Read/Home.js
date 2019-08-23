import React, { useState, useEffect } from 'react'
import EmployeeTable from './EmployeeTable'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:4000/employees")
      .then(res => {
        setEmployees(res.data)
      })
      
      .catch(err => {console.log(err)})
  }, [])

  return (
    <div>
      <h1>Employee Management</h1>
      <div>
        <div>
          <EmployeeTable employees={employees}/>
          <Link to ='/add'>
            <button title='Add Employee' class="fas fa-user-plus add"></button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home