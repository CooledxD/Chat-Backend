import mysql from '../connect.js'

export const UserInsert = async ({
  username,
  password,
}) => {
  if (!username || !password) {
    throw new Error('Empty parameter')
  }

  await mysql
    .promise()
    .query(
      `
        INSERT INTO users (
          username, 
          password
        ) 
        VALUES (
          ?, 
          ?
        )
      `,
      [
        username, 
        password
      ]
    ).catch((error) => {
      mysql.query(
        `ALTER TABLE users AUTO_INCREMENT = 1`
      )
      
      throw new Error(error.message)
    })
}