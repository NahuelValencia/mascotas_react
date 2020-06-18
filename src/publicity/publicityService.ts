import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Publicity {
    id: string;
    title: string;
    description: string;
    redirectLink: string;
    imageId: string;
}

interface UpdatePromotionImage {
    image: string;
}
interface UpdatePromotionImageId {
    id: string;
}

// Create
export async function newPromotion(payload: Publicity): Promise<Publicity> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/promotion", payload)).data as Publicity
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

// List all publicities
export async function getPublicities(owner: boolean): Promise<Publicity[]> {
    let res
    try {
        if (owner) {
            res = await axios.get(environment.backendUrl + "/v1/ownPromotion")
        } else {
            res = await axios.get(environment.backendUrl + "/v1/promotion")
        }
        return Promise.resolve(res.data as Publicity[])
    } catch (err) {
        return Promise.reject(err)
    }
}

// devuelve el id de la imagen elegida, despues de subirla a redis
export async function updatePromotionPicture(payload: UpdatePromotionImage): Promise<UpdatePromotionImageId> {
    try {
        const res = (await axios.post(environment.backendUrl + "/v1/promotion/picture", payload)).data as UpdatePromotionImageId
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export function getImageUrl(id: string) {
    if (id && id.length > 0) {
        return environment.backendUrl + "/v1/image/" + id
    } else {
        return "/assets/select_image.png"
    }
}

// Delete
export async function deletePromotion(id: string): Promise<void> {
    try {
        await axios.delete(environment.backendUrl + "/v1/promotion/" + id)
        return Promise.resolve()
    } catch (err) {
        return Promise.reject(err)
    }
}

// Edit
export async function loadPromotion(id: string): Promise<Publicity> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/promotion/" + id)).data as Publicity
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}
