import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'


const AddEmployee = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [toHome, setToHome] = useState(false)


  const handleSubmit= async (e) => {
    e.preventDefault()
    await fetch('/employee',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
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
    <h1>Add Employee</h1>
    {toHome ? <Redirect to='/'/>:null}
      <form onSubmit={handleSubmit}>
        <input type='text' 
          name='firstName' 
          placeholder='First Name' 
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
      
        <button type="submit">
          Submit
        </button>
      
      </form>
      <a href="/">Home</a>
    </>
  )
}

export default AddEmployee