import { IMAGE_URL } from "../config/extras"

export const getImageUrl = (url: string) => {
    return `${IMAGE_URL}${url}`
}