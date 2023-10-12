import ky from "ky"
import { nanoid } from "nanoid"

import { UserUpdate } from "../models.js"

export const updateAvatar = async (req, res) => {
  try {
    const { userId } = req.tokenData
    const formData = new FormData()
    const imgBlob = new Blob([req.file.buffer])
    
    formData.append('image', imgBlob)
    formData.append('key', process.env.IMGBB_API_KEY)
    formData.append('name', `${nanoid(10)}-${Date.now()}`)
    formData.append('expiration', '3600')

    const { data: { display_url } } = await ky.post('https://api.imgbb.com/1/upload', {
      body: formData,
    }).json()

    await UserUpdate(
      {
        id: userId
      },
      {
        avatarUrl: display_url
      }
    )

    res.status(200).json(display_url)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      message: error.message
    })
  }
}