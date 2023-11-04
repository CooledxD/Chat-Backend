import mysql from "../connect.js";

export const ChatFindMany = async (id) => {
  const [rows] = await mysql
    .promise()
    .query(
      `
        SELECT id, username, avatarUrl
        FROM users
        WHERE NOT id = ?
      `,
      [
        id
      ]
    ).catch((error) => {
      throw new Error(error.message)
    })

  return rows
}