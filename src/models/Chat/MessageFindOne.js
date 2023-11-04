import mysql from "../connect.js";

export const MessageFindOne = async (
  id,
  ...args
) => {
  const columns = args.length ? args.flat().join(', ') : '*'

  const [rows] = await mysql
    .promise()
    .query(
      `
        SELECT ${columns} 
        FROM messages 
        WHERE id = ? 
      `,
      [
        id
      ]
    ).catch((error) => {
      throw new Error(error.message)
    })

  return rows.length ? rows[0] : false
}