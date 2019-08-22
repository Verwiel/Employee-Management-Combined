import React from 'react'

const EmployeeTable = props => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.employees.length > 0 ? (
        props.employees.map(employee => (
          <tr key={employee.employee_id}>
            <td>{employee.employee_id}</td>
            <td>{employee.first_name} {employee.last_name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>
              <a href={'/employee/'+ employee.employee_id}>Edit</a>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5}>No Employees</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default EmployeeTable