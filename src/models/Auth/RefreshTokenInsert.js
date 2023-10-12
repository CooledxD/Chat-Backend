import mysql from '../connect.js'

export const RefreshTokenInsert = async({
  refreshToken,
  userId
}) => {
  await mysql
    .promise()
    .query(
      `
        INSERT INTO refreshtokens (
          token, 
          userId
        ) 
        VALUES (
          ?, 
          ?
        )
      `,
      [
        refreshToken, 
        userId
      ]
    ).catch((error) => {
      mysql.query(
        `ALTER TABLE refreshtokens AUTO_INCREMENT = 1`
      )
      
      throw new Error(error.message)
    })
}