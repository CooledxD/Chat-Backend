import mysql from '../connect.js'

export const RefreshTokenRemove = async ({userId}) => {
  await mysql
    .promise()
    .query(
      `
        DELETE FROM refreshtokens 
        WHERE userId = ?
      `,
      [userId]
    ).catch((error) => {
      throw new Error(error.message)
    })
}