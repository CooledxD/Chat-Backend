import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const mysql = mysql2.createConnection({
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

mysql.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  (err) => {
    err ?
    console.log(err.message) :
    console.log('Chat database has been created')
  }
)

mysql.query(
  `USE ${process.env.DB_NAME}`,
  (err) => {
    if (err) console.log(err.message)
  }
)

// mysql.query(
//   `
//   SELECT * FROM INFORMATION_SCHEMA.TABLES
//   WHERE TABLE_SCHEMA = 'chat'
//   `,
//   (err, result) => {
//     err ?
//     console.log(err.message) :
//     console.log(result)
//   }
// )

mysql.query(
  `
    CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      username VARCHAR(255) UNIQUE NOT NULL, 
      password VARCHAR(255) NOT NULL, 
      avatarUrl VARCHAR(255), 
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,
  (err) => {
    err ?
    console.log(err.message) :
    console.log('Users table has been created')
  }
)

mysql.query(
  `
    CREATE TABLE IF NOT EXISTS refreshtokens (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      token VARCHAR(255) UNIQUE NOT NULL, 
      userId INT NOT NULL, 
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,
  (err) => {
    err ?
    console.log(err.message) :
    console.log('RefreshTokens table has been created')
  }
)

mysql.query(
  `
    CREATE TABLE IF NOT EXISTS messages (
      id INT PRIMARY KEY AUTO_INCREMENT, 
      creator_id INT NOT NULL, 
      recipient_id INT NOT NULL, 
      text VARCHAR(255) NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,
  (err) => {
    err ?
    console.log(err.message) :
    console.log('Messages table has been created')
  }
)

export default mysql