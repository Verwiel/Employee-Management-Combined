import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

const EditEmployee = props => {
  const [toHome, setToHome] = useState(false)
  const [data, setData] = useState([])

  const singleEmployeeId = props.match.params.id

  useEffect(() => {
    axios
      .get(`https://employee-management-insideout.herokuapp.com/employee/${singleEmployeeId}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {console.log(err)})
  },[])

  const handleDelete= async (e) => {
    e.preventDefault()
    await fetch (`https://employee-management-insideout.herokuapp.com/employee/delete/${singleEmployeeId}`, {
      method: "DELETE"
    })
    await setToHome(true)
  }

  return (
    <>
    {toHome ? <Redirect to='/'/>:null}

    {data.map((employee, index) => (
      <div key={index} employee={employee}> 
        <h3>Are you sure you want to delete {employee.first_name} {employee.last_name}?</h3>
      </div>
    ))}

      <form onSubmit={handleDelete}>   
        <Link to='/'>
          <button title='Cancel' class="fas fa-ban deny"></button>
        </Link>
        <button title='Confirm' type="submit" class="far fa-check-circle confirm"></button>
      </form>
    </>
  )
}

export default EditEmployee