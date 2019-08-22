import React, { useState, useEffect } from 'react'
import EmployeeTable from './EmployeeTable'
import axios from 'axios';

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
          <h2>Employees</h2>
          <EmployeeTable employees={employees}/>
          <a  href="/employee">Add Employee</a>
        </div>
      </div>
    </div>
  )
}

export default Home