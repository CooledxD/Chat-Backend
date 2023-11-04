import mysql from "../connect.js";

export const MessageInsert = async ({
  creator_id,
  recipient_id,
  text
}) => {
  if (!creator_id || !recipient_id || !text) {
    throw new Error('Empty parameter')
  }

  const [rows] = await mysql
    .promise()
    .query(
      `
        INSERT INTO messages (
          creator_id,
          recipient_id,
          text
        )
        VALUES (
          ?, 
          ?,
          ?
        )
      `,
      [
        creator_id,
        recipient_id,
        text
      ]
    ).catch((error) => {
      mysql.query(
        `ALTER TABLE messages AUTO_INCREMENT = 1`
      )
      
      throw new Error(error.message)
    })

  return rows.insertId
}