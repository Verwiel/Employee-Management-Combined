import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const EditEmployee = props => {
  const [toHome, setToHome] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const singleEmployeeId = props.match.params.id

  const handleUpdate= async (e) => {
    e.preventDefault()
    await fetch(`/employee/${singleEmployeeId}`, {
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

  const handleDelete= async (e) => {
    e.preventDefault()
    await fetch (`/employee/${singleEmployeeId}`, {
      method: "DELETE"
    })
    await setToHome(true)
  }

  return (
    <>
      {toHome ? <Redirect to='/'/>:null}
      <h1>Edit Employee</h1>
      <form onSubmit={handleUpdate}>
        <input type='text' 
          name='firstName' 
          placeholder={'First Name'} 
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

        <button type='submit'>Update</button>

      </form>

      <form onSubmit={handleDelete}>
        <input type="submit" value="Delete" />
      </form>

      <a href='/'>Cancel</a>
    </>
  )
}

export default EditEmployee