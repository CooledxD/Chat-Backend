import mysql from "../connect.js";

export const UserUpdate = async (
  payload,
  ...args
) => {
  const objToArr = async (obj) => {
    const arr = Object.entries(obj)

    return arr.map(([key, value]) => {
      return `${key} = '${value}'`
    }).join(', ')
  }

  await mysql
    .promise()
    .query(
      `
        UPDATE users
        SET ${await objToArr(...args)}
        WHERE username = ? OR id = ?
      `,
      [
        payload.username,
        payload.id
      ]
    ).catch((error) => {
      throw new Error(error.message)
    })
}