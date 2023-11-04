import mysql from "../connect.js";

export const MessageFindMany = async (id) => {
  const [rows] = await mysql
    .promise()
    .query(
      `
      SELECT *
      FROM messages
      WHERE creator_id = ? OR recipient_id = ?
      ORDER BY createdAt
      `,
      [
        id,
        id
      ]
    ).catch((error) => {
      throw new Error(error.message)
    })

  return rows.length ? rows : []
}