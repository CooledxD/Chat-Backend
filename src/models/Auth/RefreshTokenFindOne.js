import mysql from '../connect.js'

export const RefreshTokenFindOne = async (
  refreshToken,
  ...args
) => {
  const columns = args.length ? args.flat().join(', ') : '*'

  const [rows] = await mysql
    .promise()
    .query(
      `
        SELECT ${columns} 
        FROM refreshtokens 
        WHERE token = ?
      `,
      [refreshToken]
    ).catch((error) => {
      throw new Error(error.message)
    })

  return rows.length ? rows[0] : false
}