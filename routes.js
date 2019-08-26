module.exports=function(app) {

// Get all employees
app.get('/employees', (req, res) => {
  let sql = 'SELECT * FROM employee_table'
  connection.query(sql, (error, results, fields) => {
  if (error) throw error
    return res.send(results)
  })
})

// Get employee with id 
app.get('/employee/:id', (req, res) => {
  let sql = 'SELECT * FROM employee_table WHERE employee_id=?'
  let employee_id = req.params.id
  if (!employee_id) {
   return res.status(400).send({ error: true, message: 'Please provide employees id' })
  }
  connection.query(sql, employee_id, (error, results, fields) => {
  if (error) throw error
    return res.send(results)
  })
})

// Post
app.post('/employee', (req, res) => {
  let sql = "INSERT INTO employee_table SET ? "
  connection.query(sql, req.body, (error, results, fields) => {
  if (error) throw error
    return res.send({ error: false, data: results, message: 'New employee has been created successfully.' })
  })
})

//  Update with id
app.put('/employee/update/:id', (req, res) => {
  let sql = "UPDATE employee_table SET ? WHERE employee_id = ?"
  let employee_id = req.params.id
  connection.query(sql, [req.body, employee_id], (error, results, fields) => {
  if (error) throw error
    return res.send({ error: false, data: results, message: 'Employee has been updated successfully.' })
  })
})


//  Delete by ID
app.delete('/employee/delete/:id', (req, res) => {
  let sql = 'DELETE FROM employee_table WHERE employee_id = ?'
  let employee_id = req.params.id
  if (!employee_id) {
    return res.status(400).send({ error: true, message: 'Please provide employee id' })
  }
  connection.query(sql, [employee_id], (error, results, fields) => {
  if (error) throw error
    return res.send({ error: false, data: results, message: 'Employee has been deleted successfully.' })
  })
})

/* Build and deployment */
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
})

}