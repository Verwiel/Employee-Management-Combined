const express = require("express")
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 4000
var routes = require('./routes')

const app = express()

const db_config = {
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
}

const connection

function handleDisconnect() {
  connection = mysql.createConnection(db_config)

  connection.connect(function(err) {              
    if(err) {                                   
      console.log('error when connecting to db:', err)
      setTimeout(handleDisconnect, 2000)
    }                                     
  })                               
                                         
  connection.on('error', function(err) {
    console.log('db error', err)
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect()                       
    } else {                                      
      throw err                              
    }
  });
}

handleDisconnect();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

/* Build and deployment */
app.use(express.static(path.join(__dirname, '/client/build')))

routes(app)

// // Get all employees
// app.get('/employees', (req, res) => {
//   let sql = 'SELECT * FROM employee_table'
//   connection.query(sql, (error, results, fields) => {
//   if (error) throw error
//     return res.send(results)
//   })
// })

// // Get employee with id 
// app.get('/employee/:id', (req, res) => {
//   let sql = 'SELECT * FROM employee_table WHERE employee_id=?'
//   let employee_id = req.params.id
//   if (!employee_id) {
//    return res.status(400).send({ error: true, message: 'Please provide employees id' })
//   }
//   connection.query(sql, employee_id, (error, results, fields) => {
//   if (error) throw error
//     return res.send(results)
//   })
// })

// // Post
// app.post('/employee', (req, res) => {
//   let sql = "INSERT INTO employee_table SET ? "
//   connection.query(sql, req.body, (error, results, fields) => {
//   if (error) throw error
//     return res.send({ error: false, data: results, message: 'New employee has been created successfully.' })
//   })
// })

// //  Update with id
// app.put('/employee/update/:id', (req, res) => {
//   let sql = "UPDATE employee_table SET ? WHERE employee_id = ?"
//   let employee_id = req.params.id
//   connection.query(sql, [req.body, employee_id], (error, results, fields) => {
//   if (error) throw error
//     return res.send({ error: false, data: results, message: 'Employee has been updated successfully.' })
//   })
// })


// //  Delete by ID
// app.delete('/employee/delete/:id', (req, res) => {
//   let sql = 'DELETE FROM employee_table WHERE employee_id = ?'
//   let employee_id = req.params.id
//   if (!employee_id) {
//     return res.status(400).send({ error: true, message: 'Please provide employee id' })
//   }
//   connection.query(sql, [employee_id], (error, results, fields) => {
//   if (error) throw error
//     return res.send({ error: false, data: results, message: 'Employee has been deleted successfully.' })
//   })
// })

// /* Build and deployment */
// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

app.listen(PORT, () => {
  console.log(`Employee server running on port ${PORT}`)
})