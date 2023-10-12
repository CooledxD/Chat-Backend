import mysql from '../connect.js'

export const RefreshTokenUpdate = async({
  newRefreshToken,
  refreshTokenId
}) => {
  await mysql
    .promise()
    .query(
      `
        UPDATE refreshtokens 
        SET token = ? 
        WHERE id = ?
      `,
      [
        newRefreshToken, 
        refreshTokenId
      ]
    ).catch((error) => {
      throw new Error(error.message)
    })
}