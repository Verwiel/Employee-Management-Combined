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
  })
}

handleDisconnect();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

/* Build and deployment */
app.use(express.static(path.join(__dirname, '/client/build')))

routes(app)

app.listen(PORT, () => {
  console.log(`Employee server running on port ${PORT}`)
})