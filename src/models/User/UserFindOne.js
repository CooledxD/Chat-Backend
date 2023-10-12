import mysql from '../connect.js'

export const UserFindOne = async (
  payload, 
  ...args
) => {
  const columns = args.length ? args.flat().join(', ') : '*'

  const [rows] = await mysql
    .promise()
    .query(
      `
        SELECT ${columns} 
        FROM users 
        WHERE username = ? OR id = ?
      `,
      [
        payload.username,
        payload.id
      ]
    ).catch((error) => {
      throw new Error(error.message)
    })

  return rows.length ? rows[0] : false
}