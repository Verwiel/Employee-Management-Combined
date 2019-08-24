import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'

const EditEmployee = props => {
  const [toHome, setToHome] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')


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

  const handleUpdate= async (e) => {
    e.preventDefault()
    await fetch(`https://employee-management-insideout.herokuapp.com/employee/update/${singleEmployeeId}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'first_name':firstName,
        'last_name':lastName,
        'email':emailAddress,
        'phone':phoneNumber,
      })
    })
    await setToHome(true)
  }

  return (
    <>
      {toHome ? <Redirect to='/'/>:null}
      
      {data.map((employee, index) => (
        <div key={index} employee={employee}> 
          <h3>Update {employee.first_name} {employee.last_name}</h3>
        </div>
      ))}

      <form onSubmit={handleUpdate}>
        <input type='text' 
          name='firstName' 
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)} 
          required 
        />

        <input type='text' 
          name='lastName' 
          placeholder='Last Name' 
          value={lastName}
          onChange={e => setLastName(e.target.value)} 
          required 
        />

        <input type='email' 
          name='email' 
          placeholder='Email Address' 
          value={emailAddress}
          onChange={e => setEmailAddress(e.target.value)} 
          required 
        />

        <input type='tel' 
          name='phone'
          pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}' 
          placeholder='Phone Number' 
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)} 
          required 
        />
        <nav>
          <Link to='/'>
            <button title='Cancel' class="fas fa-ban deny"></button>
          </Link>
          <button title='Confirm' type='submit' class="far fa-check-circle confirm"></button>
        </nav>
      </form>

    </>
  )
}

export default EditEmployee