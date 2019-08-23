import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeTable = props => (
  <div class='container'>
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
            <td class='action-column'>
              <td>
                <Link to={'/edit/'+ employee.employee_id}>
                  <button title='Edit Employee' class="fas fa-pen"></button>
                </Link>
              </td>
              <td>
                <Link to={'/delete/'+ employee.employee_id}>
                  <button title='Delete Employee' class="fas fa-trash-alt"></button>
                </Link>
              </td>
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
  </div>
)

export default EmployeeTable