import Cookies from "js-cookie"
import { API_PATH } from "../../config/api"
import { ACCESS_TOKEN } from "../../utils/constant"




export const uploadAvatar = async (imageUrl: string) => {
    const imageBlob = await fetch(imageUrl).then((r) => r.blob())
    const imageFile = new File([imageBlob], 'upload-file.png', { type: 'image/jpeg' })
    const formData = new FormData()
    formData.append('file', imageFile)
    const result = await fetch(
        API_PATH.uploadAvatar,
        {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: Cookies.get(ACCESS_TOKEN) || ''
            }
        }
    )
    return await result.json()
}

