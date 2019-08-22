const express = require("express")
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 4000

const app = express()

/* redirection for heroku to https from http */
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production'
    && req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else next();
})


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

/* Build and deployment */
app.use(express.static(path.join(__dirname, '/client/build')))

require('dotenv').config()

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
})

connection.connect(err => {
  if(err) {
    return err
  }
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Get all employees
app.get('/employees', (req, res) => {
  let sql = 'SELECT * FROM employee_table'
  connection.query(sql, (error, results, fields) => {
  if (error) throw error;
    return res.send(results)
  })
})

// Get employee with id 
app.get('/employee/:id', (req, res) => {
  let sql = 'SELECT * FROM employee_table WHERE employee_id=?'
  let employee_id = req.params.id;
  if (!employee_id) {
   return res.status(400).send({ error: true, message: 'Please provide employees id' })
  }
  connection.query(sql, employee_id, (error, results, fields) => {
  if (error) throw error;
    return res.send({ error: false, data: results[0], message: 'Employee' })
  })
})

// Post
app.post('/employee', (req, res) => {
  let sql = "INSERT INTO employee_table SET ? "
  connection.query(sql, req.body, (error, results, fields) => {
  if (error) throw error;
    return res.send({ error: false, data: results, message: 'New employee has been created successfully.' })
  })
})

//  Update with id
app.put('/employee/:id', (req, res) => {
  let sql = "UPDATE employee_table SET ? WHERE employee_id = ?"
  let employee_id = req.params.id
  connection.query(sql, [req.body, employee_id], (error, results, fields) => {
  if (error) throw error;
    return res.send({ error: false, data: results, message: 'Employee has been updated successfully.' })
  })
})

//  Delete
app.delete('/employee/:id', (req, res) => {
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
});

app.listen(PORT, () => {
  console.log(`Employee server running on port ${PORT}`)
})